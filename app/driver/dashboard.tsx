import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Car, 
  Users, 
  Clock, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Phone,
  MessageCircle,
  Star,
  Calendar,
  DollarSign
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

interface TripRequest {
  id: string;
  tripId: string;
  tripTitle: string;
  passenger: {
    name: string;
    rating: number;
    phone: string;
    avatar: string;
  };
  requestDate: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  seats: number;
  message?: string;
}

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  status: 'active' | 'completed' | 'cancelled';
  requests: TripRequest[];
}

export default function DriverDashboard() {
  const [selectedTab, setSelectedTab] = useState<'requests' | 'trips'>('requests');
  
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: '1',
      from: 'Yaoundé',
      to: 'Douala',
      date: '2025-01-15',
      time: '08:00',
      seats: 4,
      price: 4000,
      status: 'active',
      requests: [
        {
          id: '1',
          tripId: '1',
          tripTitle: 'Yaoundé → Douala',
          passenger: {
            name: 'Marie Ngozi',
            rating: 4.8,
            phone: '+237 677 123 456',
            avatar: 'MN'
          },
          requestDate: '2025-01-14 14:30',
          status: 'pending',
          seats: 2,
          message: 'Bonjour, je souhaiterais réserver 2 places pour ce trajet. Merci !'
        },
        {
          id: '2',
          tripId: '1',
          tripTitle: 'Yaoundé → Douala',
          passenger: {
            name: 'Paul Biya',
            rating: 4.9,
            phone: '+237 690 987 654',
            avatar: 'PB'
          },
          requestDate: '2025-01-14 16:15',
          status: 'accepted',
          seats: 1
        }
      ]
    },
    {
      id: '2',
      from: 'Douala',
      to: 'Bafoussam',
      date: '2025-01-18',
      time: '15:00',
      seats: 4,
      price: 3500,
      status: 'active',
      requests: [
        {
          id: '3',
          tripId: '2',
          tripTitle: 'Douala → Bafoussam',
          passenger: {
            name: 'Alice Mbarga',
            rating: 4.7,
            phone: '+237 655 111 222',
            avatar: 'AM'
          },
          requestDate: '2025-01-14 18:45',
          status: 'pending',
          seats: 1,
          message: 'Disponible pour ce trajet, merci de confirmer.'
        }
      ]
    }
  ]);

  const handleRequestAction = (requestId: string, action: 'accept' | 'reject' | 'cancel') => {
    const actionText = action === 'accept' ? 'accepter' : action === 'reject' ? 'refuser' : 'annuler';
    
    Alert.alert(
      `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} la demande`,
      `Êtes-vous sûr de vouloir ${actionText} cette demande ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: actionText.charAt(0).toUpperCase() + actionText.slice(1),
          onPress: () => {
            setTrips(prevTrips => 
              prevTrips.map(trip => ({
                ...trip,
                requests: trip.requests.map(request => 
                  request.id === requestId 
                    ? { ...request, status: action === 'cancel' ? 'cancelled' : action === 'accept' ? 'accepted' : 'rejected' }
                    : request
                )
              }))
            );
            
            Alert.alert(
              'Action effectuée',
              `La demande a été ${action === 'accept' ? 'acceptée' : action === 'reject' ? 'refusée' : 'annulée'} avec succès.`
            );
          }
        }
      ]
    );
  };

  const handleContactPassenger = (passenger: any) => {
    Alert.alert(
      'Contacter le passager',
      `Comment souhaitez-vous contacter ${passenger.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Appeler', onPress: () => Alert.alert('Appel', `Appel vers ${passenger.phone}`) },
        { text: 'Message', onPress: () => Alert.alert('Message', `Envoi d'un message à ${passenger.name}`) }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'accepted': return '#059669';
      case 'rejected': return '#EF4444';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Refusée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const pendingRequests = trips.flatMap(trip => 
    trip.requests.filter(request => request.status === 'pending')
  );

  const allRequests = trips.flatMap(trip => trip.requests);

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
        <Text style={styles.headerTitle}>Tableau de bord conducteur</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingRequests.length}</Text>
            <Text style={styles.statLabel}>Demandes en attente</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{trips.filter(t => t.status === 'active').length}</Text>
            <Text style={styles.statLabel}>Trajets actifs</Text>
          </View>
        </View>

        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'requests' && styles.activeTab]}
            onPress={() => setSelectedTab('requests')}>
            <Text style={[styles.tabText, selectedTab === 'requests' && styles.activeTabText]}>
              Demandes ({pendingRequests.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'trips' && styles.activeTab]}
            onPress={() => setSelectedTab('trips')}>
            <Text style={[styles.tabText, selectedTab === 'trips' && styles.activeTabText]}>
              Mes trajets
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'requests' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Demandes de réservation ({allRequests.length})
            </Text>
            
            {allRequests.length === 0 ? (
              <View style={styles.emptyState}>
                <Users size={64} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>Aucune demande</Text>
                <Text style={styles.emptyDescription}>
                  Vous n'avez pas encore reçu de demandes de réservation.
                </Text>
              </View>
            ) : (
              allRequests.map((request) => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <View style={styles.passengerInfo}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{request.passenger.avatar}</Text>
                      </View>
                      <View style={styles.passengerDetails}>
                        <Text style={styles.passengerName}>{request.passenger.name}</Text>
                        <View style={styles.ratingContainer}>
                          <Star size={14} color="#FCD34D" />
                          <Text style={styles.rating}>{request.passenger.rating}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(request.status)}20` }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>
                        {getStatusText(request.status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.tripInfo}>
                    <Text style={styles.tripTitle}>{request.tripTitle}</Text>
                    <View style={styles.tripDetails}>
                      <View style={styles.tripDetail}>
                        <Users size={16} color="#6B7280" />
                        <Text style={styles.tripDetailText}>{request.seats} place(s)</Text>
                      </View>
                      <View style={styles.tripDetail}>
                        <Clock size={16} color="#6B7280" />
                        <Text style={styles.tripDetailText}>{request.requestDate}</Text>
                      </View>
                    </View>
                  </View>

                  {request.message && (
                    <View style={styles.messageContainer}>
                      <Text style={styles.messageLabel}>Message :</Text>
                      <Text style={styles.messageText}>{request.message}</Text>
                    </View>
                  )}

                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.contactButton}
                      onPress={() => handleContactPassenger(request.passenger)}>
                      <Phone size={16} color="#1E3A8A" />
                      <Text style={styles.contactButtonText}>Contacter</Text>
                    </TouchableOpacity>

                    {request.status === 'pending' && (
                      <>
                        <TouchableOpacity 
                          style={styles.acceptButton}
                          onPress={() => handleRequestAction(request.id, 'accept')}>
                          <CheckCircle size={16} color="#FFFFFF" />
                          <Text style={styles.acceptButtonText}>Accepter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.rejectButton}
                          onPress={() => handleRequestAction(request.id, 'reject')}>
                          <XCircle size={16} color="#FFFFFF" />
                          <Text style={styles.rejectButtonText}>Refuser</Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {request.status === 'accepted' && (
                      <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={() => handleRequestAction(request.id, 'cancel')}>
                        <AlertTriangle size={16} color="#FFFFFF" />
                        <Text style={styles.cancelButtonText}>Annuler</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))
            )}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mes trajets ({trips.length})</Text>
            
            {trips.map((trip) => (
              <View key={trip.id} style={styles.tripCard}>
                <View style={styles.tripCardHeader}>
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeText}>{trip.from} → {trip.to}</Text>
                    <View style={styles.tripMeta}>
                      <View style={styles.tripDetail}>
                        <Calendar size={14} color="#6B7280" />
                        <Text style={styles.tripDetailText}>{trip.date} à {trip.time}</Text>
                      </View>
                      <View style={styles.tripDetail}>
                        <Users size={14} color="#6B7280" />
                        <Text style={styles.tripDetailText}>{trip.seats} places</Text>
                      </View>
                      <View style={styles.tripDetail}>
                        <DollarSign size={14} color="#6B7280" />
                        <Text style={styles.tripDetailText}>{trip.price} FCFA</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: trip.status === 'active' ? '#DCFCE7' : '#FEE2E2' }]}>
                    <Text style={[styles.statusText, { color: trip.status === 'active' ? '#059669' : '#EF4444' }]}>
                      {trip.status === 'active' ? 'Actif' : 'Terminé'}
                    </Text>
                  </View>
                </View>

                <View style={styles.requestsSummary}>
                  <Text style={styles.requestsSummaryText}>
                    {trip.requests.length} demande(s) • {trip.requests.filter(r => r.status === 'accepted').length} acceptée(s)
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#E0E7FF',
    textAlign: 'center',
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: '#E0E7FF',
    fontWeight: '600',
  },
  activeTabText: {
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tripInfo: {
    marginBottom: 16,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  tripDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tripDetailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  messageContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  messageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 8,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#059669',
    borderRadius: 8,
    gap: 6,
  },
  acceptButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    gap: 6,
  },
  rejectButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    gap: 6,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tripCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  tripMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  requestsSummary: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  requestsSummaryText: {
    fontSize: 14,
    color: '#6B7280',
  },
});