
import React, { useRef } from 'react'
import MapView, {  PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';



export const Maps = () => {

    
    const {hasLocation, initialPosition, getCurrentLocation} = useLocation();

    const mapViewRef =  useRef<MapView>();

    const centerPosition = async() => {
        const location = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center:{
                latitude: location.latitude,
                longitude: location.longitud,
            }
        })
    }

    if(!hasLocation){
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
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.latitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
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
        </>
    )
}
