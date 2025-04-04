import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import color from '../constants/color';



const HomeScreen = () => {
  return (
    <LinearGradient colors={color.gradienteSecundario} style={Styles.container}>
      <Text style={Styles.Text}>HomeScreen</Text>
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