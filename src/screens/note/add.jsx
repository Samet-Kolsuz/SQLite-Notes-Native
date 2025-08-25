import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Button from '../../components/ui/Button'
import { screenHeight, screenWidth } from '../../utils/constants'
import { Colors } from '../../theme/colors'
import Input from '../../components/ui/Input'
import { createNote, getAllNotes } from '../../redux/slices/noteSlice'

const AddNote = ({navigation}) => {

    const {user} = useSelector(state => state.auth)

    const NoteSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required')
    })
    const dispatch = useDispatch()


  return (
   <SafeAreaView style={defaultScreenStyle.safeContainer}>
    <View style={defaultScreenStyle.container}>


            <Formik
            initialValues={{
                userid: user.id,
                title:"",
                description: ""
            }}
            validationSchema={NoteSchema}
            onSubmit={async(values)=>{
                try {
                    await dispatch(createNote(values))
                    navigation.goBack()
                } catch (error) {
                    console.log('Note creation error:', error)
                }
            }}
            >
                {
                   ({values, errors, handleSubmit,handleChange, handleBlur})=>(
                      <View>
                        <Input
                        error={errors.title}
                        style={[styles.input, styles.inputTitle]}
                        label="Title"
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                        placeholder="Title"
                        />
                        <Input
                        error={errors.description}
                        style={[styles.input, styles.inputDescription]}
                        multiline
                        label="Note"
                        labelstyle={styles.labelStyles}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        placeholder="Description"
                        />
                        <Button
                        title="Create Note"
                        onPress={handleSubmit}
                        />
                    </View>
                   )
                }
            </Formik>


    </View>

   </SafeAreaView>
  )
}

export default AddNote

const styles = StyleSheet.create({
       input:{
        minHeight:screenHeight * 0.06,
        paddingHorizontal:screenWidth * 0.01,
        paddingVertical:screenHeight * 0.01,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        paddingHorizontal:10,
        marginVertical:0,
        borderWidth: 1,
       
    },
    inputTitle:{
        fontSize:24,
        fontWeight:'700',



    },
    inputDescription:{
        fontSize:16,
        height:screenHeight * 0.55,
    },
    labelStyles:{
        marginVertical:0,
        fontSize:16,
        marginBottom:5,
     }
})