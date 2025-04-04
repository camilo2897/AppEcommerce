import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext'

const UserScreen = ({navigation}) => {
  
 return (
    <View style>
      <Text>UserScreen</Text>
    </View>
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

export default UserScreen
