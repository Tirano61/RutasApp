

import React, {useEffect, useState} from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
  
    const [initialPosition, setinitialPosition] = useState<Location>({
        longitud: 0,
        latitude: 0,
    });
    const [hasLocation, setHasLocation] = useState(false);

    useEffect(() => {
        getCurrentLocation()
            .then( location => {
                setinitialPosition(location);
                setHasLocation(true); 
            })
        
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                (info) => {
                    resolve({
                        latitude: info.coords.latitude,
                        longitud: info.coords.longitude,
                    });
                },
                (err) => reject({err}),
                {
                    enableHighAccuracy: true,
                }
            );
        })
    }
  
    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
    }
    
  
}
