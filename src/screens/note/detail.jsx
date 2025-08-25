import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle';
import { screenHeight, screenWidth } from '../../utils/constants';
import Button from '../../components/ui/Button';

const NoteDetail = ({ route }) => {
    const { note } = route.params;
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
        <View style={defaultScreenStyle.container}>

                <TextInput value={title} onChangeText={setTitle} style={[styles.input, styles.inputTitle]} />
                <TextInput value={description} onChangeText={setDescription} style={[styles.input, styles.inputDescription]} multiline />
                <Button title="Save Note"/>
                <Button title="Delete Note"/>

        </View>
    </SafeAreaView>
  )
}

export default NoteDetail

const styles = StyleSheet.create({
    input:{
        minHeight:screenHeight * 0.07,
        paddingHorizontal:screenWidth * 0.01,
        paddingVertical:screenHeight * 0.01
    },
    inputTitle:{
        fontSize:24,
        fontWeight:'700'
    },
    inputDescription:{
        fontSize:16,
        height:screenHeight /100 * 60,
    }
})