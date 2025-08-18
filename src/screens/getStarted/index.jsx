import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { screenHeight, screenWidth } from '../../utils/constants'
import TextDescription from '../../components/ui/TextDescription'
import TextTitle from '../../components/ui/TextTitle'
import Button from '../../components/ui/Button'
import { LOGIN, REGISTER } from '../../utils/routes'
import TextButton from '../../components/ui/TextButton'

const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Image 
          source={require('../../assets/images/image1.png')}
          style={{
            width: screenWidth - 80,
            height: screenHeight / 4,
            resizeMode: 'contain'
          }}
          />
        </View>

        {/* yazi view i */}
        <View style={{flex:1, padding:5}}>
          <View style={{flex:2}}>
            <TextTitle title="World's Safest And Largest Digital NoteBook"/>
            <TextDescription description="Notely is the world's largest and most intelligent digital notebook. Join over 10M+ users who are already using Notely."/>
          </View>

          <View style={{flex:1}}>
            <Button title="GET STARTED"
             onPress={() => navigation.navigate(REGISTER)}/>
             <TextButton title="Already have an account?"
             onPress={() => navigation.navigate(LOGIN)}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default GetStarted