import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const mockRides = [
  {
    id: '1',
    date: '2024-02-20',
    time: '14:30',
    pickup: 'Clock Tower',
    dropoff: 'Ramapuram Beach',
    fare: '₹500',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-02-20',
    time: '13:15',
    pickup: 'old city',
    dropoff: 'ibrahim Patnam',
    fare: '₹300',
    status: 'cancelled',
  },
  {
    id: '3',
    date: '2024-02-20',
    time: '12:00',
    pickup: 'Yeswanthpur RailWay Station',
    dropoff: 'Chik pet',
    fare: '₹200',
    status: 'completed',
  },
];

export default function RidesScreen() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const renderRideItem = ({ item }: { item: typeof mockRides[0] }) => (
    <TouchableOpacity style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <Text style={styles.dateTime}>{`${item.date} ${item.time}`}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={20} color="#4CAF50" />
          <Text style={styles.locationText}>{item.pickup}</Text>
        </View>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={20} color="#FF3B30" />
          <Text style={styles.locationText}>{item.dropoff}</Text>
        </View>
      </View>
      <View style={styles.fareContainer}>
        <Text style={styles.fareLabel}>Fare</Text>
        <Text style={styles.fareAmount}>{item.fare}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockRides}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContainer: {
    padding: 16,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateTime: {
    fontSize: 16,
    color: '#8E8E93',
  },
  status: {
    fontSize: 16,
    fontWeight: '500',
  },
  locationContainer: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    marginLeft: 8,
  },
  fareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
  },
  fareLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
});