import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { Colors } from '../../theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import NoteItem from '../../components/ui/NoteItem';
import ListEmptyComponent from '../../components/notes/ListEmptyComponent';
import { useFocusEffect } from '@react-navigation/native';
import { getAllNotes } from '../../redux/actions/noteActions';

const NoteList = () => {
  const pending = false;
  const dispatch = useDispatch();

  const { notes } = useSelector((state) => state.note);
  const { user } = useSelector((state) => state.auth);



 useFocusEffect(
    React.useCallback(() => {
      const fonksiyon = async () => {
        try {
          await dispatch(getAllNotes({ userid: user.id }))
        }
        catch (err) {
          console.error(err);
        }

        console.log("fonksiyon çalıştı")
      }

      fonksiyon();
    }, [user.id, dispatch])
  );


  


  return (
    
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        {
          pending ? (
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
              <ActivityIndicator size="large" color={Colors.GRAY} />
            </View>
          )
          :(
            <FlatList
            numColumns={2}
            data={notes}
            renderItem={({ item,index }) => <NoteItem note={item}/>}
            ListEmptyComponent={<ListEmptyComponent />}
            />
            
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default NoteList

const styles = StyleSheet.create({})
