import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign,
  Car,
  Plus,
  Minus,
  Settings,
  AlertCircle
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function PublishTripScreen() {
  const [tripData, setTripData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: 4,
    price: '',
    description: '',
    carModel: '',
    amenities: {
      airConditioning: false,
      wifi: false,
      music: false,
      charger: false,
      luggage: false
    },
    pickupPoints: [''],
    dropoffPoints: ['']
  });

  const handlePublish = () => {
    if (!tripData.from || !tripData.to || !tripData.date || !tripData.time || !tripData.price) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    Alert.alert(
      'Trajet publié !',
      'Votre trajet a été publié avec succès. Les passagers peuvent maintenant le voir et faire des demandes de réservation.',
      [
        {
          text: 'Voir mes trajets',
          onPress: () => router.push('/driver/dashboard')
        },
        {
          text: 'Publier un autre',
          onPress: () => {
            setTripData({
              from: '',
              to: '',
              date: '',
              time: '',
              seats: 4,
              price: '',
              description: '',
              carModel: '',
              amenities: {
                airConditioning: false,
                wifi: false,
                music: false,
                charger: false,
                luggage: false
              },
              pickupPoints: [''],
              dropoffPoints: ['']
            });
          }
        }
      ]
    );
  };

  const addPickupPoint = () => {
    setTripData({
      ...tripData,
      pickupPoints: [...tripData.pickupPoints, '']
    });
  };

  const removePickupPoint = (index: number) => {
    const newPoints = tripData.pickupPoints.filter((_, i) => i !== index);
    setTripData({
      ...tripData,
      pickupPoints: newPoints.length > 0 ? newPoints : ['']
    });
  };

  const updatePickupPoint = (index: number, value: string) => {
    const newPoints = [...tripData.pickupPoints];
    newPoints[index] = value;
    setTripData({
      ...tripData,
      pickupPoints: newPoints
    });
  };

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
        <Text style={styles.headerTitle}>Publier un trajet</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          {/* Itinéraire */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Itinéraire</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ville de départ *</Text>
              <View style={styles.inputContainer}>
                <MapPin size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Yaoundé"
                  value={tripData.from}
                  onChangeText={(text) => setTripData({...tripData, from: text})}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ville d'arrivée *</Text>
              <View style={styles.inputContainer}>
                <MapPin size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Douala"
                  value={tripData.to}
                  onChangeText={(text) => setTripData({...tripData, to: text})}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Date et heure */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date et heure</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Date *</Text>
                <View style={styles.inputContainer}>
                  <Calendar size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="JJ/MM/AAAA"
                    value={tripData.date}
                    onChangeText={(text) => setTripData({...tripData, date: text})}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Heure *</Text>
                <View style={styles.inputContainer}>
                  <Clock size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="HH:MM"
                    value={tripData.time}
                    onChangeText={(text) => setTripData({...tripData, time: text})}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Places et prix */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Places et prix</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Nombre de places</Text>
                <View style={styles.seatsContainer}>
                  <TouchableOpacity 
                    style={styles.seatsButton}
                    onPress={() => setTripData({...tripData, seats: Math.max(1, tripData.seats - 1)})}>
                    <Minus size={16} color="#059669" />
                  </TouchableOpacity>
                  <Text style={styles.seatsText}>{tripData.seats}</Text>
                  <TouchableOpacity 
                    style={styles.seatsButton}
                    onPress={() => setTripData({...tripData, seats: Math.min(8, tripData.seats + 1)})}>
                    <Plus size={16} color="#059669" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Prix par place *</Text>
                <View style={styles.inputContainer}>
                  <DollarSign size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="4000"
                    value={tripData.price}
                    onChangeText={(text) => setTripData({...tripData, price: text})}
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                  <Text style={styles.currency}>FCFA</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Véhicule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Véhicule</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Modèle du véhicule</Text>
              <View style={styles.inputContainer}>
                <Car size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Toyota Corolla"
                  value={tripData.carModel}
                  onChangeText={(text) => setTripData({...tripData, carModel: text})}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Équipements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Équipements disponibles</Text>
            
            <View style={styles.amenitiesGrid}>
              {Object.entries(tripData.amenities).map(([key, value]) => (
                <View key={key} style={styles.amenityItem}>
                  <Text style={styles.amenityLabel}>
                    {key === 'airConditioning' ? 'Climatisation' :
                     key === 'wifi' ? 'WiFi' :
                     key === 'music' ? 'Musique' :
                     key === 'charger' ? 'Chargeur' :
                     key === 'luggage' ? 'Bagages' : key}
                  </Text>
                  <Switch
                    value={value}
                    onValueChange={(newValue) => setTripData({
                      ...tripData,
                      amenities: { ...tripData.amenities, [key]: newValue }
                    })}
                    trackColor={{ false: '#E5E7EB', true: '#059669' }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Points de ramassage */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Points de ramassage</Text>
            
            {tripData.pickupPoints.map((point, index) => (
              <View key={index} style={styles.pointContainer}>
                <View style={styles.inputContainer}>
                  <MapPin size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ex: Carrefour Nlongkak"
                    value={point}
                    onChangeText={(text) => updatePickupPoint(index, text)}
                    placeholderTextColor="#9CA3AF"
                  />
                  {tripData.pickupPoints.length > 1 && (
                    <TouchableOpacity onPress={() => removePickupPoint(index)}>
                      <Minus size={20} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
            
            <TouchableOpacity style={styles.addButton} onPress={addPickupPoint}>
              <Plus size={16} color="#059669" />
              <Text style={styles.addButtonText}>Ajouter un point</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description (optionnel)</Text>
            
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.textArea}
                placeholder="Ajoutez des informations supplémentaires sur votre trajet..."
                value={tripData.description}
                onChangeText={(text) => setTripData({...tripData, description: text})}
                multiline
                numberOfLines={4}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Bouton publier */}
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishButtonText}>Publier le trajet</Text>
          </TouchableOpacity>

          {/* Note importante */}
          <View style={styles.noteContainer}>
            <AlertCircle size={16} color="#F59E0B" />
            <Text style={styles.noteText}>
              Une fois publié, votre trajet sera visible par tous les utilisateurs. 
              Vous recevrez des notifications pour chaque demande de réservation.
            </Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#1F2937',
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    gap: 20,
  },
  seatsButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#059669',
  },
  seatsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    minWidth: 30,
    textAlign: 'center',
  },
  currency: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  amenitiesGrid: {
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  amenityLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  pointContainer: {
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#059669',
    borderRadius: 8,
    borderStyle: 'dashed',
    gap: 8,
  },
  addButtonText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
  },
  publishButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    gap: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    color: '#92400E',
    lineHeight: 16,
  },
});