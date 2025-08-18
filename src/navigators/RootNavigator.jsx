import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GetStarted from '../screens/getStarted'
import Register from '../screens/auth/register'
import Login from '../screens/auth/login'
import { GETSTARTED, LOGIN, NOTELIST, REGISTER } from '../utils/routes'
import { Colors } from '../theme/colors'
import { useSelector } from 'react-redux'
import NoteList from '../screens/note'


const Stack = createNativeStackNavigator()

const RootNavigator = () => {
  const { isLogin } = useSelector(state => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.FOURTH
        }
      }}>
      {
        isLogin ?
          <Stack.Group>
            <Stack.Screen name={NOTELIST} component={NoteList} />
          </Stack.Group>

          :

          <Stack.Group>
            <Stack.Screen name={GETSTARTED} component={GetStarted} />
            <Stack.Screen name={REGISTER} component={Register} />
            <Stack.Screen name={LOGIN} component={Login} />
          </Stack.Group>}


    </Stack.Navigator>
  )
}

export default RootNavigator