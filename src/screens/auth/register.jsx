import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { defaultScreenStyle } from '../../styles/screenStyle';
import TextTitle from '../../components/ui/TextTitle';
import TextDescription from '../../components/ui/TextDescription';
import { Formik } from 'formik';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/actions/authActions';


const Register = () => {
  const user = useSelector(state => state.auth);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    location: Yup.string().required('Location is required'),
  })

  const dispatch = useDispatch()
  useEffect(()=>{

  })
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        {/* modal*/}


        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex:1, justifyContent:"center"}}>
            <TextTitle title="Create a free account"/>
            <TextDescription description="Join Notely for free. Create and share unlimited notes with your friends."/>
          </View>
          <Formik
            initialValues={{
              username: 'samet kolsuz',
              password: '12345678',
              email: 'smt14@gmail.com',
              location: 'Istanbul'
            }}
            validationSchema={RegisterSchema}
            onSubmit={async(values) => {
              try{
                await dispatch(createUser(values))
              }catch (error){
                console.log(error);
              }
            }}>

              {
                ({values, errors, handleSubmit, handleBlur, handleChange})=>(
                  <>
                  <View style={{flex:3}}>
                    <Input label="Full Name"
                    placeholder="Enter your full name"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                     error={errors.username}/>


                    <Input label="Email Address"
                    placeholder="Enter your email address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                     error={errors.email}/>


                    <Input label="Password"
                    placeholder="Enter your password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                     error={errors.password}/>


                    <Input label="Location"
                    placeholder="Enter your location"
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                     error={errors.location}/>

                    
                  </View>


                  <View style={{flex:1}}>

                    <Button 
                    disabled={Object.keys(errors).length != 0}
                    title='Create Account' onPress={handleSubmit}/>


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

export default Register