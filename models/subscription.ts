export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in months
  features: string[];
  isPopular?: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  paymentId?: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 499,
    duration: 1,
    features: [
      'Access to basic features',
      'Limited ride requests',
      'Standard driver support',
      'Basic analytics'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: 999,
    duration: 3,
    features: [
      'All Basic features',
      'Priority ride matching',
      'Premium driver support',
      'Advanced analytics',
      'Reduced commission rates'
    ],
    isPopular: true
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 2499,
    duration: 6,
    features: [
      'All Standard features',
      'Top priority in ride matching',
      'Dedicated support',
      'Comprehensive analytics',
      'Lowest commission rates',
      'Early access to new features'
    ]
  }
];
