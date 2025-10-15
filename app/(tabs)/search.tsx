import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Filter,
  ArrowUpDown,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

export default function SearchScreen() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('Maintenant');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      from: 'Yaoundé - Gare Voyageur',
      to: 'Douala - Akwa',
      date: '2025-01-15',
      time: '08:00',
      duration: '4h 30min',
      seats: 3,
      price: 4000,
      driver: {
        name: 'Jean Koffi',
        rating: 4.8,
        trips: 145,
        verified: true
      },
      car: 'Toyota Corolla - Gris',
      amenities: ['Clim', 'Wifi', 'Musique']
    },
    {
      id: 2,
      from: 'Yaoundé - Nsam',
      to: 'Douala - Bonabéri',
      date: '2025-01-15',
      time: '10:30',
      duration: '4h 15min',
      seats: 2,
      price: 3800,
      driver: {
        name: 'Marie Ngozi',
        rating: 4.9,
        trips: 89,
        verified: true
      },
      car: 'Honda Civic - Blanc',
      amenities: ['Clim', 'Chargeur']
    }
  ]);

  const popularRoutes = [
    { from: 'Yaoundé', to: 'Douala', price: '4000 FCFA' },
    { from: 'Douala', to: 'Bafoussam', price: '3500 FCFA' },
    { from: 'Yaoundé', to: 'Bamenda', price: '5000 FCFA' },
    { from: 'Douala', to: 'Buea', price: '2500 FCFA' }
  ];

  const timeSlots = [
    'Maintenant', '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00'
  ];

  const swapLocations = () => {
    const temp = departure;
    setDeparture(destination);
    setDestination(temp);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Demain";
    } else {
      return date.toLocaleDateString('fr-FR', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const handleSearch = () => {
    if (!departure || !destination) {
      Alert.alert('Erreur', 'Veuillez remplir les champs de départ et destination');
      return;
    }
    
    // Simulation de recherche
    Alert.alert(
      'Recherche en cours',
      `Recherche de trajets de ${departure} vers ${destination} le ${formatDate(selectedDate)} à ${selectedTime}`,
      [{ text: 'OK' }]
    );
  };

  const handleTripDetails = (trip: any) => {
    Alert.alert(
      'Détails du trajet',
      `Trajet avec ${trip.driver.name}\nDe ${trip.from} vers ${trip.to}\nPrix: ${trip.price} FCFA`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Réserver', onPress: () => handleBooking(trip) }
      ]
    );
  };

  const handleBooking = (trip: any) => {
    Alert.alert(
      'Réservation confirmée',
      `Votre réservation pour le trajet avec ${trip.driver.name} a été confirmée !`,
      [{ text: 'OK' }]
    );
  };

  const CalendarModal = () => (
    <Modal
      visible={showCalendar}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCalendar(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.calendarModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choisir une date</Text>
            <TouchableOpacity onPress={() => setShowCalendar(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.calendarContainer}>
            <View style={styles.calendarGrid}>
              {generateCalendarDays().map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    selectedDate.toDateString() === date.toDateString() && styles.selectedDay
                  ]}
                  onPress={() => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                  }}>
                  <Text style={[
                    styles.calendarDayText,
                    selectedDate.toDateString() === date.toDateString() && styles.selectedDayText
                  ]}>
                    {date.getDate()}
                  </Text>
                  <Text style={[
                    styles.calendarDayName,
                    selectedDate.toDateString() === date.toDateString() && styles.selectedDayText
                  ]}>
                    {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const TimeModal = () => (
    <Modal
      visible={showTimeSelector}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowTimeSelector(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.timeModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choisir l'heure</Text>
            <TouchableOpacity onPress={() => setShowTimeSelector(false)}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.timeContainer}>
            <View style={styles.timeGrid}>
              {timeSlots.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTime
                  ]}
                  onPress={() => {
                    setSelectedTime(time);
                    setShowTimeSelector(false);
                  }}>
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

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
        <Text style={styles.headerTitle}>Rechercher un trajet</Text>
        
        <View style={styles.searchForm}>
          <View style={styles.locationInputs}>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                placeholder="D'où partez-vous ?"
                value={departure}
                onChangeText={setDeparture}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            
            <TouchableOpacity onPress={swapLocations} style={styles.swapButton}>
              <ArrowUpDown size={16} color="#1E3A8A" />
            </TouchableOpacity>
            
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                placeholder="Où allez-vous ?"
                value={destination}
                onChangeText={setDestination}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
          
          <View style={styles.dateTimeRow}>
            <TouchableOpacity 
              style={[styles.inputContainer, styles.dateInput]}
              onPress={() => setShowCalendar(true)}>
              <Calendar size={20} color="#6B7280" />
              <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.inputContainer, styles.timeInput]}
              onPress={() => setShowTimeSelector(true)}>
              <Clock size={20} color="#6B7280" />
              <Text style={styles.dateText}>{selectedTime}</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Search size={20} color="#FFFFFF" />
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchResults.length === 0 ? (
          <View style={styles.popularSection}>
            <Text style={styles.sectionTitle}>Trajets populaires</Text>
            <View style={styles.popularRoutes}>
              {popularRoutes.map((route, index) => (
                <TouchableOpacity key={index} style={styles.popularRoute}>
                  <View style={styles.routeInfo}>
                    <Text style={styles.routeText}>{route.from} → {route.to}</Text>
                    <Text style={styles.routePrice}>{route.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>
                {searchResults.length} trajets trouvés
              </Text>
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={16} color="#1E3A8A" />
                <Text style={styles.filterText}>Filtres</Text>
              </TouchableOpacity>
            </View>
            
            {searchResults.map((trip) => (
              <TouchableOpacity 
                key={trip.id} 
                style={styles.tripCard}
                onPress={() => handleTripDetails(trip)}>
                <View style={styles.tripHeader}>
                  <View style={styles.routeDetails}>
                    <Text style={styles.routeFrom}>{trip.from}</Text>
                    <Text style={styles.routeTo}>{trip.to}</Text>
                  </View>
                  <Text style={styles.tripPrice}>{trip.price} FCFA</Text>
                </View>
                
                <View style={styles.tripInfo}>
                  <View style={styles.timeInfo}>
                    <Clock size={16} color="#6B7280" />
                    <Text style={styles.infoText}>{trip.time} - {trip.duration}</Text>
                  </View>
                  <View style={styles.seatsInfo}>
                    <Users size={16} color="#6B7280" />
                    <Text style={styles.infoText}>{trip.seats} places</Text>
                  </View>
                </View>
                
                <View style={styles.driverInfo}>
                  <View style={styles.driverDetails}>
                    <Text style={styles.driverName}>{trip.driver.name}</Text>
                    <View style={styles.driverRating}>
                      <Star size={14} color="#FCD34D" />
                      <Text style={styles.ratingText}>{trip.driver.rating}</Text>
                      <Text style={styles.tripsText}>({trip.driver.trips} trajets)</Text>
                      {trip.driver.verified && (
                        <View style={styles.verifiedBadge}>
                          <Text style={styles.verifiedText}>✓</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.reserveButton}
                    onPress={() => handleBooking(trip)}>
                    <Text style={styles.reserveButtonText}>Réserver</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.carInfo}>
                  <Text style={styles.carText}>{trip.car}</Text>
                  <View style={styles.amenities}>
                    {trip.amenities.map((amenity, index) => (
                      <View key={index} style={styles.amenityTag}>
                        <Text style={styles.amenityText}>{amenity}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <CalendarModal />
      <TimeModal />
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
  searchForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  locationInputs: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  swapButton: {
    alignSelf: 'center',
    backgroundColor: '#E0E7FF',
    padding: 8,
    borderRadius: 20,
    marginVertical: -6,
    zIndex: 1,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  dateInput: {
    flex: 2,
  },
  timeInput: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#1E3A8A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  popularSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  popularRoutes: {
    gap: 12,
  },
  popularRoute: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  routePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  resultsSection: {
    marginBottom: 30,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  tripCard: {
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
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeDetails: {
    flex: 1,
  },
  routeFrom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  routeTo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  tripPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  seatsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  driverInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  tripsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  verifiedBadge: {
    backgroundColor: '#059669',
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reserveButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  carInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  amenities: {
    flexDirection: 'row',
    gap: 6,
  },
  amenityTag: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  calendarModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '70%',
  },
  timeModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  calendarContainer: {
    paddingHorizontal: 20,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 20,
  },
  calendarDay: {
    width: '13%',
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectedDay: {
    backgroundColor: '#1E3A8A',
  },
  calendarDayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  calendarDayName: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  timeContainer: {
    paddingHorizontal: 20,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingVertical: 20,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#1E3A8A',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
});