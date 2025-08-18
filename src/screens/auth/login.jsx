import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import TextTitle from '../../components/ui/TextTitle'
import TextDescription from '../../components/ui/TextDescription'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import TextButton from '../../components/ui/TextButton'
import { REGISTER } from '../../utils/routes'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/actions/authActions'


const Login = ({navigation}) => {

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
  });
  const dispatch = useDispatch();

  return (
     <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        {/* modal*/}

        <ScrollView contentContainerStyle={{flex:1}}>

          <View style={{flex:1, justifyContent:'center'}}>
            <TextTitle title="Login to your account"/>
            <TextDescription description="Please enter your credentials to access your account."/>
          </View>
          <Formik
          initialValues={{
            email: 'smt14@gmail.com',
            password: '12345678',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            await dispatch(loginUser(values));
          }} >
            {
              ({values,errors,handleChange,handleSubmit,handleBlur})=>(
                <>
                  <View style={{flex:3}}>
                    <View>
                      <Input 
                      placeholder="Email Adress"
                      label="Email Adress"
                      error={errors.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      />
                        <Input 
                      placeholder="Password"
                      label="Password"
                      error={errors.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      />
                    </View>
                    <View style={{flex:1, justifyContent:'center'}}>
                      <Button
                      title="Login"
                      disabled={Object.keys(errors).length > 0}
                      onPress={handleSubmit}
                      />
                      <TextButton title="No account yet? Create One!" onPress={() => navigation.navigate(REGISTER)}/>

                    </View>

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

export default Login