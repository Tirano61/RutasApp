

import React,{ useContext } from 'react'
import { View, Text, StyleSheet, Platform,TouchableOpacity } from 'react-native';

import { PermissionContext } from '../context/PermissionsContext';

export const HomeScreen = () => {

    const { permissions, askLocationPermissions } = useContext(PermissionContext)

    

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buton}
                onPress={  askLocationPermissions}
            >
                <Text style={styles.textButton}>Permisos</Text>
                
            </TouchableOpacity>
            <Text>{ JSON.stringify(permissions, null, 5) }</Text>
        </View>
    )
}


const styles =StyleSheet.create({
    container:{
        flex: 1, 
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    buton:{
        backgroundColor: 'black',
        borderRadius: 20,
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    textButton:{
        color:'white', 
        fontSize: 16,
    },
})