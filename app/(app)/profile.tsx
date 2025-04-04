<<<<<<< HEAD
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
=======
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/auth';
import { useSubscription } from '../../context/subscription';
import UpgradeSubscription from '../../components/UpgradeSubscription';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const { userSubscription, loading, refreshSubscription, availablePlans } = useSubscription();

  // Fetch subscription whenever the profile screen is viewed
  useEffect(() => {
    refreshSubscription();
  }, []);

  const currentPlan = userSubscription 
    ? availablePlans.find(plan => plan.id === userSubscription.planId) 
    : null;
  
  const hasActiveSubscription = Boolean(userSubscription && 
    userSubscription.status === 'active' && 
    new Date(userSubscription.endDate) > new Date());

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => signOut()
        }
      ]
    );
  };

  const navigateToPlans = () => {
    router.push('/(auth)/plans');
  };

>>>>>>> 93ccba0 (Initial commit)
  const profileSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person', label: 'Personal Information' },
        { icon: 'directions-car', label: 'Vehicle Details' },
        { icon: 'document-scanner', label: 'Documents' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'notifications', label: 'Notifications' },
        { icon: 'language', label: 'Language' },
        { icon: 'location-on', label: 'Location' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help', label: 'Help Center' },
        { icon: 'chat', label: 'Contact Support' },
        { icon: 'info', label: 'About' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400' }}
            style={styles.profileImage}
          />
        </View>
<<<<<<< HEAD
        <Text style={styles.name}>Koti</Text>
        <Text style={styles.rating}>⭐ 4.8 (485 rides)</Text>
      </View>

=======
        <Text style={styles.name}>{user?.email ? user.email.split('@')[0] : 'Koti'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
        <Text style={styles.rating}>⭐ 4.8 (485 rides)</Text>
      </View>

      {/* Subscription Status */}
      <View style={styles.subscriptionContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0070FF" />
            <Text style={styles.subscriptionText}>Loading subscription info...</Text>
          </View>
        ) : hasActiveSubscription && currentPlan ? (
          <View>
            <Text style={styles.subscriptionText}>
              Current Plan: <Text style={styles.planName}>{currentPlan.name}</Text>
            </Text>
            <Text style={styles.subscriptionDetails}>
              ₹{currentPlan.price}/{currentPlan.duration === 1 ? 'month' : `${currentPlan.duration} months`}
            </Text>
            <Text style={styles.subscriptionDetails}>
              Valid until: {userSubscription ? new Date(userSubscription.endDate).toLocaleDateString() : ''}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.subscriptionText}>No active subscription</Text>
            <TouchableOpacity style={styles.subscribeButton} onPress={navigateToPlans}>
              <Text style={styles.subscribeButtonText}>Choose a Plan</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Upgrade Subscription Component - only show if user has an active subscription that's not premium */}
      {hasActiveSubscription && currentPlan && currentPlan.id !== 'premium' && (
        <UpgradeSubscription onComplete={refreshSubscription} />
      )}

>>>>>>> 93ccba0 (Initial commit)
      {profileSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
<<<<<<< HEAD
            <TouchableOpacity key={itemIndex} style={styles.menuItem}>
              <View style={styles.menuItemIcon}>
                <MaterialIcons name={item.icon as any} size={24} color="#007AFF" />
              </View>
              <Text style={styles.menuItemLabel}>{item.label}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#8E8E93" />
=======
            <TouchableOpacity key={itemIndex} style={styles.sectionItem}>
              <MaterialIcons name={item.icon as any} size={24} color="#555" />
              <Text style={styles.sectionItemText}>{item.label}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#999" />
>>>>>>> 93ccba0 (Initial commit)
            </TouchableOpacity>
          ))}
        </View>
      ))}

<<<<<<< HEAD
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
=======
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
>>>>>>> 93ccba0 (Initial commit)
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
<<<<<<< HEAD
=======
  email: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
>>>>>>> 93ccba0 (Initial commit)
  rating: {
    fontSize: 16,
    color: '#8E8E93',
  },
<<<<<<< HEAD
=======
  subscriptionContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subscriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  planName: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
>>>>>>> 93ccba0 (Initial commit)
  section: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
  },
<<<<<<< HEAD
  menuItem: {
=======
  sectionItem: {
>>>>>>> 93ccba0 (Initial commit)
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
<<<<<<< HEAD
  menuItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemLabel: {
=======
  sectionItemText: {
>>>>>>> 93ccba0 (Initial commit)
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    alignItems: 'center',
  },
<<<<<<< HEAD
  logoutButtonText: {
=======
  logoutText: {
>>>>>>> 93ccba0 (Initial commit)
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
<<<<<<< HEAD
=======
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  subscriptionDetails: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
>>>>>>> 93ccba0 (Initial commit)
});