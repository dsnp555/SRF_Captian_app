import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function WalletScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Available Balance</Text>
        <Text style={styles.balanceAmount}>₹4598.50</Text>
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>Withdraw to Bank</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.earningsCard}>
        <Text style={styles.sectionTitle}>Today's Earnings</Text>
        <View style={styles.earningsRow}>
          <View style={styles.earningItem}>
            <Text style={styles.earningLabel}>Rides</Text>
            <Text style={styles.earningAmount}>35</Text>
          </View>
          <View style={styles.earningItem}>
            <Text style={styles.earningLabel}>Ride-AMT</Text>
            <Text style={styles.earningAmount}>₹920.00</Text>
          </View>
          <View style={styles.earningItem}>
            <Text style={styles.earningLabel}>Tips</Text>
            <Text style={styles.earningAmount}>₹50.00</Text>
          </View>
          <View style={styles.earningItem}>
            <Text style={styles.earningLabel}>Total</Text>
            <Text style={styles.earningAmount}>₹970.00</Text>
          </View>
        </View>
      </View>

      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {[
          {
            id: 1,
            type: 'Ride Payment',
            amount: '+₹288.00',
            date: 'Today, 2:30 PM',
            icon: 'directions-car'
          },
          {
            id: 2,
            type: 'Withdrawal',
            amount: '-₹1500.00',
            date: 'Today, 11:45 AM',
            icon: 'account-balance'
          },
          {
            id: 3,
            type: 'Tip Received',
            amount: '+₹50.00',
            date: 'Today, 10:15 AM',
            icon: 'emoji-emotions'
          },
          {
            id: 4,
            type: 'Ride Payment',
            amount: '+₹350.00',
            date: 'Yesterday, 8:20 PM',
            icon: 'directions-car'
          },
          {
            id: 5,
            type: 'Bonus Earned',
            amount: '+₹200.00',
            date: 'Yesterday, 6:00 PM',
            icon: 'star'
          }
        ].map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionIcon}>
              <MaterialIcons name={transaction.icon as keyof typeof MaterialIcons.glyphMap} size={24} color="#007AFF" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>{transaction.type}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={[styles.transactionAmount, 
              {color: transaction.amount.startsWith('+') ? '#4CAF50' : '#FF3B30'}]}>
              {transaction.amount}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  balanceCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  withdrawButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  earningsCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earningItem: {
    flex: 1,
    alignItems: 'center',
  },
  earningLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  earningAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  transactionsSection: {
    margin: 16,
    marginTop: 0,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
});