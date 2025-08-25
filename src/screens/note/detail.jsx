import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle';
import { screenHeight, screenWidth } from '../../utils/constants';
import Button from '../../components/ui/Button';
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../../redux/slices/noteSlice';

const NoteDetail = ({ route, navigation }) => {
    const { note } = route.params;
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const dispatch = useDispatch();

    const handleDelete = async() => {
        try{
            await dispatch(deleteNote(note.id))
            navigation.goBack();
        }
        catch(err){
            console.log(err);
            Alert.alert('Error deleting note');
        }
    }
    const handleUpdate = async() => {
        await dispatch(updateNote({noteId:note.id, title, description}))
        navigation.goBack();
    }
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
        <View style={defaultScreenStyle.container}>

                <TextInput value={title} onChangeText={setTitle} style={[styles.input, styles.inputTitle]} />
                <TextInput value={description} onChangeText={setDescription} style={[styles.input, styles.inputDescription]} multiline />
                <Button title="Save Note"
                onPress={handleUpdate}
                />
                <Button title="Delete Note"
                onPress={handleDelete}
                />

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