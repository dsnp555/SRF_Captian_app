import { View, Text, StyleSheet, Switch, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function HomeScreen() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome, Koti</Text>
        <View style={styles.availabilityToggle}>
          <Text style={styles.toggleLabel}>You are {isAvailable ? 'available' : 'not available'} for ride now!</Text>
          <Switch value={isAvailable} onValueChange={setIsAvailable} />
        </View>
      </View>

      {/* Metrics Grid */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <MaterialIcons name="account-balance-wallet" size={24} color="#007AFF" />
          <Text style={styles.metricValue}>₹1200</Text>
          <Text style={styles.metricLabel}>Total Earning</Text>
        </View>
        
        <View style={styles.metricCard}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.metricValue}>12</Text>
          <Text style={styles.metricLabel}>Complete Ride</Text>
        </View>

        <View style={styles.metricCard}>
          <MaterialIcons name="pending" size={24} color="#FF9800" />
          <Text style={styles.metricValue}>1</Text>
          <Text style={styles.metricLabel}>Pending Ride</Text>
        </View>

        <View style={styles.metricCard}>
          <MaterialIcons name="cancel" size={24} color="#FF3B30" />
          <Text style={styles.metricValue}>04</Text>
          <Text style={styles.metricLabel}>Cancel Ride</Text>
        </View>
      </View>

      {/* Mothly Current Plan Section */}
      <View style={[styles.subscriptionPlans, { marginBottom: 0 }]}>
        <Text style={styles.sectionTitle}>Current Plan</Text>
        <View style={[styles.planCard, styles.premiumPlan]}>
          <View style={styles.planHeader}>
            <Text style={[styles.planName, { color: '#FFFFFF' }]}>Monthly</Text>
            <Text style={[styles.planPrice, { color: '#FFFFFF' }]}>₹1400<Text style={[styles.planPeriod, { color: '#FFFFFF' }]}>/month</Text></Text>
          </View>
          <View style={styles.planFeatures}>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#FFFFFF" />
              <Text style={[styles.featureText, { color: '#FFFFFF' }]}>Unlimited Rides</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="calendar-today" size={20} color="#FFFFFF" />
              <Text style={[styles.featureText, { color: '#FFFFFF' }]}>Renews on Aug 14, 2023</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Subscription Plans Section */}
      <View style={styles.subscriptionPlans}>
        <Text style={styles.sectionTitle}>Subscription Plans</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plansScroll}>
          {/* Basic Plan */}
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Daily</Text>
              <Text style={styles.planPrice}>₹50<Text style={styles.planPeriod}>/per day</Text></Text>
            </View>
            <View style={styles.planFeatures}>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Unlimited Rides</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Basic Support</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Standard Routes</Text>
              </View>
            </View>
          </View>

          {/* Premium Plan */}
          <View style={[styles.planCard, styles.premiumPlan]}>
            <View style={styles.planHeader}>
              <Text style={[styles.planName, { color: '#FFFFFF' }]}>Monthly</Text>
              <Text style={[styles.planPrice, { color: '#FFFFFF' }]}>1400<Text style={[styles.planPeriod, { color: '#FFFFFF' }]}>/month</Text></Text>
            </View>
            <View style={styles.planFeatures}>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#FFFFFF" />
                <Text style={[styles.featureText, { color: '#FFFFFF' }]}>Unlimited Rides</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#FFFFFF" />
                <Text style={[styles.featureText, { color: '#FFFFFF' }]}>Priority Support</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#FFFFFF" />
                <Text style={[styles.featureText, { color: '#FFFFFF' }]}>Optimized Route</Text>
              </View>
            </View>
          </View>

          {/* Pro Plan */}
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Annual</Text>
              <Text style={styles.planPrice}>₹1650<Text style={styles.planPeriod}>/year</Text></Text>
            </View>
            <View style={styles.planFeatures}>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Unlimited Rides</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Route Optimization</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Parcel Delivery</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Recent Rides Section */}
      <View style={styles.recentRides}>
        <Text style={styles.sectionTitle}>Recent Rides</Text>
        <View style={styles.rideCard}>
          <View style={styles.rideHeader}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/40' }}
                style={styles.userAvatar}
              />
              <View>
                <Text style={styles.userName}>Shahriar Sajeeb</Text>
                <Text style={styles.rideTime}>14 July 01:34 pm</Text>
              </View>
            </View>
            <View style={styles.rideMetrics}>
              <Text style={styles.rideAmount}>₹142</Text>
              <Text style={styles.rideDistance}>8km</Text>
            </View>
          </View>
          <View style={styles.locations}>
            <View style={styles.locationItem}>
              <MaterialIcons name="location-on" size={20} color="#8E8E93" />
              <Text style={styles.locationText}>Chinna rice mill,Pullala Charuvvu</Text>
            </View>
            <View style={styles.locationItem}>
              <MaterialIcons name="location-on" size={20} color="#007AFF" />
              <Text style={styles.locationText}>Y Palem Bustand </Text>
            </View>
          </View>
        </View>

        <View style={[styles.rideCard, { marginTop: 16 }]}>
          <View style={styles.rideHeader}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/40' }}
                style={styles.userAvatar}
              />
              <View>
                <Text style={styles.userName}>Mehedi Hassan</Text>
                <Text style={styles.rideTime}>14 July 11:20 am</Text>
              </View>
            </View>
            <View style={styles.rideMetrics}>
              <Text style={styles.rideAmount}>₹220</Text>
              <Text style={styles.rideDistance}>12km</Text>
            </View>
          </View>
          <View style={styles.locations}>
            <View style={styles.locationItem}>
              <MaterialIcons name="location-on" size={20} color="#8E8E93" />
              <Text style={styles.locationText}>Kotha peta, Road 10, Chirala</Text>
            </View>
            <View style={styles.locationItem}>
              <MaterialIcons name="location-on" size={20} color="#007AFF" />
              <Text style={styles.locationText}>ILTD Factory,Perala</Text>
            </View>
          </View>
        </View>

        <View style={[styles.rideCard, { marginTop: 16 }]}>
          <View style={styles.rideHeader}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/40' }}
                style={styles.userAvatar}
              />
              <View>
                <Text style={styles.userName}>Rakib Islam</Text>
                <Text style={styles.rideTime}>13 July 03:45 pm</Text>
              </View>
            </View>
            <View style={styles.rideMetrics}>
              <Text style={styles.rideAmount}>₹180</Text>
              <Text style={styles.rideDistance}>10km</Text>
            </View>
          </View>
          <View style={styles.locations}>
            <View style={styles.locationItem}>
              <MaterialIcons name="location-on" size={20} color="#8E8E93" />
              <Text style={styles.locationText}>Brodi Pet, Guntur</Text>
            </View>
            <View style={styles.locationItem}>
              <MaterialIcons name="location-on" size={20} color="#007AFF" />
              <Text style={styles.locationText}>New Railway Station,Guntur</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subscriptionPlans: {
    marginTop: 16,
    marginBottom: 16,
  },
  plansScroll: {
    marginTop: 12,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  premiumPlan: {
    backgroundColor: '#007AFF',
  },
  planHeader: {
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  planPeriod: {
    fontSize: 14,
    color: '#8E8E93',
  },
  planFeatures: {
    gap: 12,
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
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  availabilityToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#000000',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    marginTop: 8,
  },
  metricCard: {
    width: '46%',
    backgroundColor: '#FFFFFF',
    margin: '2%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  recentRides: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  rideTime: {
    fontSize: 14,
    color: '#8E8E93',
  },
  rideMetrics: {
    alignItems: 'flex-end',
  },
  rideAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  rideDistance: {
    fontSize: 14,
    color: '#8E8E93',
  },
  locations: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 8,
    flex: 1,
  },
});