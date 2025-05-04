import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import colors from '../constants/color';
import { Platform } from 'react-native';
 
export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('No se pudo obtener el permiso para notificaciones.');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token de notificación:', token);
  } else {
    alert('Debe usar un dispositivo físico para recibir notificaciones.');
  }
 
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.error,
    });
  }
 
  return token;
};