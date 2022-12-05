import 'react-native-gesture-handler';
import React from 'react'

import { StackNavigator } from './src/navigation/StackNavigatior';
import { PermissionProvider } from './src/context/PermissionsContext';



const App = () => {
    return (
   
            <Appstates>
                <StackNavigator />
            </Appstates>
        
        
    )
}

const Appstates = ( { children }: any ) => {
    return(
        <PermissionProvider>
            { children }
        </PermissionProvider>
    )
}

export default App;
