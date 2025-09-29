import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import TextTitle from '../../components/ui/TextTitle'
import { Formik } from 'formik'
import { updateUserFromDb } from '../../utils/db'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/ui/Input'
import * as Yup from 'yup';
import Button from '../../components/ui/Button'
import { UpdateUser } from '../../redux/actions/authActions'

const ProfileEdit = ({navigation}) => {

 const dispatch = useDispatch();
 const {user}= useSelector(state=>state.auth);
 const EditSchema = Yup.object().shape({
     username: Yup.string().trim().required('Username is required'),
     password: Yup.string().trim().required('Password is required').min(8, 'Password must be at least 8 characters'),
     location: Yup.string().trim().required('Location is required'),
   })

 


  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        <ScrollView contentContainerStyle={{flex:1}}>
          <View style={{flex:1, justifyContent:'center'}}>
            <TextTitle title='Update Your Account'/>
          </View>
          
          <Formik
          initialValues={{
            id: user.id,
            email: user.email,
            username: user.username,
            password: user.password,
            location: user.location
          }}
          validationSchema={EditSchema}
          onSubmit={async({username,password,location,id})=>{
            await dispatch(UpdateUser({username,password,location,id}))
            navigation.goBack();
          }}>
            {
              ({handleChange, handleBlur, handleSubmit, values,errors})=>(
                <>
                <View style={{flex:3}}>
                  <Input
                  error={errors.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  placeholder='Full Name'
                  label='Full Name'
                />
                <Input
                  editable={false}
                  value={values.email}
                  label='Email'
                />
                <Input
                error={errors.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder='Password'
                  label='Password'
                  secureTextEntry={true}
                />
                <Input
                  error={errors.location}
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                  value={values.location}
                  placeholder='Location'
                  label='Location'
                />
                </View>
                <View style={{flex:1, justifyContent:'flex-end'}}>
                  <Button 
                    title='Update Profile' onPress={handleSubmit}
                    disabled={Object.keys(errors).length != 0}
                  />
                </View>
                </>

              )
            }
            </Formik>

        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default ProfileEdit

const styles = StyleSheet.create({})