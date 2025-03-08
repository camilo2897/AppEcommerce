import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SplashScreen from "../Screens/SplashScreen";
import HomeScreen from "../Screens/HomeScreen";
import UserScreen from "../Screens/UserScreen";

/*import React from 'react'*/
const Tab = createBottomTabNavigator();
const Stack=createStackNavigator();

const TabNavigator = () => {
   return (
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeScreen} options={{}}/>
          <Tab.Screen name="User" component={UserScreen} options={{}}/>
       </Tab.Navigator>)
   
}

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{headerShown:false}}/>

    </Stack.Navigator>
    
  )
}

export default AppNavigator
