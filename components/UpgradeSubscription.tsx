import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { handleUpgradePayment } from '../services/stripe';
import { useAuth } from '../context/auth';
import { SubscriptionPlan, subscriptionPlans } from '../models/subscription';
import { useSubscription } from '../context/subscription';

interface UpgradeSubscriptionProps {
  onComplete?: () => void;
}

export default function UpgradeSubscription({ onComplete }: UpgradeSubscriptionProps) {
  const { user } = useAuth();
  const { userSubscription, refreshSubscription } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter out plans the user already has or lower
  const availableUpgrades = subscriptionPlans.filter(plan => {
    if (!userSubscription) return true;
    
    const currentPlan = subscriptionPlans.find(p => p.id === userSubscription.planId);
    if (!currentPlan) return true;
    
    return plan.price > currentPlan.price;
  });

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
  };

  const handleUpgrade = async () => {
    if (!user || !selectedPlan) {
      Alert.alert('Error', 'Please select a plan to upgrade');
      return;
    }

    setIsLoading(true);

    try {
      const { success, error } = await handleUpgradePayment({
        plan: selectedPlan,
        email: user.email || '',
        name: user.email?.split('@')[0] || 'Driver',
        userId: user.id,
      });

      if (success) {
        Alert.alert('Success', `You have successfully upgraded to the ${selectedPlan.name} plan!`);
        refreshSubscription();
        onComplete?.();
      } else {
        Alert.alert('Upgrade Failed', error || 'Failed to process upgrade');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade Your Plan</Text>
      <Text style={styles.subtitle}>
        You're currently on the {userSubscription?.planId} plan. Upgrade to get more features!
      </Text>

      <View style={styles.plansContainer}>
        {availableUpgrades.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>₹{plan.price}</Text>
            </View>
            
            <Text style={styles.planDuration}>
              {plan.duration} month{plan.duration > 1 ? 's' : ''}
            </Text>
            
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <Text key={index} style={styles.featureText}>• {feature}</Text>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.upgradeButton}
              onPress={() => handleSelectPlan(plan)}
            >
              <Text style={styles.upgradeButtonText}>Select Plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {selectedPlan && (
        <TouchableOpacity 
          style={styles.upgradeButton}
          onPress={handleUpgrade}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  planName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  planDuration: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  featuresContainer: {
    gap: 4,
    marginBottom: 16,
  },
  featureText: {
    fontSize: 14,
    color: '#333333',
  },
  upgradeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
