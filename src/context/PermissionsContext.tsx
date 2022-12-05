import React, { useState, createContext } from 'react'
import { PERMISSIONS, PermissionStatus, request, } from 'react-native-permissions';

import { Platform } from 'react-native';




export interface PermissionsState {
    locationStatus: PermissionStatus,

}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',
}

interface PermissionContextProps {
    permissions: PermissionsState,
    askLocationPermissions: () => void,
    checkLocationPermissions: () => void,
 }

export const PermissionContext = createContext( {} as PermissionContextProps ); //Definir lo que exporta

export const PermissionProvider = ({ children }: any) => {
    console.log('Entro en provider');
    const [permissionsState, setPermissionsState] = useState(permissionInitState);

    const askLocationPermissions = async() => {
        
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        }else{
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
            
        }
        console.log(permissionStatus);
        setPermissionsState({
            ...permissionsState,
            locationStatus: permissionStatus,  
        })
    }   
    const checkLocationPermissions = () => {
        
    }

    return (
        <PermissionContext.Provider value={{
            permissions: permissionsState,
            askLocationPermissions,
            checkLocationPermissions,
        }}>
            { children }
        </PermissionContext.Provider>
    )


}