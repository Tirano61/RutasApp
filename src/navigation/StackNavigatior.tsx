



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../screens/MapScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={{
          headerShown: false,
          cardStyle:{
            backgroundColor: 'white',
          }
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}