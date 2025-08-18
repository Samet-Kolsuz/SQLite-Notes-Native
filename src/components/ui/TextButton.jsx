import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors';

const TextButton = (props) => {
    const {title}= props;
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default TextButton

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    title:{
        color: Colors.SECOND,
        fonstSize: 16,
        fontWeight:"600"
    }

})