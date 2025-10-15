import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Car, UserCheck, Settings, Sparkles, Shield, Users } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleProfileSelection = (profileType: string) => {
    router.push({
      pathname: '/auth/login',
      params: { profileType }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background avec dégradé animé */}
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        style={styles.backgroundGradient}>
        
        {/* Éléments décoratifs flottants */}
        <View style={[styles.floatingElement, styles.element1]} />
        <View style={[styles.floatingElement, styles.element2]} />
        <View style={[styles.floatingElement, styles.element3]} />
        
        {/* Header avec logo et titre */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#3B82F6', '#1D4ED8']}
              style={styles.logoGradient}>
              <Car size={40} color="#FFFFFF" />
              <Sparkles size={20} color="#FCD34D" style={styles.sparkle} />
            </LinearGradient>
          </View>
          
          <Text style={styles.title}>CovoitureCameroun</Text>
          <Text style={styles.subtitle}>
            🚗 Voyagez ensemble, économisez malin
          </Text>
          <Text style={styles.tagline}>
            La plateforme de covoiturage #1 au Cameroun
          </Text>
        </View>

        {/* Section de sélection de profil */}
        <View style={styles.profileSelection}>
          <Text style={styles.sectionTitle}>
            ✨ Choisissez votre expérience
          </Text>
          
          <View style={styles.profileCards}>
            {/* Carte Client */}
            <TouchableOpacity 
              style={[styles.profileCard, styles.clientCard]}
              onPress={() => handleProfileSelection('client')}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#3B82F6', '#1D4ED8']}
                style={styles.cardGradient}>
                <BlurView intensity={20} style={styles.cardBlur}>
                  <View style={styles.cardIcon}>
                    <UserCheck size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Client</Text>
                    <Text style={styles.cardDescription}>
                      Trouvez et réservez des trajets en toute simplicité
                    </Text>
                    <View style={styles.cardFeatures}>
                      <Text style={styles.feature}>• Recherche instantanée</Text>
                      <Text style={styles.feature}>• Paiement sécurisé</Text>
                      <Text style={styles.feature}>• Support 24/7</Text>
                    </View>
                  </View>
                  <View style={styles.cardArrow}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </BlurView>
              </LinearGradient>
            </TouchableOpacity>

            {/* Carte Conducteur */}
            <TouchableOpacity 
              style={[styles.profileCard, styles.driverCard]}
              onPress={() => handleProfileSelection('driver')}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#059669', '#047857']}
                style={styles.cardGradient}>
                <BlurView intensity={20} style={styles.cardBlur}>
                  <View style={styles.cardIcon}>
                    <Car size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Conducteur</Text>
                    <Text style={styles.cardDescription}>
                      Partagez vos trajets et générez des revenus
                    </Text>
                    <View style={styles.cardFeatures}>
                      <Text style={styles.feature}>• Revenus garantis</Text>
                      <Text style={styles.feature}>• Gestion simplifiée</Text>
                      <Text style={styles.feature}>• Communauté active</Text>
                    </View>
                  </View>
                  <View style={styles.cardArrow}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </BlurView>
              </LinearGradient>
            </TouchableOpacity>

            {/* Carte Admin */}
            <TouchableOpacity 
              style={[styles.profileCard, styles.adminCard]}
              onPress={() => handleProfileSelection('admin')}
              activeOpacity={0.8}>
              <LinearGradient
                colors={['#7C3AED', '#5B21B6']}
                style={styles.cardGradient}>
                <BlurView intensity={20} style={styles.cardBlur}>
                  <View style={styles.cardIcon}>
                    <Settings size={28} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Administrateur</Text>
                    <Text style={styles.cardDescription}>
                      Gérez la plateforme et supervisez les opérations
                    </Text>
                    <View style={styles.cardFeatures}>
                      <Text style={styles.feature}>• Contrôle total</Text>
                      <Text style={styles.feature}>• Analytics avancés</Text>
                      <Text style={styles.feature}>• Modération</Text>
                    </View>
                  </View>
                  <View style={styles.cardArrow}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </BlurView>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section statistiques */}
        <View style={styles.statsSection}>
          <BlurView intensity={30} style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Utilisateurs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Trajets/jour</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
          </BlurView>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Shield size={16} color="#10B981" />
            <Text style={styles.footerText}>
              🇨🇲 Plateforme sécurisée • Fait au Cameroun avec ❤️
            </Text>
          </View>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    position: 'relative',
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
  },
  element1: {
    width: 200,
    height: 200,
    backgroundColor: '#3B82F6',
    top: 100,
    right: -50,
  },
  element2: {
    width: 150,
    height: 150,
    backgroundColor: '#059669',
    top: 300,
    left: -30,
  },
  element3: {
    width: 100,
    height: 100,
    backgroundColor: '#7C3AED',
    bottom: 200,
    right: 50,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  sparkle: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#94A3B8',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  profileSelection: {
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  profileCards: {
    gap: 20,
  },
  profileCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  cardGradient: {
    flex: 1,
  },
  cardBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardFeatures: {
    gap: 4,
  },
  feature: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardArrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});