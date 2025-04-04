import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/auth';
import { processPayment } from '../../services/stripe';
import { subscriptionPlans } from '../../models/subscription';

export default function PlansScreen() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[1]); // Default to standard plan
  const [isLoading, setIsLoading] = useState(false);
  const params = useLocalSearchParams();
  const { fromRegistration } = params;

  const handleSelectPlan = (planId: string) => {
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to subscribe');
      return;
    }

    setIsLoading(true);

    try {
      const { success, error } = await processPayment({
        plan: selectedPlan,
        email: user.email || '',
        name: user.email?.split('@')[0] || 'Driver',
        userId: user.id,
      });

      if (success) {
        Alert.alert(
          'Subscription Successful',
          `You have successfully subscribed to the ${selectedPlan.name}!`,
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(app)'),
            },
          ]
        );
      } else {
        Alert.alert('Subscription Failed', error || 'An unknown error occurred');
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Subscription',
      'Without a subscription, your access to the app will be limited. Are you sure you want to skip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => router.replace('/(app)'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>
          Select a subscription plan that works best for you
        </Text>
      </View>

      <View style={styles.plansContainer}>
        {subscriptionPlans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan.id === plan.id && styles.selectedPlan,
              plan.isPopular && styles.popularPlan,
            ]}
            onPress={() => handleSelectPlan(plan.id)}
          >
            {plan.isPopular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>POPULAR</Text>
              </View>
            )}
            <Text style={[styles.planName, selectedPlan.id === plan.id && styles.selectedText]}>
              {plan.name}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <Text style={[styles.planPrice, selectedPlan.id === plan.id && styles.selectedText]}>
                {plan.price}
              </Text>
              <Text style={styles.duration}>/{plan.duration} month{plan.duration > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.subscribeButton, isLoading && styles.disabledButton]}
          onPress={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.subscribeButtonText}>
              Subscribe to {selectedPlan.name} for ₹{selectedPlan.price}
            </Text>
          )}
        </TouchableOpacity>

        {fromRegistration === 'true' && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  plansContainer: {
    padding: 16,
    gap: 16,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlan: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  popularPlan: {
    borderColor: '#FFC107',
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFC107',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  duration: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  featuresContainer: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedText: {
    color: '#007AFF',
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#80BDFF',
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    padding: 16,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#8E8E93',
    fontSize: 16,
  },
});
