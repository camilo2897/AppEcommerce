import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";




const SplashScreen = () => {
    const Navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            Navigation.replace('MainTabs')
        }, 3000)
        return () => clearTimeout(timer)
    }, [Navigation])

    return (
        <View style={Styles.container}>
            <Text>Loading...</Text>
            <Image source={require('../assets/Logo.png')} Styles={Styles.logo} />
        </View>
    )

}


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        width: 'auto'
    }
});

export default SplashScreen