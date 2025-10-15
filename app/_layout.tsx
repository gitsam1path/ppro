import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Configure viewport for mobile simulation
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=375, initial-scale=1, maximum-scale=1, user-scalable=no');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=375, initial-scale=1, maximum-scale=1, user-scalable=no';
        document.head.appendChild(meta);
      }
      
      // Add mobile simulation styles
      const style = document.createElement('style');
      style.textContent = `
        body {
          margin: 0;
          padding: 20px;
          background: #f0f0f0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        #root {
          width: 375px;
          height: 812px;
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          position: relative;
        }
        #root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 134px;
          height: 5px;
          background: #000;
          border-radius: 0 0 5px 5px;
          z-index: 1000;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/forgot-password" />
        <Stack.Screen name="profile/edit" />
        <Stack.Screen name="profile/change-password" />
        <Stack.Screen name="admin/dashboard" />
        <Stack.Screen name="admin/reports" />
        <Stack.Screen name="admin/documents" />
        <Stack.Screen name="driver/publish-trip" />
        <Stack.Screen name="driver/dashboard" />
        <Stack.Screen name="sos/emergency" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={Platform.OS === 'web' ? 'dark' : 'auto'} />
    </AuthProvider>
  );
}
