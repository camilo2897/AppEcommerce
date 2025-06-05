import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import color from '../constants/color';
import { useAuth } from '../context/AuthContext';



const HomeScreen = () => {
  const {user} = useAuth()
  return (
    <LinearGradient colors={color.gradientePrimario} style={Styles.container}>
      <Text style={Styles.Text}>Bienvenido {user?.displayName || 'Usuario'}</Text>
    </LinearGradient>
  )
}

  

const Styles =StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },

});

export default HomeScreen