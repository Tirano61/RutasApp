

import React,{ useContext } from 'react'
import { View, Text, StyleSheet, Platform,TouchableOpacity } from 'react-native';

import { PermissionContext } from '../context/PermissionsContext';

export const HomeScreen = () => {

    const { permissions, askLocationPermissions } = useContext(PermissionContext)

    

    return (
        <View style={styles.container}>
            <Text style={styles.tituloText}>Es necesario el uso del GPS {'\n'} para usar la aplicación</Text>
            <TouchableOpacity
            activeOpacity={0.7}
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
    tituloText:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
        color: 'black'
    },
    buton:{
        backgroundColor: '#032070',
        borderRadius: 20,
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }, 
    textButton:{
        color:'white', 
        fontSize: 16,
    },
})