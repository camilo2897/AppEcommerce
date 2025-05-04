import React, { useEffect } from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import FlashMessage from 'react-native-flash-message';
import { registerForPushNotificationsAsync } from './src/services/NotificactionService';
import * as Notifications from 'expo-notifications';
 
export default function App() {
  useEffect(() => {
    // Registrar notificaciones al iniciar la aplicación
    const setupNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      console.log('Token de notificación:', token);
 
      // Evento para manejo notificaciones recibidas
      const subscription = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notificación recibida:', notification);
      });
 
      return () => subscription.remove();
    };
 
    setupNotifications();
  }, []);
 
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <FlashMessage position="top" />
      </NavigationContainer>
    </AuthProvider>
  );
}
 
