import React from 'react'
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/Ionicons';


interface Props{
    iconName: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>,
}

export const Fab = ({ style, iconName, onPress }: Props) => {
  return (
    <View style={{
        ...style as any
    }}>
        <TouchableOpacity 
            activeOpacity={0.6}
            onPress={ onPress }
            style={styles.blackButton}
        >
            <Icon 
                name={iconName}
                color='white'
                size={30}
                style={{ left: 1, }}
            />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    blackButton:{
        zIndex: 999,
        height: 50,
        width: 50,
        backgroundColor: 'black',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 9,
        
    },
});