import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultScreenStyle } from '../../styles/screenStyle'
import { screenHeight, screenWidth } from '../../utils/constants'
import { useSelector } from 'react-redux'
import { ArrowRight, ArrowRight2, Award, Key, Logout, Magicpen, NotificationBing, VideoPlay } from 'iconsax-react-nativejs'
import { Colors } from '../../theme/colors'
import { EDITPROFILE, PREMIUM } from '../../utils/routes'
import MenuItem from '../../components/ui/MenuItem'

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.auth)
  const profileMenu=[
    {
      id:1,
      icon: <Award size={24} color={Colors.SECOND} />,
      title:"Premium'a Geç",
      onPress: () => navigation.navigate(PREMIUM)
    },
      {
      id:2,
      icon: <Magicpen size={24} color={Colors.SECOND} />,
      title:"edit profile",
      onPress: () => navigation.navigate(EDITPROFILE)
    },
     {
      id:3,
      icon: <NotificationBing size={24} color={Colors.SECOND} />,
      title:"Notifications",
    },
    { 
      id:4,
      icon: <Key size={24} color={Colors.SECOND} />,
      title:"Security",
    },
    {
      id:5,
      icon: <Logout size={24} color={Colors.SECOND} />,
      title:"Log Out",
      onPress: ()=>{}
    }
  ]
  return (
    <SafeAreaView style={defaultScreenStyle.safeContainer}>
      <View style={defaultScreenStyle.container}>
        <ScrollView>
          <View style={styles.infoContainer}>
            <Image 
            source={require('../../assets/images/image3.png')}
            style={styles.image}
            />
            <Text style={styles.name}>{user?.username|| "Yeni Kullanici"}</Text>
            <Text style={styles.location}>{user?.location|| "Turkiye"}</Text>
          </View>
          <View>
           {
            profileMenu.map((item, index)=>(
               <MenuItem onPress={item.onPress} item={item} key={index}/>
            ))
           }
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  infoContainer:{
    alignItems:'center',
    justifyContent:'center',
    minHeight:screenHeight/3
  },
  image:{
    width: screenWidth/3+10,
    height: screenWidth/3+10,
    borderRadius:1000

  },
  name:{
    fontSize:28,
    fontWeight:'700',
    marginTop:15
  },
  location:{
    fontSize:16,
    marginTop:5,
  }
})