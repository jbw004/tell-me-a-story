import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '../AuthContext';
import { Oval } from 'react-loader-spinner';

const EarningsPanel = () => {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEarnings = async () => {
      if (!user) return;
      
      try {
        const db = getDatabase();
        const earningsRef = ref(db, `users/${user.uid}/sticker_earnings`);
        const snapshot = await get(earningsRef);
        
        if (snapshot.exists()) {
          const earningsData = Object.entries(snapshot.val())
            .map(([id, data]) => ({
              id,
              ...data,
              amount: data.amount / 100, // Convert cents to dollars
              date: new Date(data.purchasedAt)
            }))
            .sort((a, b) => b.date - a.date);

          const total = earningsData.reduce((sum, earning) => 
            earning.status === 'completed' ? sum + earning.amount : sum, 0
          );

          setEarnings(earningsData);
          setTotalEarnings(total);
        } else {
          setEarnings([]);
          setTotalEarnings(0);
        }
      } catch (error) {
        console.error('Error loading earnings:', error);
        setError('Failed to load earnings data');
      } finally {
        setIsLoading(false);
      }
    };

    loadEarnings();
  }, [user]);

  const handleManagePayouts = async () => {
    setError(null);
    setIsLoadingDashboard(true);
    
    try {
      console.log('Starting dashboard link creation...');
      const functions = getFunctions();
      const createLoginLink = httpsCallable(functions, 'createStripeLoginLink');
      
      console.log('Calling createLoginLink function...');
      const result = await createLoginLink();
      
      console.log('Login link created:', result);
      
      if (result.data?.url) {
        window.open(result.data.url, '_blank');
      } else {
        throw new Error('No dashboard URL received');
      }
    } catch (error) {
      console.error('Error opening Stripe dashboard:', error);
      setError(error.message || 'Unable to open dashboard. Please try again later.');
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-600 text-center py-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Earnings Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-sm text-indigo-600 mb-1">Total Earnings</p>
          <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 mb-1">Available for Payout</p>
          <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Recent Earnings</h3>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Oval height={30} width={30} color="#6200ee" />
          </div>
        ) : earnings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No earnings yet</p>
        ) : (
          <div className="space-y-2">
            {earnings.slice(0, 5).map(earning => (
              <div key={earning.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Sticker placed on {earning.magazineId}</p>
                  <p className="text-sm text-gray-500">
                    {earning.date.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${earning.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{earning.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
        disabled={totalEarnings === 0 || isLoadingDashboard}
        onClick={handleManagePayouts}
      >
        {isLoadingDashboard ? (
          <>
            <Oval height={20} width={20} color="white" />
            <span>Loading Dashboard...</span>
          </>
        ) : (
          'Manage Payouts'
        )}
      </button>
    </div>
  );
};

export default EarningsPanel;