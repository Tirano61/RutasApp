import React, { useState, createContext, useEffect } from 'react'
import { check, PERMISSIONS, PermissionStatus, request, openSettings } from 'react-native-permissions';

import { AppState, Platform } from 'react-native';




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
  
    const [permissionsState, setPermissionsState] = useState(permissionInitState);

    useEffect(() => {
        AppState.addEventListener('change', state =>  {
            if(state !== 'active') return;

            checkLocationPermissions();
            
        })

    }, [])
    

    const askLocationPermissions = async() => {
        
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        }else{
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
            
        }
        
        if(permissionStatus === 'blocked') {
            openSettings();
        }
        setPermissionsState({
            ...permissionsState,
            locationStatus: permissionStatus,  
        })
    }   
    const checkLocationPermissions = async() => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );

        }else{
            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
            
        }
        
        setPermissionsState({
            ...permissionsState,
            locationStatus: permissionStatus,  
        })
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