import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Star, 
  Settings, 
  FileText, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  Car,
  ChevronRight,
  Edit,
  LogOut,
  Bell
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout, isLoading } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const documents = {
    cni: 'Validé',
    license: 'Validé',
    carRegistration: 'En attente'
  };

  const menuSections = [
    {
      title: 'Mon compte',
      items: [
        { icon: Edit, label: 'Modifier le profil', action: () => router.push('/profile/edit') },
        { icon: FileText, label: 'Mes documents', action: () => {} },
        { icon: Car, label: 'Mes véhicules', action: () => {} },
        { icon: Star, label: 'Mes évaluations', action: () => {} },
        { icon: Shield, label: 'Changer le mot de passe', action: () => router.push('/profile/change-password') }
      ]
    },
    {
      title: 'Paramètres',
      items: [
        { icon: Bell, label: 'Notifications', action: () => {}, toggle: true },
        { icon: MapPin, label: 'Localisation', action: () => {}, toggle: true },
        { icon: Shield, label: 'Sécurité', action: () => {} },
        { icon: Settings, label: 'Préférences', action: () => {} }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: Phone, label: 'Nous contacter', action: () => {} },
        { icon: FileText, label: 'Aide & FAQ', action: () => {} },
        { icon: Shield, label: 'Conditions d\'utilisation', action: () => {} }
      ]
    }
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Se déconnecter', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </Text>
            </View>
            {user?.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name || 'Utilisateur'}</Text>
            <Text style={styles.userLocation}>Yaoundé, Cameroun</Text>
            <Text style={styles.memberSince}>Membre depuis {user?.memberSince || 'Récemment'}</Text>
          </View>
        </View>
        
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user?.rating || 0}</Text>
            <View style={styles.statRow}>
              <Star size={14} color="#FCD34D" />
              <Text style={styles.statLabel}>Note</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user?.totalTrips || 0}</Text>
            <Text style={styles.statLabel}>Trajets</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>98%</Text>
            <Text style={styles.statLabel}>Fiabilité</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Documents Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statut des documents</Text>
          <View style={styles.documentsCard}>
            <View style={styles.documentItem}>
              <Text style={styles.documentLabel}>Carte Nationale d'Identité</Text>
              <View style={[styles.statusBadge, styles.validatedStatus]}>
                <Text style={styles.statusText}>{documents.cni}</Text>
              </View>
            </View>
            <View style={styles.documentItem}>
              <Text style={styles.documentLabel}>Permis de conduire</Text>
              <View style={[styles.statusBadge, styles.validatedStatus]}>
                <Text style={styles.statusText}>{documents.license}</Text>
              </View>
            </View>
            <View style={styles.documentItem}>
              <Text style={styles.documentLabel}>Carte grise</Text>
              <View style={[styles.statusBadge, styles.pendingStatus]}>
                <Text style={styles.statusText}>{documents.carRegistration}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder
                  ]}
                  onPress={item.action}>
                  <View style={styles.menuItemLeft}>
                    <item.icon size={20} color="#6B7280" />
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  
                  {item.toggle ? (
                    <Switch
                      value={item.label === 'Notifications' ? user?.preferences?.notifications ?? notificationsEnabled : user?.preferences?.location ?? locationEnabled}
                      onValueChange={(value) => {
                        if (item.label === 'Notifications') {
                          setNotificationsEnabled(value);
                        } else {
                          setLocationEnabled(value);
                        }
                      }}
                      trackColor={{ false: '#E5E7EB', true: '#1E3A8A' }}
                      thumbColor="#FFFFFF"
                    />
                  ) : (
                    <ChevronRight size={16} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.logoutButton, isLoading && styles.disabledButton]}
            onPress={handleLogout}
            disabled={isLoading}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>
              {isLoading ? 'Déconnexion...' : 'Se déconnecter'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.section}>
          <Text style={styles.versionText}>
            CovoitureCameroun v1.0.0
          </Text>
          <Text style={styles.versionSubText}>
            🇨🇲 Fait avec ❤️ au Cameroun
          </Text>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#059669',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 14,
    color: '#CBD5E1',
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E0E7FF',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  documentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  documentLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  validatedStatus: {
    backgroundColor: '#DCFCE7',
  },
  pendingStatus: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  versionSubText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});