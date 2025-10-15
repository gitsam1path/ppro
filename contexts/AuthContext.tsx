import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileType: 'client' | 'driver' | 'admin';
  avatar?: string;
  verified: boolean;
  memberSince: string;
  rating: number;
  totalTrips: number;
  preferences: {
    notifications: boolean;
    location: boolean;
    language: string;
    currency: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, profileType: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  profileType: 'client' | 'driver' | 'admin';
  referralCode?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Données mock pour les différents types d'utilisateurs
const mockUsers = {
  client: {
    id: '1',
    name: 'David Mbarga',
    email: 'david.client@covoiturecameroun.com',
    phone: '+237 690 123 456',
    profileType: 'client' as const,
    verified: true,
    memberSince: 'Décembre 2023',
    rating: 4.8,
    totalTrips: 25,
    preferences: {
      notifications: true,
      location: true,
      language: 'fr',
      currency: 'FCFA'
    }
  },
  driver: {
    id: '2',
    name: 'Jean Koffi',
    email: 'jean.driver@covoiturecameroun.com',
    phone: '+237 677 987 654',
    profileType: 'driver' as const,
    verified: true,
    memberSince: 'Octobre 2023',
    rating: 4.9,
    totalTrips: 145,
    preferences: {
      notifications: true,
      location: true,
      language: 'fr',
      currency: 'FCFA'
    }
  },
  admin: {
    id: '3',
    name: 'Marie Admin',
    email: 'marie.admin@covoiturecameroun.com',
    phone: '+237 655 111 222',
    profileType: 'admin' as const,
    verified: true,
    memberSince: 'Janvier 2023',
    rating: 5.0,
    totalTrips: 0,
    preferences: {
      notifications: true,
      location: true,
      language: 'fr',
      currency: 'FCFA'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API calls with realistic delays
  const simulateApiCall = (delay: number = 1000) => 
    new Promise(resolve => setTimeout(resolve, delay));

  const login = async (email: string, password: string, profileType: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await simulateApiCall(500);
      
      // Validation avec données mock spécifiques
      if (password.length >= 6) {
        let selectedUser = null;
        
        // Connexion avec emails spécifiques
        if (email === 'client@test.com' || email.includes('client')) {
          selectedUser = mockUsers.client;
        } else if (email === 'driver@test.com' || email.includes('driver')) {
          selectedUser = mockUsers.driver;
        } else if (email === 'admin@test.com' || email.includes('admin')) {
          selectedUser = mockUsers.admin;
        } else {
          // Utiliser le profileType sélectionné si email générique
          selectedUser = mockUsers[profileType as keyof typeof mockUsers] || mockUsers.client;
        }
        
        if (selectedUser) {
          setUser({ ...selectedUser, email: email });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      await simulateApiCall(500);
      
      // Simulate registration
      const mockUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        profileType: userData.profileType,
        verified: false,
        memberSince: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
        rating: 0,
        totalTrips: 0,
        preferences: {
          notifications: true,
          location: true,
          language: 'fr',
          currency: 'FCFA'
        }
      };
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await simulateApiCall(500);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await simulateApiCall(1000);
      // Simulate sending reset email
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await simulateApiCall(1000);
      // Simulate password reset
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      await simulateApiCall(1000);
      if (user) {
        setUser({ ...user, ...userData });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await simulateApiCall(1000);
      // Simulate password change validation
      return currentPassword.length >= 6 && newPassword.length >= 8;
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      await simulateApiCall(1500);
      setUser(null);
      return true;
    } catch (error) {
      console.error('Delete account error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (preferences: Partial<User['preferences']>): Promise<boolean> => {
    setIsLoading(true);
    try {
      await simulateApiCall(500);
      if (user) {
        setUser({
          ...user,
          preferences: { ...user.preferences, ...preferences }
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update preferences error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
    deleteAccount,
    updatePreferences
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};