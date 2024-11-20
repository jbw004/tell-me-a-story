import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { loadCreatorSubscription } from '../firebase';
import { getDatabase, ref, get, onValue } from 'firebase/database';

// Initialize Stripe outside component to avoid recreation
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const functions = getFunctions();

const getConnectStatusDisplay = (connectAccount) => {
  if (!connectAccount) {
    return {
      message: 'Set up payout account to receive sticker earnings',
      actionText: 'Set up now',
      type: 'setup',
      color: 'text-indigo-600'
    };
  }

  if (!connectAccount.onboardingComplete) {
    return {
      message: 'Complete your payout account setup',
      actionText: 'Continue setup',
      type: 'incomplete',
      color: 'text-yellow-600'
    };
  }

  if (!connectAccount.payoutEnabled) {
    return {
      message: '⚠️ Account verification in progress',
      actionText: 'Check status',
      type: 'pending',
      color: 'text-yellow-600'
    };
  }

  if (connectAccount.requiresAction) {
    return {
      message: '⚠️ Account requires attention',
      actionText: 'Review',
      type: 'action_required',
      color: 'text-red-600'
    };
  }

  return {
    message: '✓ Ready to receive sticker payments',
    actionText: 'View dashboard',
    type: 'active',
    color: 'text-green-600'
  };
};

const SubscriptionManager = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [connectAccount, setConnectAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [pendingOnboardingUrl, setPendingOnboardingUrl] = useState(null);

  useEffect(() => {
    const loadStatus = async () => {
      if (!user) return;
      
      try {
        const subscriptionData = await loadCreatorSubscription(user.uid);
        setSubscription(subscriptionData);
        
        // Check Connect account status
        const db = getDatabase();
        const connectRef = ref(db, `users/${user.uid}/stripe_connect`);
        const connectSnap = await get(connectRef);
        setConnectAccount(connectSnap.val());

        // Check for pending onboarding
        if (subscriptionData?.status === 'active') {
          const pendingRef = ref(db, `users/${user.uid}/pendingActions/connectOnboarding`);
          const pendingSnap = await get(pendingRef);
          
          if (pendingSnap.exists()) {
            const data = pendingSnap.val();
            if (data.expires > Date.now()) {
              setPendingOnboardingUrl(data.url);
              setShowOnboardingModal(true);
            } else {
              // Get fresh URL
              const refreshOnboarding = httpsCallable(functions, 'refreshConnectOnboarding');
              const { data: { url } } = await refreshOnboarding();
              setPendingOnboardingUrl(url);
              setShowOnboardingModal(true);
            }
          }
        }
        
        setError(null);
      } catch (error) {
        console.error('Error loading status:', error);
        setError('Failed to load subscription status');
      } finally {
        setIsLoading(false);
      }
    };

    loadStatus();
  }, [user]);

  const handleSubscribe = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');
      const { data: { sessionId } } = await createCheckoutSession({
        userId: user.uid,
        email: user.email
      });
      
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError('Failed to start subscription process');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleManageSubscription = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const createPortalSession = httpsCallable(functions, 'createPortalSession');
      const { data: { url } } = await createPortalSession({
        userId: user.uid
      });
      
      window.location.href = url;
    } catch (error) {
      console.error('Error accessing customer portal:', error);
      setError('Failed to access subscription management');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConnectAction = async () => {
    if (!user || isProcessing) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      if (!connectAccount?.accountId) {
        // Show onboarding modal
        setShowOnboardingModal(true);
      } else {
        // Get fresh onboarding URL
        const refreshOnboarding = httpsCallable(functions, 'refreshConnectOnboarding');
        const { data: { url } } = await refreshOnboarding();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error handling Connect action:', error);
      setError('Failed to access payout setup. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="subscription-manager p-4 bg-white rounded-lg shadow-sm">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="subscription-manager p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-2">Sticker Support</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enable readers to support you by placing stickers on your magazines
        </p>

        {error && (
        <div className="p-3 mb-4 bg-red-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
        
        {subscription?.status === 'active' ? (
          <>
            <div className="p-3 mb-4 bg-green-50 text-green-700 rounded-md">
              <p className="font-medium">Sticker Support is active</p>
              <p className="text-sm">Readers can purchase and place stickers on your magazines</p>

              {/* New Connect account status */}
              {subscription?.status === 'active' && (
                <div className="mt-2 pt-2 border-t border-green-100">
                  {(() => {
                    const status = getConnectStatusDisplay(connectAccount);
                    return (
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${status.color}`}>
                          {status.message}
                        </p>
                        {status.type !== 'active' && (
                          <button
                            onClick={handleConnectAction}
                            disabled={isProcessing}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            {isProcessing ? 'Processing...' : status.actionText} →
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
            <button
              onClick={handleManageSubscription}
              disabled={isProcessing}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Manage Subscription'}
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Enable Sticker Support for:</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Let readers show appreciation with stickers</li>
                <li>Earn $2.99 per sticker placed</li>
                <li>Track earnings in your dashboard</li>
              </ul>
            </div>
            <div className="p-3 mb-4 bg-gray-50 rounded-md">
              <p className="text-lg font-medium">$5.99/month</p>
              <p className="text-sm text-gray-600">Cancel anytime</p>
            </div>
            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Subscribe Now'}
            </button>
          </>
        )}
      </div>

      {/* Onboarding Modal - moved outside main component div */}
      {showOnboardingModal && pendingOnboardingUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-2">
              Set Up Your Payouts
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Complete your payout setup to receive earnings from sticker purchases. This typically takes about 5 minutes.
            </p>
            <div className="mb-4">
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Secure payment processing by Stripe</li>
                <li>Receive $2.99 for each sticker placed</li>
                <li>Track earnings in your dashboard</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = pendingOnboardingUrl}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
              >
                Set Up Now
              </button>
              <button
                onClick={() => setShowOnboardingModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionManager;