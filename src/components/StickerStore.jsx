import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const functions = getFunctions();

// Separate component for the payment form
const PaymentForm = ({ stickerId, onSuccess, onCancel, creatorId, magazineId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const getErrorMessage = (error) => {
    // Handle specific Connect account errors
    if (error.details?.code) {
      switch (error.details.code) {
        case 'CONNECT_ACCOUNT_MISSING':
          return 'The creator needs to complete their account setup before accepting stickers.';
        case 'CONNECT_ONBOARDING_INCOMPLETE':
          return 'The creator is still setting up their payment account. Please try again later.';
        case 'CONNECT_PAYOUTS_DISABLED':
          return 'The creator\'s account is being verified. Please try again later.';
        case 'CONNECT_CHARGES_DISABLED':
          return 'There\'s an issue with the creator\'s payment account. Please try again later.';
        default:
          return error.message || 'Payment failed. Please try again.';
      }
    }
    return error.message || 'Payment failed. Please try again.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isProcessing) return;
  
    try {
      setIsProcessing(true);
      setError(null);
  
      // Create payment intent without position data
      const createStickerPurchase = httpsCallable(functions, 'createStickerPurchase');
      const result = await createStickerPurchase({
        magazineId,
        creatorId,
        stickerType: stickerId,
        idempotencyKey: `${magazineId}-${Date.now()}`
      });

      // Check for Connect account errors
      if (result.data.error) {
        throw new Error(result.data.error);
      }
      
      const { clientSecret, paymentIntentId } = result.data;
  
      const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        }
      );
  
      if (paymentError) {
        // Handle Stripe payment errors
        throw new Error(paymentError.message || 'Payment failed');
      }
  
      if (paymentIntent.status === 'succeeded') {
        onSuccess({ stickerId, paymentIntentId });
      }
    } catch (error) {
      console.error('Payment failed:', error);
      
      // Use our error message helper
      setError(getErrorMessage(error));
      
      // If it's a Connect account error, we might want to disable the form
      if (error.details?.code?.startsWith('CONNECT_')) {
        elements.getElement(CardElement).disable();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : 'Pay $2.99'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const StickerStore = ({ onStickerSelect, isEnabled = true, creatorId, magazineId, requiresPayment = true }) => {
  const isPurchased = (stickerId) => {
    const sessionPurchases = JSON.parse(sessionStorage.getItem('purchasedStickers') || '[]');
    return sessionPurchases.includes(stickerId);
  };
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleStickerClick = (stickerId) => {
    if (!isEnabled) return;
    
    if (requiresPayment) {
      setSelectedSticker(stickerId);
      setShowPayment(true);
    } else {
      onStickerSelect?.(stickerId);
    }
  };

  const handlePaymentSuccess = ({ stickerId, paymentIntentId }) => {
    // Store the purchased sticker info in session storage
    const purchasedStickers = JSON.parse(sessionStorage.getItem('purchasedStickers') || '[]');
    sessionStorage.setItem('purchasedStickers', JSON.stringify([
      ...purchasedStickers,
      { stickerId, paymentIntentId }
    ]));
  
    setShowPayment(false);
    onStickerSelect?.({ stickerId, paymentIntentId }); // Pass to parent component
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setSelectedSticker(null);
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg overflow-hidden sticker-store">
      <div className="p-3 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-700">Support with Stickers</h3>
        {requiresPayment && (
          <p className="text-xs text-gray-500 mt-1">Place a sticker for $2.99</p>
        )}
      </div>
      
      {!showPayment ? (
        <div className="p-3 flex gap-2">
          <button
          onClick={() => handleStickerClick('heart')}
          className={`w-12 h-12 rounded-lg transition-all ${
            selectedSticker === 'heart' ? 'bg-pink-50 scale-110' : 'hover:bg-gray-50'
          }`}
        >
          <img 
            src="/images/heart_sticker.png" 
            alt="Heart Sticker" 
            className="w-full h-full object-contain"
          />
        </button>
        
        <button
          onClick={() => handleStickerClick('music')}
          className={`w-12 h-12 rounded-lg transition-all ${
            selectedSticker === 'music' ? 'bg-blue-50 scale-110' : 'hover:bg-gray-50'
          }`}
        >
          <img 
            src="/images/music_sticker.png" 
            alt="Music Sticker" 
            className="w-full h-full object-contain"
          />
        </button>
        
        <button
          onClick={() => handleStickerClick('sad')}
          className={`w-12 h-12 rounded-lg transition-all ${
            selectedSticker === 'sad' ? 'bg-yellow-50 scale-110' : 'hover:bg-gray-50'
          }`}
        >
          <img 
            src="/images/sad_sticker.png" 
            alt="Sad Sticker" 
            className="w-full h-full object-contain"
          />
        </button>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <PaymentForm
            stickerId={selectedSticker}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
            creatorId={creatorId}
            magazineId={magazineId}
          />
        </Elements>
      )}

      {!isEnabled && (
        <div className="p-3 bg-gray-50 text-sm text-gray-600">
          Sticker support is not enabled for this magazine
        </div>
      )}
    </div>
  );
};

export default StickerStore;