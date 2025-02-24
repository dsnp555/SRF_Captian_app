import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
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
        <Text style={styles.name}>Koti</Text>
        <Text style={styles.rating}>⭐ 4.8 (485 rides)</Text>
      </View>

      {profileSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity key={itemIndex} style={styles.menuItem}>
              <View style={styles.menuItemIcon}>
                <MaterialIcons name={item.icon as any} size={24} color="#007AFF" />
              </View>
              <Text style={styles.menuItemLabel}>{item.label}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#8E8E93" />
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
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
  rating: {
    fontSize: 16,
    color: '#8E8E93',
  },
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
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
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});