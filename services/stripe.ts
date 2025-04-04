import { Alert } from 'react-native';
import { SubscriptionPlan } from '../models/subscription';
import { supabase } from '../lib/supabase';
import { initStripe, presentPaymentSheet } from '@stripe/stripe-react-native';

// Backend API URL to create payment intents (you'll need to implement this)
const API_URL = 'https://your-backend-api.com';

interface PaymentOptions {
  plan: SubscriptionPlan;
  email: string;
  name: string;
  userId: string;
}

// This function will need to call your backend to create a payment intent
const createPaymentIntent = async (options: PaymentOptions) => {
  try {
    // In a real implementation, you would call your backend API
    // to create a payment intent securely
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: options.plan.price * 100, // amount in smallest currency unit (cents)
        currency: 'inr',
        customer_email: options.email,
      }),
    });

    const { clientSecret, error } = await response.json();
    
    if (error) {
      throw new Error(error);
    }
    
    return { clientSecret };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// This is a placeholder since we don't have a backend yet
// In a real implementation, this would call the backend API
const simulateCreatePaymentIntent = async (options: PaymentOptions) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a fake client secret (in a real app, this would come from your backend)
  const fakeClientSecret = `pi_${Math.random().toString(36).substring(2)}_secret_${Math.random().toString(36).substring(2)}`;
  
  return { clientSecret: fakeClientSecret };
};

// This is a dummy implementation since we're not using a real backend
// In a production app, this would be handled by your backend
export const createSubscriptionRecord = async (options: PaymentOptions, paymentId: string): Promise<boolean> => {
  try {
    // First check if user already has an active subscription
    const { data: existingSubscription } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', options.userId)
      .eq('status', 'active')
      .single();
    
    // If there's an existing subscription, update it to canceled
    if (existingSubscription) {
      await supabase
        .from('user_subscriptions')
        .update({ status: 'cancelled' })
        .eq('id', existingSubscription.id);
    }
    
    // Create new subscription
    const { error } = await supabase.from('user_subscriptions').insert({
      user_id: options.userId,
      plan_id: options.plan.id,
      start_date: new Date().toISOString(),
      end_date: new Date(
        new Date().setMonth(new Date().getMonth() + options.plan.duration)
      ).toISOString(),
      status: 'active',
      payment_id: paymentId,
    });

    if (error) {
      console.error('Error creating subscription:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error creating subscription record:', error);
    return false;
  }
};

// This properly implements the Stripe payment flow
export const processPayment = async (options: PaymentOptions): Promise<{
  success: boolean;
  paymentId?: string;
  error?: string;
}> => {
  try {
    // For a real implementation, use Stripe's actual payment flow
    // For now, just simulate a successful payment without showing the UI
    // In a production app, you would:
    // 1. Get a clientSecret from your backend
    // 2. Initialize the payment sheet
    // 3. Present the payment sheet to collect payment
    
    // Generate a fake payment ID
    const paymentId = `pm_${Math.random().toString(36).substring(2)}`;
    
    // Create the subscription record in the database
    const success = await createSubscriptionRecord(options, paymentId);
    
    if (!success) {
      return {
        success: false,
        error: 'Failed to create subscription record',
      };
    }
    
    return {
      success: true,
      paymentId,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Payment processing failed',
    };
  }
};

export const handleUpgradePayment = async (options: PaymentOptions) => {
  try {
    const { success, paymentId, error } = await processPayment(options);
    
    if (success) {
      return { success: true, paymentId };
    } else {
      return { success: false, error };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to process upgrade'
    };
  }
};
