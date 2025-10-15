import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Shield, 
  Users, 
  Car, 
  CreditCard, 
  AlertTriangle,
  TrendingUp,
  FileText,
  Settings,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Activity,
  ArrowLeft
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

interface AdminStats {
  totalUsers: number;
  activeDrivers: number;
  totalTrips: number;
  revenue: number;
  pendingVerifications: number;
  reportedIssues: number;
}

interface PendingAction {
  id: string;
  type: 'verification' | 'report' | 'payment';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const stats: AdminStats = {
    totalUsers: 1247,
    activeDrivers: 89,
    totalTrips: 156,
    revenue: 2450000,
    pendingVerifications: 15,
    reportedIssues: 3
  };

  const pendingActions: PendingAction[] = [
    {
      id: '1',
      type: 'verification',
      title: 'Vérification conducteur',
      description: 'Jean Koffi - Documents en attente',
      priority: 'high',
      timestamp: '2h'
    },
    {
      id: '2',
      type: 'report',
      title: 'Signalement utilisateur',
      description: 'Comportement inapproprié signalé',
      priority: 'high',
      timestamp: '4h'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Problème de paiement',
      description: 'Transaction échouée - 15,000 FCFA',
      priority: 'medium',
      timestamp: '1j'
    }
  ];

  const recentActivities = [
    { action: 'Nouvel utilisateur inscrit', user: 'Marie Ngozi', time: '5 min' },
    { action: 'Trajet publié', user: 'Paul Biya', time: '12 min' },
    { action: 'Paiement effectué', user: 'Alice Mbarga', time: '25 min' },
    { action: 'Document validé', user: 'David Nkomo', time: '1h' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const handleQuickAction = (action: string) => {
    Alert.alert(
      'Action Administrative',
      `Fonctionnalité "${action}" sera bientôt disponible`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#7C3AED', '#A855F7']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Shield size={32} color="#FFFFFF" />
            <View>
              <Text style={styles.headerTitle}>Administration</Text>
              <Text style={styles.headerSubtitle}>Tableau de bord</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Période de sélection */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'today' && styles.activePeriod]}
            onPress={() => setSelectedPeriod('today')}>
            <Text style={[styles.periodText, selectedPeriod === 'today' && styles.activePeriodText]}>
              Aujourd'hui
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.activePeriod]}
            onPress={() => setSelectedPeriod('week')}>
            <Text style={[styles.periodText, selectedPeriod === 'week' && styles.activePeriodText]}>
              Cette semaine
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.activePeriod]}
            onPress={() => setSelectedPeriod('month')}>
            <Text style={[styles.periodText, selectedPeriod === 'month' && styles.activePeriodText]}>
              Ce mois
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Statistiques principales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques générales</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Users size={24} color="#1E3A8A" />
              <Text style={styles.statNumber}>{stats.totalUsers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Utilisateurs</Text>
              <View style={styles.statTrend}>
                <TrendingUp size={12} color="#059669" />
                <Text style={styles.trendText}>+12%</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <Car size={24} color="#059669" />
              <Text style={styles.statNumber}>{stats.activeDrivers}</Text>
              <Text style={styles.statLabel}>Conducteurs actifs</Text>
              <View style={styles.statTrend}>
                <TrendingUp size={12} color="#059669" />
                <Text style={styles.trendText}>+8%</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <Activity size={24} color="#EA580C" />
              <Text style={styles.statNumber}>{stats.totalTrips}</Text>
              <Text style={styles.statLabel}>Trajets aujourd'hui</Text>
              <View style={styles.statTrend}>
                <TrendingUp size={12} color="#059669" />
                <Text style={styles.trendText}>+15%</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <CreditCard size={24} color="#7C3AED" />
              <Text style={styles.statNumber}>{(stats.revenue / 1000).toFixed(0)}K</Text>
              <Text style={styles.statLabel}>Revenus (FCFA)</Text>
              <View style={styles.statTrend}>
                <TrendingUp size={12} color="#059669" />
                <Text style={styles.trendText}>+22%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions en attente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions en attente ({pendingActions.length})</Text>
          <View style={styles.pendingCard}>
            {pendingActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.pendingItem}>
                <View style={styles.pendingLeft}>
                  <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(action.priority) }]} />
                  <View style={styles.pendingInfo}>
                    <Text style={styles.pendingTitle}>{action.title}</Text>
                    <Text style={styles.pendingDescription}>{action.description}</Text>
                    <Text style={styles.pendingTime}>Il y a {action.timestamp}</Text>
                  </View>
                </View>
                <View style={styles.pendingActions}>
                  <TouchableOpacity style={styles.approveButton}>
                    <CheckCircle size={16} color="#059669" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rejectButton}>
                    <XCircle size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Actions rapides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('Gérer utilisateurs')}>
              <Users size={24} color="#1E3A8A" />
              <Text style={styles.quickActionText}>Gérer utilisateurs</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('Valider documents')}>
              <FileText size={24} color="#059669" />
              <Text style={styles.quickActionText}>Valider documents</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('Modération')}>
              <Eye size={24} color="#EA580C" />
              <Text style={styles.quickActionText}>Modération</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('Rapports')}>
              <BarChart3 size={24} color="#7C3AED" />
              <Text style={styles.quickActionText}>Rapports</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('Signalements')}>
              <AlertTriangle size={24} color="#F59E0B" />
              <Text style={styles.quickActionText}>Signalements</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => handleQuickAction('Configuration')}>
              <Settings size={24} color="#6B7280" />
              <Text style={styles.quickActionText}>Configuration</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Activité récente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activité récente</Text>
          <View style={styles.activityCard}>
            {recentActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityUser}>{activity.user}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Alertes système */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alertes système</Text>
          <View style={styles.alertsCard}>
            <View style={styles.alertItem}>
              <AlertTriangle size={20} color="#F59E0B" />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Charge serveur élevée</Text>
                <Text style={styles.alertDescription}>CPU à 85% - Surveillance requise</Text>
              </View>
            </View>
            <View style={styles.alertItem}>
              <CheckCircle size={20} color="#059669" />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Sauvegarde réussie</Text>
                <Text style={styles.alertDescription}>Dernière sauvegarde: il y a 2h</Text>
              </View>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 4,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  settingsButton: {
    padding: 8,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriod: {
    backgroundColor: '#FFFFFF',
  },
  periodText: {
    fontSize: 14,
    color: '#E0E7FF',
    fontWeight: '500',
  },
  activePeriodText: {
    color: '#7C3AED',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  pendingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  pendingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  pendingInfo: {
    flex: 1,
  },
  pendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  pendingDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  pendingTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  pendingActions: {
    flexDirection: 'row',
    gap: 8,
  },
  approveButton: {
    backgroundColor: '#DCFCE7',
    padding: 8,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
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
  quickActionText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E3A8A',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  activityUser: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  alertsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
});