import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import color from '../constants/color'
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';


const UserScreen = ({navigation}) => {
  const {user} = useAuth()

  const handleLogout = () =>{
    signOut(auth)
    .then(()=>navigation.replace('Login'))
    .catch((error)=>Alert.alert('Error', 'No se pudo cerrar sesión.'));
  }

  return (
    <LinearGradient color={color.gradienteAccion} style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>{user?.displayName||'Usuario'}</Text>
      <TouchableOpacity onPress={() =>navigation.navigate('Settings')}>
        <Text style={styles.editButton}>Ajustes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>

      </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export const UserScreen1 = ({navigation}) => {
  const {user}=useAuth()
  const handleLogout =()  => {
    signOut(auth).then(() => {
      navigation.replace('Login'); 
    }).catch((error) => {
      Alert.alert('Error', 'Error al cerrar sesión. Inténtalo de nuevo.');
      console.error("Error al cerrar sesión:", error);
    });
  }

  return (
    <View style ={styles.container}>
        <Text>{user?.displayName|| "Usuario"}</Text>
        <Text>Hola UserScreen</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{color: color.primary}}>Ajustes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{color: color.primary}}>Cerrar sesion</Text>
        </TouchableOpacity>
        <FooterComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default UserScreen;