import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors';
import { screenWidth } from '../../utils/constants';

const CustomModal = (props) => {
    const  {
        modalVisible,
        title,
        description,
        icon,
        closeButton = null,
        successButton = null,
    }= props;

  return (
    <Modal style={styles.container} transparent animationType='fade' visible={modalVisible}>
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.iconContainer}>
                    {icon}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.btn}>
                    {successButton}
                    {closeButton}
                </View>

            </View>

        </View>
    </Modal>
    
  )
}

export default CustomModal

const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(0,0,0,0.5)",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    body:{
        backgroundColor: Colors.WHITE,
        width: screenWidth * 0.85,
        minHeight: screenWidth,
        borderRadius: 8,
        padding:10,
        paddingBottom:20,
    },
    iconContainer:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    textContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        flex:1,
        justifyContent:'space-around',
    },
    title:{
        fontSize:18,
        fontWeight:'700',

    },
    description:{
        fontSize:16,
        marginVertical:10,
        textAlign:'center',
    }
})