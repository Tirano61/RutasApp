



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../screens/MapScreen';
import { PermissionContext } from '../context/PermissionsContext';
import { useContext } from 'react';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {

  const { permissions } = useContext(PermissionContext); 

  if(permissions.locationStatus === 'unavailable'){
    return <LoadingScreen />
  }

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
        {
          (permissions.locationStatus === 'granted')
          ? <Stack.Screen name="MapScreen" component={MapScreen} />
          : <Stack.Screen name="HomeScreen" component={HomeScreen} />
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}