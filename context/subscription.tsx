import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { SubscriptionPlan, UserSubscription, subscriptionPlans } from '../models/subscription';
import { useAuth } from './auth';

type SubscriptionContextType = {
  loading: boolean;
  userSubscription: UserSubscription | null;
  availablePlans: SubscriptionPlan[];
  currentPlan: SubscriptionPlan | null;
  fetchUserSubscription: () => Promise<void>;
  hasActiveSubscription: boolean;
  canUpgrade: boolean;
  getUpgradePlans: () => SubscriptionPlan[];
  refreshSubscription: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextType>({
  loading: true,
  userSubscription: null,
  availablePlans: subscriptionPlans,
  currentPlan: null,
  fetchUserSubscription: async () => {},
  hasActiveSubscription: false,
  canUpgrade: false,
  getUpgradePlans: () => [],
  refreshSubscription: async () => {},
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);

  const fetchUserSubscription = async () => {
    if (!user) {
      setUserSubscription(null);
      setCurrentPlan(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        setUserSubscription(null);
        setCurrentPlan(null);
      } else if (data) {
        // Convert from Supabase column names to our model property names
        const subscription: UserSubscription = {
          id: data.id,
          userId: data.user_id,
          planId: data.plan_id,
          startDate: new Date(data.start_date),
          endDate: new Date(data.end_date),
          status: data.status,
          paymentId: data.payment_id
        };
        
        setUserSubscription(subscription);
        
        // Find the matching plan
        const plan = subscriptionPlans.find(p => p.id === subscription.planId);
        setCurrentPlan(plan || null);
      } else {
        setUserSubscription(null);
        setCurrentPlan(null);
      }
    } catch (error) {
      console.error('Unexpected error fetching subscription:', error);
      setUserSubscription(null);
      setCurrentPlan(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSubscription();
  }, [user]);

  // Check if user has an active subscription
  const hasActiveSubscription = Boolean(userSubscription && 
    userSubscription.status === 'active' && 
    new Date(userSubscription.endDate) > new Date());

  // Check if the user can upgrade (has a subscription but not premium)
  const canUpgrade = hasActiveSubscription && currentPlan?.id !== 'premium';

  // Get plans that are better than the current plan
  const getUpgradePlans = (): SubscriptionPlan[] => {
    if (!currentPlan) return subscriptionPlans;
    
    const currentPlanIndex = subscriptionPlans.findIndex(plan => plan.id === currentPlan.id);
    if (currentPlanIndex === -1 || currentPlanIndex === subscriptionPlans.length - 1) {
      return [];
    }
    
    return subscriptionPlans.slice(currentPlanIndex + 1);
  };

  const refreshSubscription = async () => {
    await fetchUserSubscription();
  };

  const value = {
    loading,
    userSubscription,
    availablePlans: subscriptionPlans,
    currentPlan,
    fetchUserSubscription,
    hasActiveSubscription,
    canUpgrade,
    getUpgradePlans,
    refreshSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
