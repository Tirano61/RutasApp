
import React, {useEffect, useRef, useState} from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
  
    const [initialPositionState, setinitialPositionState] = useState<Location>({
        longitude: 0,
        latitude: 0,
    });
    const [hasLocationState, setHasLocationState] = useState(false);

    const [userLocationState,setUserLocationState] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const [ routeLinesState, setRouteLinesState ] = useState<Location[]>([]);

    const wachId = useRef<number>();

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
    
      return () => {
        isMounted.current = false;
      }
    }, [])
    

    useEffect(() => {
        getCurrentLocation()
            .then( location => {
                if (isMounted.current) {
                    setinitialPositionState(location);
                    setUserLocationState(location);
                    //Se desestructura el array y se agrega la nueva posision al final
                    setRouteLinesState(routes => [...routes, location]);
                    setHasLocationState(true); 
                }
            })
        
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                (info) => {
                    resolve({
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                    });
                },
                (err) => reject({err}),
                {
                    enableHighAccuracy: true,
                }
            );
        })
    }

    const followUserLocation = () => {
        
        wachId.current = Geolocation.watchPosition(
            (info) => {
                const location: Location = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                } 
                
                setUserLocationState( location );
                setRouteLinesState(routes => [...routes, location]);
                   
            },
            (err) => console.log({err}),
            {
                enableHighAccuracy: true,
                distanceFilter: 10,
            }
        );
    }

    const stopfollowUserLocation = () => {
        if( wachId.current ){
            Geolocation.clearWatch(wachId.current!);
        }
    }
  
    return {
        hasLocationState,
        initialPositionState,
        getCurrentLocation,
        followUserLocation,
        userLocationState,
        stopfollowUserLocation,
        routeLinesState,
    }
    
  
}