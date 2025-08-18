import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react'
import { Colors } from '../../theme/colors';

const Input = (props) => {

    const {label, error, editable=true} = props;


    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
            {...props}
            style={[styles.input,
                {
                    borderColor: error ? Colors.SECOND : Colors.SOFTGRAY,
                }

            ]}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input:{
        backgroundColor: Colors.WHITE,
        padding:15,
        fontSize: 16,
        borderRadius:8,
        borderWidth:2,
    },
    label:{
        fontSize:12,
        marginVertical:12
    },
    error:{
        fontSize:14,
        color:Colors.SECOND,
        marginTop:5
    }
})

export default Input
