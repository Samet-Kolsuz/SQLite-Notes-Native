import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { screenHeight } from '../../utils/constants';
import { Colors } from '../../theme/colors';

const Button = (props) => {
    const {title, pending, disabled}= props;
  return (
    <TouchableOpacity 
    disabled={disabled} 
    {...props} 
    style={[styles.container,{backgroundColor: disabled ? Colors.SOFTGRAY : Colors.SECOND}]}>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        minHeight: screenHeight/15,
        marginVertical: 5,
    },
    title:{
        color: Colors.WHITE,
        fontSize: 20,
        fontWeight: "600"
    }
})