import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bell, 
  Car, 
  CreditCard, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Trash2,
  Settings,
  Smartphone,
  Mail,
  MessageSquare,
  ArrowLeft
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking_confirmed',
      title: 'Réservation confirmée',
      message: 'Votre réservation pour Yaoundé → Douala le 15 janvier à 08:00 a été confirmée',
      time: '2h',
      read: false,
      icon: CheckCircle,
      color: '#059669'
    },
    {
      id: 2,
      type: 'payment_received',
      title: 'Paiement reçu',
      message: 'Vous avez reçu 800 FCFA de commission pour votre trajet',
      time: '3h',
      read: false,
      icon: CreditCard,
      color: '#1E3A8A'
    },
    {
      id: 3,
      type: 'new_passenger',
      title: 'Nouvelle demande de réservation',
      message: 'Marie Ngozi souhaite réserver une place pour Douala → Bafoussam',
      time: '5h',
      read: true,
      icon: Users,
      color: '#EA580C'
    },
    {
      id: 4,
      type: 'trip_reminder',
      title: 'Rappel de trajet',
      message: 'N\'oubliez pas votre trajet demain à 08:00 vers Douala',
      time: '1j',
      read: true,
      icon: Clock,
      color: '#6B7280'
    },
    {
      id: 5,
      type: 'referral_bonus',
      title: 'Bonus de parrainage',
      message: 'Félicitations ! Vous avez gagné 150 FCFA grâce au parrainage de Jean Koffi',
      time: '2j',
      read: true,
      icon: Users,
      color: '#059669'
    },
    {
      id: 6,
      type: 'document_pending',
      title: 'Document en attente',
      message: 'Votre carte grise est en cours de validation par notre équipe',
      time: '3j',
      read: true,
      icon: AlertTriangle,
      color: '#F59E0B'
    },
    {
      id: 7,
      type: 'trip_cancelled',
      title: 'Trajet annulé',
      message: 'Le conducteur a annulé le trajet Yaoundé → Bamenda du 10 janvier. Vous serez remboursé.',
      time: '1 semaine',
      read: true,
      icon: Car,
      color: '#EF4444'
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    Alert.alert(
      'Supprimer la notification',
      'Êtes-vous sûr de vouloir supprimer cette notification ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer', 
          style: 'destructive',
          onPress: () => {
            setNotifications(notifications.filter(notif => notif.id !== id));
          }
        }
      ]
    );
  };

  const clearAll = () => {
    Alert.alert(
      'Effacer toutes les notifications',
      'Êtes-vous sûr de vouloir supprimer toutes les notifications ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer tout', 
          style: 'destructive',
          onPress: () => setNotifications([])
        }
      ]
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {notifications.length > 0 && (
          <View style={styles.headerActions}>
            {unreadCount > 0 && (
              <TouchableOpacity 
                style={styles.headerAction} 
                onPress={markAllAsRead}>
                <Text style={styles.headerActionText}>Tout marquer comme lu</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={styles.headerAction} 
              onPress={clearAll}>
              <Text style={styles.headerActionText}>Tout effacer</Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notification Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Préférences de notification</Text>
          <View style={styles.preferencesCard}>
            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Smartphone size={20} color="#1E3A8A" />
                <Text style={styles.preferenceText}>Notifications Push</Text>
              </View>
              <View style={styles.enabledBadge}>
                <Text style={styles.enabledText}>Activé</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <Mail size={20} color="#059669" />
                <Text style={styles.preferenceText}>Notifications Email</Text>
              </View>
              <View style={styles.enabledBadge}>
                <Text style={styles.enabledText}>Activé</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <MessageSquare size={20} color="#EA580C" />
                <Text style={styles.preferenceText}>Notifications SMS</Text>
              </View>
              <View style={styles.disabledBadge}>
                <Text style={styles.disabledText}>Désactivé</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Aucune notification</Text>
            <Text style={styles.emptyDescription}>
              Vous n'avez aucune notification pour le moment.
              Nous vous tiendrons informé de toutes les mises à jour importantes.
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.read && styles.unreadCard
                  ]}
                  onPress={() => markAsRead(notification.id)}>
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationLeft}>
                      <View style={[styles.iconContainer, { backgroundColor: `${notification.color}20` }]}>
                        <IconComponent size={20} color={notification.color} />
                      </View>
                      <View style={styles.notificationText}>
                        <Text style={[
                          styles.notificationTitle,
                          !notification.read && styles.unreadTitle
                        ]}>
                          {notification.title}
                        </Text>
                        <Text style={styles.notificationMessage}>
                          {notification.message}
                        </Text>
                        <Text style={styles.notificationTime}>
                          Il y a {notification.time}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => deleteNotification(notification.id)}>
                      <Trash2 size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                  {!notification.read && <View style={styles.unreadIndicator} />}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Notification Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>Paramètres de notification</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Car size={20} color="#1E3A8A" />
                <Text style={styles.settingText}>Notifications de trajet</Text>
              </View>
              <View style={styles.enabledBadge}>
                <Text style={styles.enabledText}>Activé</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <CreditCard size={20} color="#059669" />
                <Text style={styles.settingText}>Notifications de paiement</Text>
              </View>
              <View style={styles.enabledBadge}>
                <Text style={styles.enabledText}>Activé</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Users size={20} color="#EA580C" />
                <Text style={styles.settingText}>Notifications de parrainage</Text>
              </View>
              <View style={styles.enabledBadge}>
                <Text style={styles.enabledText}>Activé</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <AlertTriangle size={20} color="#F59E0B" />
                <Text style={styles.settingText}>Alertes de sécurité</Text>
              </View>
              <View style={styles.enabledBadge}>
                <Text style={styles.enabledText}>Activé</Text>
              </View>
            </TouchableOpacity>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerAction: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  headerActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  notificationsList: {
    marginBottom: 30,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#1E3A8A',
    backgroundColor: '#F8FAFF',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  notificationLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 4,
    marginTop: 4,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E3A8A',
  },
  settingsSection: {
    marginBottom: 30,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#1F2937',
  },
  enabledBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  enabledText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  preferencesSection: {
    marginBottom: 30,
  },
  preferencesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  preferenceText: {
    fontSize: 16,
    color: '#1F2937',
  },
  disabledBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  disabledText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
});