
import React, { useRef, useEffect, useState } from 'react'
import MapView, {  Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';



export const Maps = () => {

    const [shoePolylieState, setShowPolylieState] = useState(false);
    
    const {hasLocationState, 
        initialPositionState, 
        getCurrentLocation,
        followUserLocation, 
        stopfollowUserLocation,
        routeLinesState,
        userLocationState} = useLocation();

    const mapViewRef =  useRef<MapView>();
    const followingRef =  useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();
        return() => {
            //cancelar el seguimiento
            stopfollowUserLocation();
        }
    
    }, [])
    
    useEffect(() => {
        if ( !followingRef.current ) return;

        const {latitude, longitude } = userLocationState;
        mapViewRef.current?.animateCamera({
            
            center: {latitude: latitude, longitude: longitude}
            
        });
    }, [userLocationState])
    

    const centerPosition = async() => {
        followingRef.current = true;
        const location = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center:{
                latitude: location.latitude,
                longitude: location.longitude,
            }
        })
    }

    if(!hasLocationState){
        <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={ (el) =>mapViewRef.current = el!}
                showsUserLocation
                provider={ PROVIDER_GOOGLE } // remove if not using Google Maps
                style={{flex:1}}
                initialRegion={{
                    latitude: initialPositionState.latitude,
                    longitude: initialPositionState.latitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onTouchStart={() => followingRef.current = false }
            >
                {
                    shoePolylieState && (
                        <Polyline 
                            coordinates={routeLinesState}
                            strokeColor= 'black'
                            strokeWidth={3}
                        />
                    )
                }
                
                {/* <Marker
                    image={ require('../assets/custom-marker.png') }
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Titulo"
                    description="Descripción de la marca"
                /> */}
            </MapView>
            <Fab iconName='compass-outline' 
                onPress={() => centerPosition()}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                }}
            />
            <Fab iconName='brush-outline' 
                onPress={() => setShowPolylieState( !shoePolylieState )}
                style={{
                    position: 'absolute',
                    bottom: 90,
                    right: 20,
                }}
            />

        </>
    )
}
