import 'react-native-gesture-handler';
import React from 'react'
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigation/StackNavigatior';

export const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
      
   
  )
}


export default App;
