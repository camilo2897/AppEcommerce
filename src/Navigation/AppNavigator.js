import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import color from "../constants/color";

import SplashScreen from "../Screens/SplashScreen";
import HomeScreen from "../Screens/HomeScreen";
import UserScreen from "../Screens/UserScreen";
import contentScreen from "../Screens/contentScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import RegisterScreen from "../Screens/auth/RegisterScreen";



/*import React from 'react'*/
const Tab = createBottomTabNavigator();
const Stack=createStackNavigator();

const TabNavigator = () => {
   return (
        <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
          tabBarIcon: ({color,size})=>{
            let iconName
            if (route.name === "Home") {
              iconName = "home-outline"
            } else if (route.name === "User") {
              iconName = "person-outline"
            }
            return <Ionicons name={iconName}size={size} color={color}/>
          },
           tabBarActiveTintColor: '#097952',
           tabBarInactiveTintColor: 'blue',
           tabBarStyle:{backgroundColor: '#003466'}
        })}>

          <Tab.Screen name="Home" component={HomeScreen} options={{}}/>
          <Tab.Screen name="User" component={UserScreen} options={{}}/>
          <Tab.Screen name="content" component={contentScreen} options={{}}/>
          <Tab.Screen name="Login"  component={LoginScreen} options={{}} />
          <Tab.Screen name="Register" component={RegisterScreen} options={{}} />
        </Tab.Navigator>)
   
}

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{headerShown:false}}/>
        


    </Stack.Navigator>
    
  )
}

export default AppNavigator
