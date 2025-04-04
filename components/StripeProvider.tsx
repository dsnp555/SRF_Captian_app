import React, { useEffect, useState } from 'react';
import { StripeProvider as StripeProviderLib } from '@stripe/stripe-react-native';
import { View, Text, ActivityIndicator } from 'react-native';

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

type StripeProviderProps = {
  children: React.ReactNode;
};

export default function StripeProvider({ children }: StripeProviderProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simple validation to ensure the key is set
    if (!STRIPE_PUBLISHABLE_KEY || STRIPE_PUBLISHABLE_KEY === 'pk_test_your_key_here') {
      setError('Stripe publishable key is not properly configured.');
      setLoading(false);
      return;
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 16 }}>Setting up payment services...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 16, color: 'red', textAlign: 'center' }}>{error}</Text>
        <Text style={{ marginTop: 10, textAlign: 'center' }}>
          Please check your environment configuration for Stripe.
        </Text>
      </View>
    );
  }

  // Use the StripeProviderLib component correctly
  return (
    <StripeProviderLib 
      publishableKey={STRIPE_PUBLISHABLE_KEY} 
    >
      <>{children}</>
    </StripeProviderLib>
  );
}
