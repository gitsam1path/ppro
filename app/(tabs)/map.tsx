import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation, 
  Layers,
  Plus,
  Minus,
  Target,
  Car,
  Users,
  Clock,
  ArrowLeft
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

interface MapMarker {
  id: string;
  type: 'pickup' | 'dropoff' | 'driver' | 'passenger';
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  time?: string;
  price?: number;
  seats?: number;
}

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pickup' | 'dropoff' | 'drivers'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(12);

  const markers: MapMarker[] = [
    {
      id: '1',
      type: 'driver',
      latitude: 3.8480,
      longitude: 11.5021,
      title: 'Jean Koffi',
      description: 'Yaoundé → Douala',
      time: '08:00',
      price: 4000,
      seats: 3
    },
    {
      id: '2',
      type: 'pickup',
      latitude: 3.8667,
      longitude: 11.5167,
      title: 'Point de ramassage',
      description: 'Carrefour Nlongkak',
      time: '08:15'
    },
    {
      id: '3',
      type: 'dropoff',
      latitude: 4.0511,
      longitude: 9.7679,
      title: 'Point de dépose',
      description: 'Gare de Douala',
      time: '12:30'
    },
    {
      id: '4',
      type: 'passenger',
      latitude: 3.8590,
      longitude: 11.5120,
      title: 'Marie Ngozi',
      description: 'Recherche trajet vers Bafoussam',
      time: '14:00'
    }
  ];

  const filteredMarkers = markers.filter(marker => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pickup') return marker.type === 'pickup';
    if (selectedFilter === 'dropoff') return marker.type === 'dropoff';
    if (selectedFilter === 'drivers') return marker.type === 'driver';
    return true;
  });

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'driver': return '#059669';
      case 'pickup': return '#1E3A8A';
      case 'dropoff': return '#EA580C';
      case 'passenger': return '#7C3AED';
      default: return '#6B7280';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'driver': return Car;
      case 'pickup': return MapPin;
      case 'dropoff': return Target;
      case 'passenger': return Users;
      default: return MapPin;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header avec recherche */}
      <LinearGradient
        colors={['#1E3A8A', '#3B82F6']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carte Interactive</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un lieu..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}>
            <Filter size={20} color="#1E3A8A" />
          </TouchableOpacity>
        </View>

        {/* Filtres */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={[styles.filterChip, selectedFilter === 'all' && styles.activeFilter]}
                onPress={() => setSelectedFilter('all')}>
                <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>
                  Tout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedFilter === 'drivers' && styles.activeFilter]}
                onPress={() => setSelectedFilter('drivers')}>
                <Car size={16} color={selectedFilter === 'drivers' ? '#FFFFFF' : '#6B7280'} />
                <Text style={[styles.filterText, selectedFilter === 'drivers' && styles.activeFilterText]}>
                  Conducteurs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedFilter === 'pickup' && styles.activeFilter]}
                onPress={() => setSelectedFilter('pickup')}>
                <MapPin size={16} color={selectedFilter === 'pickup' ? '#FFFFFF' : '#6B7280'} />
                <Text style={[styles.filterText, selectedFilter === 'pickup' && styles.activeFilterText]}>
                  Ramassage
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedFilter === 'dropoff' && styles.activeFilter]}
                onPress={() => setSelectedFilter('dropoff')}>
                <Target size={16} color={selectedFilter === 'dropoff' ? '#FFFFFF' : '#6B7280'} />
                <Text style={[styles.filterText, selectedFilter === 'dropoff' && styles.activeFilterText]}>
                  Dépose
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </LinearGradient>

      {/* Zone de carte simulée */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>🗺️ Carte Interactive</Text>
          <Text style={styles.mapSubText}>Yaoundé, Cameroun</Text>
          
          {/* Marqueurs simulés */}
          <View style={styles.markersContainer}>
            {filteredMarkers.map((marker) => {
              const IconComponent = getMarkerIcon(marker.type);
              return (
                <TouchableOpacity
                  key={marker.id}
                  style={[
                    styles.marker,
                    { backgroundColor: getMarkerColor(marker.type) }
                  ]}>
                  <IconComponent size={16} color="#FFFFFF" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Contrôles de zoom */}
        <View style={styles.zoomControls}>
          <TouchableOpacity 
            style={styles.zoomButton}
            onPress={() => setZoomLevel(Math.min(zoomLevel + 1, 18))}>
            <Plus size={20} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.zoomButton}
            onPress={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}>
            <Minus size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Bouton de géolocalisation */}
        <TouchableOpacity style={styles.locationButton}>
          <Navigation size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Bouton de couches */}
        <TouchableOpacity style={styles.layersButton}>
          <Layers size={20} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Liste des marqueurs */}
      <View style={styles.markersList}>
        <Text style={styles.markersTitle}>Points d'intérêt ({filteredMarkers.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filteredMarkers.map((marker) => {
            const IconComponent = getMarkerIcon(marker.type);
            return (
              <TouchableOpacity key={marker.id} style={styles.markerCard}>
                <View style={[styles.markerIcon, { backgroundColor: getMarkerColor(marker.type) }]}>
                  <IconComponent size={16} color="#FFFFFF" />
                </View>
                <View style={styles.markerInfo}>
                  <Text style={styles.markerTitle}>{marker.title}</Text>
                  <Text style={styles.markerDescription}>{marker.description}</Text>
                  <View style={styles.markerDetails}>
                    {marker.time && (
                      <View style={styles.markerDetail}>
                        <Clock size={12} color="#6B7280" />
                        <Text style={styles.markerDetailText}>{marker.time}</Text>
                      </View>
                    )}
                    {marker.price && (
                      <Text style={styles.markerPrice}>{marker.price} FCFA</Text>
                    )}
                    {marker.seats && (
                      <View style={styles.markerDetail}>
                        <Users size={12} color="#6B7280" />
                        <Text style={styles.markerDetailText}>{marker.seats} places</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 8,
  },
  filtersContainer: {
    marginTop: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
  },
  activeFilter: {
    backgroundColor: '#1E3A8A',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mapPlaceholderText: {
    fontSize: 32,
    marginBottom: 8,
  },
  mapSubText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '500',
  },
  markersContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    top: 20,
    gap: 8,
  },
  zoomButton: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationButton: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    backgroundColor: '#1E3A8A',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  layersButton: {
    position: 'absolute',
    left: 16,
    bottom: 120,
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  markersList: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  markersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  markerCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 200,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  markerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  markerInfo: {
    flex: 1,
  },
  markerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  markerDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  markerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 4,
  },
  markerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  markerDetailText: {
    fontSize: 11,
    color: '#6B7280',
  },
  markerPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
});