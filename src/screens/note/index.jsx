import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { Colors } from '../../theme/colors';
import { useSelector } from 'react-redux';

const NoteList = () => {
  const pending = false;

  const { notes } = useSelector((state) => state.note);
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
            data={notes}
            renderItem={({ item,index }) => 
            <View key={index}>
              <Text style={{fontSize:25}}>{item.title}</Text>
              <Text style={{fontSize:15}}>{item.text}</Text>
            </View>
          }
            />
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default NoteList

const styles = StyleSheet.create({})