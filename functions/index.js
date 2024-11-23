const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const stripe = require('stripe')(functions.config().stripe.secret_key);

// Add back these functions for creator subscriptions
exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const { userId, email } = data;

  try {
    // Use Realtime Database instead of Firestore
    const db = admin.database();
    const customerRef = db.ref(`stripe_customers/${userId}`);
    const snapshot = await customerRef.once('value');
    let customerId;

    if (snapshot.exists()) {
      customerId = snapshot.val().customerId;
    } else {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          firebaseUID: userId
        }
      });
      customerId = customer.id;
      await customerRef.set({ customerId });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: functions.config().stripe.price_id,
        quantity: 1,
      }],
      success_url: `${functions.config().public.url}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${functions.config().public.url}/dashboard`,
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

exports.createPortalSession = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const { userId } = data;

  try {
    const db = admin.database();
    const customerRef = db.ref(`stripe_customers/${userId}`);
    const snapshot = await customerRef.once('value');

    if (!snapshot.exists()) {
      throw new Error('No Stripe customer found');
    }

    const { customerId } = snapshot.val();
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${functions.config().public.url}/dashboard`,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

exports.createStickerPurchase = functions.https.onCall(async (data, context) => {
  const { 
    magazineId, 
    creatorId, 
    stickerType,
    idempotencyKey
  } = data;

  try {
    // First, get creator's Connect account ID
    const db = admin.database();
    const creatorConnectRef = db.ref(`users/${creatorId}/stripe_connect`);
    const connectSnapshot = await creatorConnectRef.once('value');
    const connectData = connectSnapshot.val();

    // Detailed Connect account validation
    if (!connectData?.accountId) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Creator needs to set up their payout account',
        { code: 'CONNECT_ACCOUNT_MISSING' }
      );
    }

    if (!connectData.onboardingComplete) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Creator needs to complete their payout setup',
        { code: 'CONNECT_ONBOARDING_INCOMPLETE' }
      );
    }

    if (!connectData.payoutEnabled) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Creator account is pending verification',
        { code: 'CONNECT_PAYOUTS_DISABLED' }
      );
    }

    // Verify the account status with Stripe
    try {
      const account = await stripe.accounts.retrieve(connectData.accountId);
      
      if (!account.charges_enabled) {
        // Update local status
        await creatorConnectRef.update({
          chargesEnabled: false,
          requiresAction: true
        });
        
        throw new functions.https.HttpsError(
          'failed-precondition',
          'Creator account requires attention',
          { code: 'CONNECT_CHARGES_DISABLED' }
        );
      }
    } catch (stripeError) {
      console.error('Stripe account verification failed:', stripeError);
      throw new functions.https.HttpsError(
        'internal',
        'Unable to verify creator account',
        { code: 'CONNECT_VERIFICATION_FAILED' }
      );
    }

    // Create payment intent with direct transfer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 299, // $2.99
      currency: 'usd',
      transfer_data: {
        destination: connectData.accountId,  // Send full amount to creator
      },
      metadata: {
        type: 'sticker_purchase',
        magazineId,
        creatorId,
        stickerType
      }
    }, {
      idempotencyKey // Prevent duplicate charges
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id // We need this for placement verification
    };
  } catch (error) {
    // Log detailed error info
    console.error('Sticker purchase error:', {
      error,
      creatorId,
      magazineId,
      stickerType
    });

    // If it's not already a HttpsError, wrap it
    if (!(error instanceof functions.https.HttpsError)) {
      throw new functions.https.HttpsError(
        'internal',
        'An unexpected error occurred',
        { originalError: error.message }
      );
    }
    throw error;
  }
});

// Add new function for placing purchased stickers
exports.placePurchasedSticker = functions.https.onCall(async (data, context) => {
  const { 
    magazineId, 
    creatorId, 
    stickerType,
    x,
    y,
    pageNumber,
    paymentIntentId
  } = data;

  try {
    const db = admin.database();

    // Verify the payment was successful
    const payment = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (payment.status !== 'succeeded') {
      throw new Error('Payment not found or unsuccessful');
    }

    // Record sticker placement
    await db.ref(
      `users/${creatorId}/customTemplates/published/${magazineId}/stickers`
    ).push({
      type: stickerType,
      x: Number(x),
      y: Number(y),
      pageNumber: Number(pageNumber),
      placedAt: admin.database.ServerValue.TIMESTAMP,
      paymentIntentId
    });

    return { success: true };
  } catch (error) {
    console.error('Error placing sticker:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Single webhook handler for all Stripe events
exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  console.log('Webhook received. Headers:', JSON.stringify(req.headers));
  
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      functions.config().stripe.webhook_secret
    );
    console.log('Webhook event constructed successfully:', event.type);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        
        // Only handle sticker purchases
        if (paymentIntent.metadata.type === 'sticker_purchase') {
          console.log('Processing sticker purchase payment:', {
            paymentIntentId: paymentIntent.id,
            metadata: paymentIntent.metadata,
            amount: paymentIntent.amount
          });

          const db = admin.database();
          const { creatorId, magazineId, stickerType } = paymentIntent.metadata;
          
          // Validate required metadata
          if (!creatorId || !magazineId || !stickerType) {
            console.error('Missing required metadata:', {
              creatorId,
              magazineId,
              stickerType,
              paymentIntentId: paymentIntent.id
            });
            throw new Error('Missing required payment metadata');
          }

          // Prepare earning data
          const earningData = {
            amount: paymentIntent.amount,
            status: 'completed',
            magazineId,
            stickerType,
            paymentIntentId: paymentIntent.id,
            purchasedAt: admin.database.ServerValue.TIMESTAMP
          };

          // Only add transferId if it exists
          if (paymentIntent.transfer) {
            earningData.transferId = paymentIntent.transfer;
          }

          console.log('Attempting to write earning data:', {
            path: `users/${creatorId}/sticker_earnings`,
            data: earningData
          });

          // Write to Firebase
          await db.ref(`users/${creatorId}/sticker_earnings`).push(earningData);
          
          console.log('Successfully recorded earning for creator:', {
            creatorId,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount
          });
        }
        break;
      }

      case 'transfer.failed': {
        const transfer = event.data.object;
        const paymentIntent = await stripe.paymentIntents.retrieve(
          transfer.metadata.payment_intent
        );
        
        if (paymentIntent.metadata.type === 'sticker_purchase') {
          console.log('Processing failed transfer:', {
            transferId: transfer.id,
            paymentIntentId: transfer.metadata.payment_intent
          });

          const db = admin.database();
          const { creatorId } = paymentIntent.metadata;
          
          // Update the earnings record
          const earningsRef = db.ref(`users/${creatorId}/sticker_earnings`);
          const snapshot = await earningsRef
            .orderByChild('paymentIntentId')
            .equalTo(paymentIntent.id)
            .once('value');
          
          if (snapshot.exists()) {
            const earningKey = Object.keys(snapshot.val())[0];
            await earningsRef.child(earningKey).update({
              status: 'transfer_failed',
              error: transfer.failure_message
            });
            
            console.log('Updated earning record with failed status:', {
              creatorId,
              earningId: earningKey,
              paymentIntentId: paymentIntent.id
            });
          } else {
            console.error('No earning record found for failed transfer:', {
              creatorId,
              paymentIntentId: paymentIntent.id
            });
          }
        }
        break;
      }

      // Add this case alongside your other webhook cases (right after 'payment_intent.succeeded' or any other case)
      case 'checkout.session.completed': {
        console.log('Checkout session completed:', event.data.object);
        const session = event.data.object;
        
        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          const customer = await stripe.customers.retrieve(session.customer);
          const userId = customer.metadata.firebaseUID;

          console.log('Writing subscription data after checkout:', {
            userId,
            subscriptionId: subscription.id,
            status: subscription.status
          });

          const db = admin.database();
          await db.ref(`users/${userId}/subscription`).set({
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            currentPeriodEnd: subscription.current_period_end,
            updatedAt: admin.database.ServerValue.TIMESTAMP
          });
        }
        break;
      }

      case 'transfer.failed': {
        // Handle failed transfers to creator accounts
        const transfer = event.data.object;
        const paymentIntent = await stripe.paymentIntents.retrieve(
          transfer.metadata.payment_intent
        );
        
        if (paymentIntent.metadata.type === 'sticker_purchase') {
          const db = admin.database();
          const { creatorId } = paymentIntent.metadata;
          
          // Update the earnings record
          const earningsRef = db.ref(`users/${creatorId}/sticker_earnings`);
          const snapshot = await earningsRef
            .orderByChild('paymentIntentId')
            .equalTo(paymentIntent.id)
            .once('value');
          
          if (snapshot.exists()) {
            const earningKey = Object.keys(snapshot.val())[0];
            await earningsRef.child(earningKey).update({
              status: 'transfer_failed',
              error: transfer.failure_message
            });
          }
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        console.log('Processing subscription.created webhook:', {
          eventId: event.id,
          type: event.type,
          subscriptionId: subscription.id
        });
        
        try {
          // Get Firebase user ID from Stripe customer
          const customer = await stripe.customers.retrieve(customerId);
          const userId = customer.metadata.firebaseUID;
      
          console.log('Preparing to write subscription data:', {
            userId,
            status: subscription.status,
            priceId: subscription.items.data[0].price.id
          });
      
          const db = admin.database();
          
          // Write subscription data first
          const subscriptionRef = db.ref(`users/${userId}/subscription`);
          await subscriptionRef.set({
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            currentPeriodEnd: subscription.current_period_end,
            updatedAt: admin.database.ServerValue.TIMESTAMP
          });
          
          console.log('Successfully wrote subscription data to path:', `users/${userId}/subscription`);
      
          // Then handle Connect account setup
          const connectRef = db.ref(`users/${userId}/stripe_connect`);
          const connectSnapshot = await connectRef.once('value');
          
          if (!connectSnapshot.exists()) {
            console.log('Starting Connect account creation:', {
              userId,
              customerEmail: customer.email
            });
            // Create Connect Express account
            const account = await stripe.accounts.create({
              type: 'express',
              country: 'US',
              capabilities: {
                transfers: { requested: true },
                card_payments: { requested: true }  // Add this capability
              },
              metadata: {
                firebaseUID: userId
              },
              settings: {
                payouts: {
                  schedule: {
                    interval: 'manual'
                  }
                }
              }
            });

            console.log('Connect account created:', {
              accountId: account.id,
              userId: userId,
              capabilities: account.capabilities
            });
      
            // Create account link for onboarding
            const accountLink = await stripe.accountLinks.create({
              account: account.id,
              refresh_url: `${functions.config().public.url}/dashboard/connect/refresh`,
              return_url: `${functions.config().public.url}/dashboard/connect/return`,
              type: 'account_onboarding'
            });
      
            // Store Connect account info
            await connectRef.set({
              accountId: account.id,
              onboardingComplete: false,
              payoutEnabled: false,
              createdAt: admin.database.ServerValue.TIMESTAMP,
              onboardingUrl: accountLink.url
            });
      
            // Store this URL where the frontend can access it
            await db.ref(`users/${userId}/pendingActions/connectOnboarding`).set({
              url: accountLink.url,
              expires: Date.now() + (24 * 60 * 60 * 1000)
            });
          }
      
        } catch (error) {
          console.error('Error in subscription creation:', error);
          // Don't throw - we still want to return 200 to Stripe
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        console.log('Processing subscription.updated webhook:', {
          eventId: event.id,
          type: event.type,
          subscriptionId: subscription.id,
          status: subscription.status
        });
        
        try {
          const customer = await stripe.customers.retrieve(customerId);
          const userId = customer.metadata.firebaseUID;
      
          console.log('Updating subscription status for user:', {
            userId,
            status: subscription.status
          });
      
          const db = admin.database();
          await db.ref(`users/${userId}/subscription`).update({
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
            updatedAt: admin.database.ServerValue.TIMESTAMP
          });
      
          console.log('Successfully updated subscription status');
        } catch (error) {
          console.error('Error updating subscription:', error);
        }
        break;
      }

      // Add new case for Connect account updates
      case 'account.updated': {
        const account = event.data.object;
        const userId = account.metadata.firebaseUID;
        
        console.log('Received account.updated webhook:', {  // Add this logging
          accountId: account.id,
          userId: userId,
          details_submitted: account.details_submitted,
          payouts_enabled: account.payouts_enabled,
          charges_enabled: account.charges_enabled,
          raw_account: account 
        });
        
        if (userId) {
          const db = admin.database();
          const connectRef = db.ref(`users/${userId}/stripe_connect`);
          
          await connectRef.update({
            onboardingComplete: account.details_submitted,
            payoutEnabled: account.payouts_enabled,
            lastUpdated: admin.database.ServerValue.TIMESTAMP,
            chargesEnabled: account.charges_enabled,
            requiresAction: !account.details_submitted || !account.payouts_enabled
          });
      
          // Add confirmation log
          console.log('Updated Connect account status in Firebase:', {
            path: `users/${userId}/stripe_connect`,
            status: {
              onboardingComplete: account.details_submitted,
              payoutEnabled: account.payouts_enabled,
              chargesEnabled: account.charges_enabled
            }
          });

          // Clean up pending action if onboarding is complete
          if (account.details_submitted) {
            await db.ref(`users/${userId}/pendingActions/connectOnboarding`).remove();
          }
        }
        break;
      }
    }

    res.json({received: true});
  } catch (error) {
    console.error('Error processing webhook:', {
      error: error.message,
      eventType: event.type,
      stack: error.stack
    });
    
    // Send 500 to trigger a retry
    res.status(500).json({
      error: error.message,
      details: 'Check Firebase Functions logs for more information'
    });
  }
});

// Add helper function for generating new onboarding links
exports.refreshConnectOnboarding = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be logged in');
  }

  try {
    const db = admin.database();
    const connectRef = db.ref(`users/${context.auth.uid}/stripe_connect`);
    const connectData = (await connectRef.once('value')).val();

    if (!connectData?.accountId) {
      throw new functions.https.HttpsError('failed-precondition', 'No Connect account found');
    }

    const accountLink = await stripe.accountLinks.create({
      account: connectData.accountId,
      refresh_url: `${functions.config().public.url}/dashboard/connect/refresh`,
      return_url: `${functions.config().public.url}/dashboard/connect/return`,
      type: 'account_onboarding'
    });

    // Update the pending action
    await db.ref(`users/${context.auth.uid}/pendingActions/connectOnboarding`).set({
      url: accountLink.url,
      expires: Date.now() + (24 * 60 * 60 * 1000)
    });

    return { url: accountLink.url };
  } catch (error) {
    console.error('Error refreshing onboarding link:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});