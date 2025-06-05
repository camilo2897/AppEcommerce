import React, { useEffect, useState } from 'react';
import AppNavigator from './src/Navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import FlashMessage from 'react-native-flash-message';
//import { registerForPushNotificationsAsync } from './src/services/NotificationService';
import * as Notifications from 'expo-notifications';
import { View, ActivityIndicator, Text, Platform } from 'react-native';
import Constants from 'expo-constants';
 
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{ marginTop: 10, fontSize: 16 }}>Inicializando aplicación...</Text>
    </View>
  );
}
 
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Solo intentar configurar notificaciones si no estamos en Expo Go
        if (Constants.executionEnvironment !== 'storeClient') {
          const token = await registerForPushNotificationsAsync();
          if (token) {
            console.log('Token de notificación:', token);
            
            const subscription = Notifications.addNotificationReceivedListener(notification => {
              console.log('Notificación recibida:', notification);
            });
            
            return () => subscription.remove();
          }
        }
      } catch (error) {
        console.log('Error al inicializar notificaciones:', error);
      } finally {
        setIsLoading(false);
      }
    };
 
    initializeApp();
  }, []);
 
  if (isLoading) {
    return <LoadingScreen />;
  }
 
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <FlashMessage position="top" />
      </NavigationContainer>
    </AuthProvider>
  );
}
 
