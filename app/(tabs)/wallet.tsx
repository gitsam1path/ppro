import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Gift, 
  Users, 
  CreditCard,
  Smartphone,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function WalletScreen() {
  const [balance, setBalance] = useState(45750);
  const [referralCode, setReferralCode] = useState('DAVID2025');
  const [showBalance, setShowBalance] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const transactions = [
    {
      id: 1,
      type: 'earning',
      description: 'Commission trajet Yaoundé-Douala',
      amount: 800,
      date: '2025-01-14',
      status: 'completed'
    },
    {
      id: 2,
      type: 'referral',
      description: 'Parrainage - Jean Koffi',
      amount: 150,
      date: '2025-01-13',
      status: 'completed'
    },
    {
      id: 3,
      type: 'withdrawal',
      description: 'Retrait Mobile Money',
      amount: -10000,
      date: '2025-01-12',
      status: 'completed'
    },
    {
      id: 4,
      type: 'earning',
      description: 'Commission trajet Douala-Bafoussam',
      amount: 700,
      date: '2025-01-11',
      status: 'completed'
    }
  ];

  const referrals = [
    { name: 'Jean Koffi', earnings: 2400, date: '2024-12-15' },
    { name: 'Marie Ngozi', earnings: 1800, date: '2024-12-20' },
    { name: 'Paul Biya', earnings: 950, date: '2025-01-05' }
  ];

  const paymentMethods = [
    { name: 'Orange Money', icon: '📱', color: '#FF6B00' },
    { name: 'MTN Mobile Money', icon: '📱', color: '#FFCC00' },
    { name: 'Express Union', icon: '📱', color: '#0066CC' },
    { name: 'Carte Bancaire', icon: '💳', color: '#4F46E5' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#059669', '#10B981']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ma Cagnotte</Text>
        
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Solde disponible</Text>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceAmount}>
                  {showBalance ? `${balance.toLocaleString()} FCFA` : '••••• FCFA'}
                </Text>
                <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                  {showBalance ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <Wallet size={32} color="#059669" />
          </View>
          
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceAction}>
              <ArrowDownLeft size={20} color="#059669" />
              <Text style={styles.balanceActionText}>Retirer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceAction}>
              <ArrowUpRight size={20} color="#1E3A8A" />
              <Text style={[styles.balanceActionText, { color: '#1E3A8A' }]}>Recharger</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Retrait Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Retrait rapide</Text>
          <View style={styles.withdrawCard}>
            <Text style={styles.withdrawLabel}>Montant à retirer (min. 500 FCFA)</Text>
            <TextInput
              style={styles.withdrawInput}
              placeholder="Entrez le montant"
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
              keyboardType="numeric"
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.paymentMethods}>
              {paymentMethods.map((method, index) => (
                <TouchableOpacity key={index} style={styles.paymentMethod}>
                  <Text style={styles.paymentIcon}>{method.icon}</Text>
                  <Text style={styles.paymentName}>{method.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawButtonText}>Effectuer le retrait</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Parrainage Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Programme de parrainage</Text>
          <View style={styles.referralCard}>
            <View style={styles.referralHeader}>
              <Gift size={24} color="#EA580C" />
              <View style={styles.referralInfo}>
                <Text style={styles.referralTitle}>Votre code de parrain</Text>
                <Text style={styles.referralCode}>{referralCode}</Text>
              </View>
            </View>
            <Text style={styles.referralDescription}>
              Partagez votre code et gagnez 1% des revenus de vos filleuls pendant 2 ans !
            </Text>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Partager mon code</Text>
            </TouchableOpacity>
          </View>
          
          {referrals.length > 0 && (
            <View style={styles.referralsList}>
              <Text style={styles.referralsTitle}>Mes filleuls ({referrals.length})</Text>
              {referrals.map((referral, index) => (
                <View key={index} style={styles.referralItem}>
                  <View style={styles.referralItemInfo}>
                    <Text style={styles.referralName}>{referral.name}</Text>
                    <Text style={styles.referralDate}>Inscrit le {referral.date}</Text>
                  </View>
                  <Text style={styles.referralEarnings}>+{referral.earnings} FCFA</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Historique Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des transactions</Text>
          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  {transaction.type === 'earning' && <ArrowUpRight size={16} color="#059669" />}
                  {transaction.type === 'referral' && <Gift size={16} color="#EA580C" />}
                  {transaction.type === 'withdrawal' && <ArrowDownLeft size={16} color="#EF4444" />}
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount
                ]}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} FCFA
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Trajets ce mois</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Filleuls actifs</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>85,400</Text>
              <Text style={styles.statLabel}>Revenus totaux</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4,200</Text>
              <Text style={styles.statLabel}>Gains parrainage</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    gap: 8,
  },
  balanceActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  withdrawCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  withdrawLabel: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
    fontWeight: '500',
  },
  withdrawInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentMethods: {
    marginBottom: 16,
  },
  paymentMethod: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  paymentIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  paymentName: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  withdrawButton: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  referralCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  referralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  referralInfo: {
    flex: 1,
  },
  referralTitle: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  referralCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA580C',
  },
  referralDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  shareButton: {
    backgroundColor: '#EA580C',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  referralsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  referralsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  referralItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  referralItemInfo: {
    flex: 1,
  },
  referralName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  referralDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  referralEarnings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionIcon: {
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positiveAmount: {
    color: '#059669',
  },
  negativeAmount: {
    color: '#EF4444',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});