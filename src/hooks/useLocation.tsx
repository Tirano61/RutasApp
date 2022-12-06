

import React, {useEffect} from 'react'
import Geolocation from '@react-native-community/geolocation';

export const useLocation = () => {
  
    useEffect(() => {
      
        Geolocation.getCurrentPosition(
            info => console.log(info),
            (err) => console.log(err),
            {
            enableHighAccuracy: true,
            });
      
    }, [])
  
    return {

    }
    
  
}
