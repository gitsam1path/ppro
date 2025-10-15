import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Car, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  User,
  Settings
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { profileType } = useLocalSearchParams<{ profileType: string }>();
  const { login, register, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    referralCode: ''
  });

  const getProfileConfig = () => {
    switch (profileType) {
      case 'client':
        return {
          title: 'Client',
          icon: User,
          color: '#1E3A8A',
          description: 'Recherchez et réservez des trajets'
        };
      case 'driver':
        return {
          title: 'Conducteur',
          icon: Car,
          color: '#059669',
          description: 'Publiez vos trajets et gagnez de l\'argent'
        };
      case 'admin':
        return {
          title: 'Administrateur',
          icon: Settings,
          color: '#EA580C',
          description: 'Gérez la plateforme'
        };
      default:
        return {
          title: 'Utilisateur',
          icon: User,
          color: '#1E3A8A',
          description: 'Accédez à votre compte'
        };
    }
  };

  const config = getProfileConfig();
  const IconComponent = config.icon;

  const handleAuth = () => {
    handleAuthAsync();
  };

  const handleAuthAsync = async () => {
    if (isLogin) {
      if (!formData.email && !formData.phone) {
        Alert.alert('Erreur', 'Veuillez saisir votre email ou téléphone');
        return;
      }
      if (!formData.password) {
        Alert.alert('Erreur', 'Veuillez saisir votre mot de passe');
        return;
      }
      
      const success = await login(formData.email || formData.phone, formData.password, profileType || 'client');
      if (success) {
        // Redirection immédiate après connexion réussie
        router.replace('/(tabs)/');
      } else {
        Alert.alert('Erreur', 'Email/téléphone ou mot de passe incorrect');
      }
    } else {
      // Registration validation
      if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
        return;
      }
      if (formData.password.length < 8) {
        Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
        return;
      }
      
      const success = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        profileType: (profileType as 'client' | 'driver' | 'admin') || 'client',
        referralCode: formData.referralCode
      });
      
      if (success) {
        // Redirection immédiate après inscription réussie
        router.replace('/(tabs)/');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      'Connexion via ' + provider,
      'Cette fonctionnalité sera bientôt disponible !',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={[config.color, config.color + 'CC']}
        style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/')}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.profileIcon}>
            <IconComponent size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.profileTitle}>{config.title}</Text>
          <Text style={styles.profileDescription}>{config.description}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.authCard}>
          <View style={styles.authToggle}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.activeToggle]}
              onPress={() => setIsLogin(true)}>
              <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>
                Connexion
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isLogin && styles.activeToggle]}
              onPress={() => setIsLogin(false)}>
              <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>
                Inscription
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nom complet *</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChangeText={(text) => setFormData({...formData, name: text})}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email *</Text>
              <View style={styles.inputContainer}>
                <Mail size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  placeholder={isLogin ? 
                    (profileType === 'client' ? 'client@test.com' : 
                     profileType === 'driver' ? 'driver@test.com' : 'admin@test.com') 
                    : 'votre@email.com'}
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Téléphone *</Text>
              <View style={styles.inputContainer}>
                <Phone size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  placeholder="+237 6XX XXX XXX"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({...formData, phone: text})}
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Mot de passe * {isLogin && <Text style={styles.hintText}>(min. 6 caractères)</Text>}
              </Text>
              <View style={styles.inputContainer}>
                <Lock size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  placeholder={isLogin ? "123456" : "Votre mot de passe"}
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                  ) : (
                    <Eye size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirmer mot de passe *</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Confirmez votre mot de passe"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            )}

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Code parrain (optionnel)</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Code de votre parrain"
                    value={formData.referralCode}
                    onChangeText={(text) => setFormData({...formData, referralCode: text})}
                    autoCapitalize="characters"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            )}

            {isLogin && (
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={() => router.push('/auth/forgot-password')}>
                <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.authButton, { backgroundColor: config.color }]}
              onPress={handleAuth}
              disabled={isLoading}>
              <Text style={styles.authButtonText}>
                {isLoading 
                  ? (isLogin ? 'Connexion...' : 'Inscription...') 
                  : (isLogin ? 'Se connecter' : 'S\'inscrire')
                }
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialSection}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Google')}>
                <Text style={styles.socialButtonText}>📧 Google</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Facebook')}>
                <Text style={styles.socialButtonText}>📘 Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {profileType === 'driver' && !isLogin && (
            <View style={styles.driverNote}>
              <Text style={styles.driverNoteText}>
                📋 En tant que conducteur, vous devrez fournir vos documents 
                (CNI, permis, carte grise) pour validation avant de publier des trajets.
              </Text>
            </View>
          )}

          {profileType === 'admin' && (
            <View style={styles.adminNote}>
              <Text style={styles.adminNoteText}>
                🔒 Accès administrateur réservé au personnel autorisé uniquement.
              </Text>
            </View>
          )}

          {/* Aide à la connexion */}
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>💡 Comptes de test disponibles :</Text>
            <View style={styles.testAccounts}>
              <Text style={styles.testAccount}>
                👤 <Text style={styles.bold}>Client:</Text> client@test.com / 123456
              </Text>
              <Text style={styles.testAccount}>
                🚗 <Text style={styles.bold}>Conducteur:</Text> driver@test.com / 123456
              </Text>
              <Text style={styles.testAccount}>
                ⚙️ <Text style={styles.bold}>Admin:</Text> admin@test.com / 123456
              </Text>
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
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  profileDescription: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -20,
  },
  authCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 40,
  },
  authToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeToggleText: {
    color: '#1F2937',
  },
  form: {
    marginBottom: 24,
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
  hintText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  authButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialSection: {
    marginBottom: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#6B7280',
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  driverNote: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  driverNoteText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
    lineHeight: 20,
  },
  adminNote: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  adminNoteText: {
    fontSize: 14,
    color: '#991B1B',
    textAlign: 'center',
    fontWeight: '600',
  },
  helpSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369A1',
    marginBottom: 12,
  },
  testAccounts: {
    gap: 8,
  },
  testAccount: {
    fontSize: 13,
    color: '#0369A1',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '600',
  },
});