import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native';

const contentScreen = () => {
  return (
    <View>
      <Text>Comprar</Text>
      <Text>Vender</Text>
         <Image source={require('../assets/bannermovil.jpg')} Styles={Styles.Image} />
      
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

export default contentScreen