import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  AlertTriangle,
  Smartphone,
  Calendar,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Zap,
  Award,
  Activity
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(user?.profileType || 'client');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user?.profileType) {
      setUserProfile(user.profileType);
    }
  }, [user]);

  const upcomingTrips = [
    {
      id: 1,
      from: 'Yaoundé',
      to: 'Douala',
      date: '2025-01-15',
      time: '08:00',
      seats: 3,
      price: 4000,
      driver: 'Jean Koffi',
      rating: 4.8,
      status: 'confirmed'
    },
    {
      id: 2,
      from: 'Douala',
      to: 'Bafoussam',
      date: '2025-01-16',
      time: '14:30',
      seats: 2,
      price: 3500,
      driver: 'Marie Ngozi',
      rating: 4.9,
      status: 'pending'
    }
  ];

  const driverTrips = [
    {
      id: 1,
      from: 'Yaoundé',
      to: 'Douala',
      date: '2025-01-15',
      time: '08:00',
      passengers: 3,
      maxSeats: 4,
      price: 4000,
      status: 'active',
      earnings: 12000
    }
  ];

  const handleSOS = () => {
    router.push('/sos/emergency');
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return '🌅 Bonjour';
    if (hour < 17) return '☀️ Bon après-midi';
    return '🌙 Bonsoir';
  };

  const renderClientDashboard = () => (
    <>
      {/* Actions rapides */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity 
          style={[styles.primaryActionCard]}
          onPress={() => router.push('/(tabs)/search')}>
          <LinearGradient
            colors={['#3B82F6', '#1D4ED8']}
            style={styles.actionGradient}>
            <BlurView intensity={20} style={styles.actionBlur}>
              <View style={styles.actionIcon}>
                <Search size={28} color="#FFFFFF" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Rechercher un trajet</Text>
                <Text style={styles.actionSubtitle}>Trouvez votre destination</Text>
              </View>
              <Zap size={20} color="#FCD34D" />
            </BlurView>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity 
            style={styles.secondaryActionCard}
            onPress={() => router.push('/(tabs)/map')}>
            <LinearGradient
              colors={['#059669', '#047857']}
              style={styles.secondaryGradient}>
              <MapPin size={20} color="#FFFFFF" />
              <Text style={styles.secondaryActionText}>Carte</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryActionCard}
            onPress={() => router.push('/(tabs)/wallet')}>
            <LinearGradient
              colors={['#7C3AED', '#5B21B6']}
              style={styles.secondaryGradient}>
              <DollarSign size={20} color="#FFFFFF" />
              <Text style={styles.secondaryActionText}>Cagnotte</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistiques */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>📊 Vos statistiques</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient colors={['#3B82F6', '#1D4ED8']} style={styles.statGradient}>
              <Activity size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>{user?.totalTrips || 0}</Text>
              <Text style={styles.statLabel}>Trajets</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.statGradient}>
              <Star size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>{user?.rating || 0}</Text>
              <Text style={styles.statLabel}>Note</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#059669', '#047857']} style={styles.statGradient}>
              <Award size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Fiabilité</Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* Trajets à venir */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚗 Mes réservations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripsScroll}>
          {upcomingTrips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <LinearGradient
                colors={trip.status === 'confirmed' ? ['#059669', '#047857'] : ['#F59E0B', '#D97706']}
                style={styles.tripGradient}>
                <BlurView intensity={20} style={styles.tripBlur}>
                  <View style={styles.tripHeader}>
                    <Text style={styles.tripRoute}>{trip.from} → {trip.to}</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>
                        {trip.status === 'confirmed' ? '✓' : '⏳'}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.tripDetails}>
                    <View style={styles.tripDetail}>
                      <Calendar size={14} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.tripDetailText}>{trip.date}</Text>
                    </View>
                    <View style={styles.tripDetail}>
                      <Clock size={14} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.tripDetailText}>{trip.time}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.tripFooter}>
                    <Text style={styles.tripPrice}>{trip.price} FCFA</Text>
                    <Text style={styles.tripDriver}>{trip.driver}</Text>
                  </View>
                </BlurView>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );

  const renderDriverDashboard = () => (
    <>
      {/* Actions conducteur */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity 
          style={[styles.primaryActionCard]}
          onPress={() => router.push('/driver/publish-trip')}>
          <LinearGradient
            colors={['#059669', '#047857']}
            style={styles.actionGradient}>
            <BlurView intensity={20} style={styles.actionBlur}>
              <View style={styles.actionIcon}>
                <Plus size={28} color="#FFFFFF" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Publier un trajet</Text>
                <Text style={styles.actionSubtitle}>Partagez votre route</Text>
              </View>
              <Zap size={20} color="#FCD34D" />
            </BlurView>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity 
            style={styles.secondaryActionCard}
            onPress={() => router.push('/driver/dashboard')}>
            <LinearGradient
              colors={['#3B82F6', '#1D4ED8']}
              style={styles.secondaryGradient}>
              <Activity size={20} color="#FFFFFF" />
              <Text style={styles.secondaryActionText}>Tableau de bord</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryActionCard}
            onPress={() => router.push('/(tabs)/wallet')}>
            <LinearGradient
              colors={['#7C3AED', '#5B21B6']}
              style={styles.secondaryGradient}>
              <DollarSign size={20} color="#FFFFFF" />
              <Text style={styles.secondaryActionText}>Revenus</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistiques conducteur */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>💰 Vos performances</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient colors={['#059669', '#047857']} style={styles.statGradient}>
              <TrendingUp size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Ce mois</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#7C3AED', '#5B21B6']} style={styles.statGradient}>
              <DollarSign size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>125K</Text>
              <Text style={styles.statLabel}>Revenus</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.statGradient}>
              <Star size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>{user?.rating || 0}</Text>
              <Text style={styles.statLabel}>Note</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </>
  );

  const renderAdminDashboard = () => (
    <>
      {/* Actions admin */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity 
          style={[styles.primaryActionCard]}
          onPress={() => router.push('/admin/dashboard')}>
          <LinearGradient
            colors={['#7C3AED', '#5B21B6']}
            style={styles.actionGradient}>
            <BlurView intensity={20} style={styles.actionBlur}>
              <View style={styles.actionIcon}>
                <Activity size={28} color="#FFFFFF" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Tableau de bord</Text>
                <Text style={styles.actionSubtitle}>Gérez la plateforme</Text>
              </View>
              <Zap size={20} color="#FCD34D" />
            </BlurView>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity 
            style={styles.secondaryActionCard}
            onPress={() => router.push('/admin/reports')}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.secondaryGradient}>
              <AlertTriangle size={20} color="#FFFFFF" />
              <Text style={styles.secondaryActionText}>Signalements</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryActionCard}
            onPress={() => router.push('/admin/documents')}>
            <LinearGradient
              colors={['#059669', '#047857']}
              style={styles.secondaryGradient}>
              <CheckCircle size={20} color="#FFFFFF" />
              <Text style={styles.secondaryActionText}>Documents</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistiques admin */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>📈 Vue d'ensemble</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient colors={['#3B82F6', '#1D4ED8']} style={styles.statGradient}>
              <Users size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Utilisateurs</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.statGradient}>
              <AlertTriangle size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Signalements</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#059669', '#047857']} style={styles.statGradient}>
              <CheckCircle size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>À valider</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header avec dégradé */}
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.username}>{user?.name || 'Utilisateur'}</Text>
            <Text style={styles.timeText}>
              {currentTime.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={handleSOS} 
            style={styles.sosButton}>
            <LinearGradient
              colors={['#EF4444', '#DC2626']}
              style={styles.sosGradient}>
              <Smartphone size={18} color="#FFFFFF" />
              <Text style={styles.sosText}>SOS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        {/* Sélecteur de profil */}
        <BlurView intensity={30} style={styles.profileToggle}>
          <TouchableOpacity 
            style={[styles.toggleButton, userProfile === 'client' && styles.activeToggle]}
            onPress={() => setUserProfile('client')}>
            <Text style={[styles.toggleText, userProfile === 'client' && styles.activeToggleText]}>
              👤 Client
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, userProfile === 'driver' && styles.activeToggle]}
            onPress={() => setUserProfile('driver')}>
            <Text style={[styles.toggleText, userProfile === 'driver' && styles.activeToggleText]}>
              🚗 Conducteur
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, userProfile === 'admin' && styles.activeToggle]}
            onPress={() => setUserProfile('admin')}>
            <Text style={[styles.toggleText, userProfile === 'admin' && styles.activeToggleText]}>
              ⚙️ Admin
            </Text>
          </TouchableOpacity>
        </BlurView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {userProfile === 'client' && renderClientDashboard()}
        {userProfile === 'driver' && renderDriverDashboard()}
        {userProfile === 'admin' && renderAdminDashboard()}
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 4,
  },
  username: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#64748B',
    textTransform: 'capitalize',
  },
  sosButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  sosGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  sosText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  profileToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 4,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeToggle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  toggleText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 14,
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  quickActionsContainer: {
    marginBottom: 30,
  },
  primaryActionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  actionGradient: {
    flex: 1,
  },
  actionBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryActionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  secondaryActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsSection: {
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
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statGradient: {
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  tripsScroll: {
    paddingVertical: 8,
  },
  tripCard: {
    width: width * 0.75,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tripGradient: {
    flex: 1,
  },
  tripBlur: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripRoute: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tripDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tripDetailText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tripDriver: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});