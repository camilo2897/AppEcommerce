import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import  Color  from "react-native/Libraries/NewAppScreen";
import color from "../constants/color";




const SplashScreen = () => {
    const Navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            Navigation.replace('Login')
        }, 3000)
        return () => clearTimeout(timer)
    }, [Navigation])

    return (
        <LinearGradient colors={color.gradientePrimario} style={Styles.container}>
            <Text>Loading...</Text>
            <Image source={require('../assets/Logo.png')} Styles={Styles.logo} />
        </LinearGradient>
    )

}


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        maxWidth: 100,
        

    }
});

export default SplashScreen