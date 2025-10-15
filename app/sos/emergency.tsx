import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Users, 
  Shield,
  AlertTriangle,
  Clock,
  Smartphone
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function EmergencyScreen() {
  const [sosActivated, setSosActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState('Yaoundé, Cameroun');

  const emergencyContacts = [
    { name: 'Police', number: '117', icon: '🚔' },
    { name: 'Pompiers', number: '118', icon: '🚒' },
    { name: 'SAMU', number: '119', icon: '🚑' },
    { name: 'Support CovoitureCameroun', number: '+237 690 000 000', icon: '🆘' }
  ];

  const personalContacts = [
    { name: 'Contact d\'urgence 1', number: '+237 677 123 456', relation: 'Famille' },
    { name: 'Contact d\'urgence 2', number: '+237 690 987 654', relation: 'Ami proche' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const activateSOS = () => {
    Alert.alert(
      'Activer le SOS',
      'Cette action va :\n• Partager votre localisation\n• Alerter vos contacts d\'urgence\n• Notifier notre équipe de sécurité\n\nÊtes-vous sûr ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Activer SOS',
          style: 'destructive',
          onPress: () => {
            setSosActivated(true);
            setCountdown(300); // 5 minutes
            
            // Simulation des actions SOS
            Alert.alert(
              'SOS Activé !',
              '✅ Localisation partagée\n✅ Contacts d\'urgence alertés\n✅ Équipe de sécurité notifiée\n\nVous recevrez un appel de vérification dans quelques minutes.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const deactivateSOS = () => {
    Alert.alert(
      'Désactiver le SOS',
      'Êtes-vous en sécurité maintenant ?',
      [
        { text: 'Non, garder actif', style: 'cancel' },
        {
          text: 'Oui, désactiver',
          onPress: () => {
            setSosActivated(false);
            setCountdown(0);
            Alert.alert('SOS désactivé', 'Nous sommes contents que vous soyez en sécurité !');
          }
        }
      ]
    );
  };

  const callEmergency = (number: string, name: string) => {
    Alert.alert(
      `Appeler ${name}`,
      `Voulez-vous appeler le ${number} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Appeler',
          onPress: () => {
            Linking.openURL(`tel:${number}`).catch(() => {
              Alert.alert('Erreur', 'Impossible de passer l\'appel');
            });
          }
        }
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={sosActivated ? ['#EF4444', '#DC2626'] : ['#1E3A8A', '#3B82F6']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Shield size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>
            {sosActivated ? 'SOS ACTIVÉ' : 'Urgence & Sécurité'}
          </Text>
          {sosActivated && (
            <Text style={styles.headerSubtitle}>
              Temps restant: {formatTime(countdown)}
            </Text>
          )}
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Bouton SOS principal */}
        <View style={styles.sosSection}>
          {sosActivated ? (
            <View style={styles.sosActiveContainer}>
              <TouchableOpacity style={styles.sosActiveButton} onPress={deactivateSOS}>
                <AlertTriangle size={48} color="#FFFFFF" />
                <Text style={styles.sosActiveText}>SOS ACTIVÉ</Text>
                <Text style={styles.sosActiveSubtext}>Appuyez pour désactiver</Text>
              </TouchableOpacity>
              
              <View style={styles.sosStatus}>
                <View style={styles.statusItem}>
                  <MapPin size={20} color="#059669" />
                  <Text style={styles.statusText}>Localisation partagée</Text>
                </View>
                <View style={styles.statusItem}>
                  <Users size={20} color="#059669" />
                  <Text style={styles.statusText}>Contacts alertés</Text>
                </View>
                <View style={styles.statusItem}>
                  <Shield size={20} color="#059669" />
                  <Text style={styles.statusText}>Équipe notifiée</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.sosInactiveContainer}>
              <TouchableOpacity style={styles.sosButton} onPress={activateSOS}>
                <Shield size={64} color="#FFFFFF" />
                <Text style={styles.sosButtonText}>ACTIVER SOS</Text>
              </TouchableOpacity>
              
              <Text style={styles.sosDescription}>
                En cas d'urgence, appuyez sur ce bouton pour alerter automatiquement 
                vos contacts et notre équipe de sécurité.
              </Text>
            </View>
          )}
        </View>

        {/* Localisation actuelle */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Votre localisation</Text>
          <View style={styles.locationCard}>
            <MapPin size={20} color="#1E3A8A" />
            <Text style={styles.locationText}>{location}</Text>
            <TouchableOpacity style={styles.shareLocationButton}>
              <Text style={styles.shareLocationText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Numéros d'urgence */}
        <View style={styles.emergencySection}>
          <Text style={styles.sectionTitle}>Numéros d'urgence</Text>
          <View style={styles.emergencyGrid}>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.emergencyCard}
                onPress={() => callEmergency(contact.number, contact.name)}>
                <Text style={styles.emergencyIcon}>{contact.icon}</Text>
                <Text style={styles.emergencyName}>{contact.name}</Text>
                <Text style={styles.emergencyNumber}>{contact.number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contacts personnels */}
        <View style={styles.contactsSection}>
          <Text style={styles.sectionTitle}>Contacts d'urgence personnels</Text>
          {personalContacts.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={() => callEmergency(contact.number, contact.name)}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactRelation}>{contact.relation}</Text>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity style={styles.callButton}>
                  <Phone size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton}>
                  <Smartphone size={16} color="#1E3A8A" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.addContactButton}>
            <Text style={styles.addContactText}>+ Ajouter un contact d'urgence</Text>
          </TouchableOpacity>
        </View>

        {/* Conseils de sécurité */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Conseils de sécurité</Text>
          <View style={styles.tipsCard}>
            <Text style={styles.tipItem}>• Partagez toujours votre trajet avec un proche</Text>
            <Text style={styles.tipItem}>• Vérifiez l'identité du conducteur avant de monter</Text>
            <Text style={styles.tipItem}>• Gardez votre téléphone chargé pendant le voyage</Text>
            <Text style={styles.tipItem}>• Faites confiance à votre instinct</Text>
            <Text style={styles.tipItem}>• En cas de doute, n'hésitez pas à utiliser le SOS</Text>
          </View>
        </View>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 4,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 50,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sosSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sosInactiveContainer: {
    alignItems: 'center',
  },
  sosButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sosDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  sosActiveContainer: {
    alignItems: 'center',
    width: '100%',
  },
  sosActiveButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  sosActiveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sosActiveSubtext: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  sosStatus: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  statusText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  locationSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  shareLocationButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  shareLocationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emergencySection: {
    marginBottom: 30,
  },
  emergencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  emergencyCard: {
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
  emergencyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emergencyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  emergencyNumber: {
    fontSize: 16,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  contactsSection: {
    marginBottom: 30,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  contactRelation: {
    fontSize: 14,
    color: '#6B7280',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    backgroundColor: '#059669',
    padding: 8,
    borderRadius: 8,
  },
  messageButton: {
    backgroundColor: '#E0E7FF',
    padding: 8,
    borderRadius: 8,
  },
  addContactButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  addContactText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  tipsSection: {
    marginBottom: 30,
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
});