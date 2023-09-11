import React, {Component,useRef, useState, useEffect} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Platform, 
  SafeAreaView,
  StatusBar,
  Button,
  TouchableWithoutFeedback
} from "react-native";

import 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import ImageCarousel from '../../ImageCarousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { externalstyles } from "../style/Externalstylesheet";

const restaurants = [
  {
    id:0,
    title:"Restaurant",
    image: require('../img/aboutscreen/restaurant1.png'),
  },
  {
    id:1,
    title:"Restaurant",
    image: require('../img/aboutscreen/restaurant2.png'),
  },
  {
    id:2,
    title:"Restaurant",
    image: require('../img/aboutscreen/restaurant3.png'),
  },
  {
    id:3,
    title:"Restaurant",
    image: require('../img/aboutscreen/restaurant4.jpg'),
  },
  {
    id:4,
    title:"Restaurant",
    image: require('../img/aboutscreen/restaurant5.jpg'),
  },
]

const outdoor= [
  {
    id:0,
    title:"Blue Safari Submarine",
    image: require('../img/aboutscreen/submarine.jpg'),
  },
  {
    id:1,
    title:"Blue Bay Marine Park",
    image: require('../img/aboutscreen/marine.jpg'),
  },
  {
    id:2,
    title:"Kitesurf",
    image: require('../img/aboutscreen/Kitesurf.jpg'),
  },
  {
    id:3,
    title:"Big game fishing",
    image: require('../img/aboutscreen/fishing.jpg'),
  },
  {
    id:4,
    title:"Catamaran",
    image: require('../img/aboutscreen/catamaran.jpg'),
  },
  {
    id:5,
    title:"Parasailing",
    image: require('../img/aboutscreen/parasailing.jpg'),
  },

]

const welness= [
  {
    id:0,
    title:" Fitness Center",
    image: require('../img/aboutscreen/Welness1.jpeg'),
  },
  {
    id:1,
    title:"Seafit Center",
    image: require('../img/aboutscreen/welness2.jpeg'),
  },
  {
    id:2,
    title:"Facial Treament",
    image: require('../img/aboutscreen/welness3.png'),
  },
  {
    id:3,
    title:"Hand massage",
    image: require('../img/aboutscreen/welness4.jpg'),
  },
  {
    id:4,
    title:"Body massage",
    image: require('../img/aboutscreen/welness5.png'),
  },
]

export default class AboutScreen extends Component{
    render(){
        return(
            <SafeAreaView style={externalstyles.container}>
                <View style={styles.welcome}>
                <TouchableWithoutFeedback
                   onPress={() => {this.props.navigation.navigate('Home');
                   }}
                >
                  <View style ={styles.touch} flexDirection="row">
                    <Ionicons name="arrow-back" size={25} color={'#93FFE8'} />
                    <Text style = {{color:'#F0FFFF',fontWeight:'bold',fontSize:18}}>Home Screen</Text>
                  </View>
                </TouchableWithoutFeedback>
                  <ScrollView persistentScrollbar={true} >
                    <Text style={styles.welcomeText}>
                    Superstar Villa Hotel Resort
                      <Text> </Text>
                    ABOUT US</Text>
                    <Text style={styles.about}>SuperVilla Star Resort is a hotel of the Mauritius Island that offers 
                    5 type of rooms perfect for those looking for a unique and unforgettable stay in Mauritius. SuperVilla Star Resort is 
                    specialized in boutique hotel accommodation and services in Mauritius.
                    Started in 2015 with one hotel namely Superstar Villa Hotel of 30 rooms in the north of the island.
                    Today the group has reached an inventory 
                    of 216 keys daily altogether and our customers are sourced from European countries, 
                    Asian, Africa and Reunion Island. The hotels are marketed from 4 to 5 stars categories, and each hotel targets specific segments 
                    from Adult-Only boutique hotel customers, couples, honeymooners, weddings, families, 
                    nature lovers, leisure travelers, groups and business travel.</Text>
                    <Text style={{fontSize:22,color: '#2B547E'}}>Facilities:</Text>
                    <Text style={{fontSize:22,color: '#2B547E'}}>Restaurant & Bar Gallery:</Text>
                    <View style ={styles.box}>
                        <Text style={styles.intro}>
                        Part of the Superstar Villa Hotel experience is indulging in the most authentic and delicious dishes this beautiful island has to offer.
                        From the catch of the day to local fresh ingredients, 
                        every plate we offer is made with care and diligence to give you an authentic experience! 
                        The discreet SeaForest Restaurant facing an infinity pool serves authentic and local venison meat dishes and 
                        other delights from the estate, as well as an international cuisine selection. 
                        Indulge in breakfast, lunch, and dinner with breathtaking panoramic views of the forests of Chamarel, 
                        Bel Ombre and ocean views of the south coast.
                        </Text>
                        <StatusBar barStyle="light-content" />
                        <ImageCarousel data={restaurants} />
                        <Text></Text>
                    </View>
                    <Text></Text>
                    <Text style ={{fontSize:22,color: '#2B547E'}}>Sea & Water Outdoor Acivities:</Text>
                    <View style ={styles.box2}>
                        <Text style={styles.intro2}>SuperVilla Star Resort have various sea & water activities such as 
                        Blue Safari Submarine which is the only operator of real submarines in the Indian Ocean.
                        During your 40-minutes dive, amongst multicoloured fish, you will discover the beauty of the corals 
                        and who knows what surprise awaits you. Our pilots, trained in marine biology, will guide you through your dive.SuperVilla Star Resort have various sea & water activities such as 
                        Blue Safari Submarine which is the only operator of real submarines in the Indian Ocean.
                        During your 40-minutes dive, amongst multicoloured fish, you will discover the beauty of the corals 
                        and who knows what surprise awaits you. Our pilots, trained in marine biology, will guide you through your dive. 
                        Blue Bay Marine Park is also one of the interesting sea & water activity.
                        For Kitesurf, Beginners and confirmed kiters can enjoy the vastness of the La Prairie / Baie du Cap lagoon, 
                        providing a shallow and safe environment and allows downwind glides to Le Morne.
                        Big Game Fishing Its tropical waters are home to blue and black stripe marlin, sharks, tuna, sail fish, bonitos, Wahoo, Dorado and the bécune. 
                        The most popular season for international anglers is from September to March, but big game fishing is possible year round. 
                        Your experience will be unsurpassed and unique from any fishing excursion you have been on before.
                        Catamaran trip in Mauritius is considered to be one of the best attractions in Mauritius. It is undoubtedly 
                        one of the most enjoyable activities for visitors to Mauritius and a great experience to remember and cherish. 
                        You will get to discover the beauty of Mauritius Paradise Island, one of the most beautiful travel destinations 
                        in the world with superb coral reefs, crystal clear water, beautiful lagoons, stunning unspoiled beaches 
                        and amazing underwater world.</Text>
                        <Text></Text>
                        <StatusBar barStyle="dark-content" />
                        <ImageCarousel data={outdoor} />
                        <Text></Text>
                    </View>
                    <Text></Text>
                    <Text style ={{fontSize:22,color: '#2B547E'}}>Wellness Activities:</Text>
                    <View style ={styles.box3}>
                        <Text style={styles.intro3}>
                        Superstar Villa Hotel & Spa will be your guide to a serene vacation. Yield to the healing hands of our therapists and tailored treatments,
                        where body and mind are nurtured to an ultimate state of relaxation and wellbeing. 
                        From massages, facial treatments to skin care, we have the ideal remedy to keep you feeling blissful throughout your island getaway.
                        Head over to Sea Superstar Villa Fitness Center for your daily workout or be at peace at our yoga classes. 
                        Our qualified instructors will keep you in shape during your stay.
                        Seaspa will be your guide to a serene vacation. yield to the healing hands of our therapists and tailored treatments where body and spirit are nurtured to an ultimate state of relaxation and wellbeing. 
                        Fom massages, to facial treatments to skin care. we have the ideal remedy to keep you feeling blissful throughout your island getaway.
                        </Text>
                        <Text></Text>
                        <StatusBar barStyle="light-content" />
                        <ImageCarousel data={welness} />
                        <Text></Text>
                    </View>
                    <Text></Text>
                    <Text style ={styles.welcomeText}>Why Choose Us ?</Text>
                    <View style ={styles.choosetext}>
                      <Text style ={styles.linetext}>We offer our customers a unique, personalized experience and the chance to explore the beautiful island 
                        of Mauritius in an unparalleled way. Located in different areas of Mauritius, our hotels cater to those looking 
                        for an exclusive holiday experience in our paradisiac island. 
                        Our hotels’ staff focuses on attention to detail and premium service 
                        to ensure you have an unforgettable holiday in Mauritius!</Text>
                    </View>
                  </ScrollView>
                </View>
            </SafeAreaView>

        )
    }
}


const styles = StyleSheet.create({
    welcome: {
        alignItems: 'flex-start',
        justifyContent:'center',
        flexDirection:'column',
      },
    welcomeText:{
        color: '#34282C',
        fontFamily: 'Roboto-Medium',
        fontSize: 25,
        textAlign: 'center',
        margin: 20,
      },
    introtext:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:20,
        textAlign: 'center',
        color: '#151B8D',
      },
    title:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:20,
        textAlign: 'center',
        color: '#0000A5',
      },
    about:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:15,
        textAlign: 'center',
        color: '#151B54',
      }, 
    choosetext:{
      flex:1,
      backgroundColor: '#EAEEE9',
    },
    linetext:{
      alignItems: 'center',
      justifyContent: 'center',
      fontSize:14,
      textAlign: 'center',
      color: '#6E2C00',
    }, 
    box:{
      flex:1,
      backgroundColor: '#D6EAF8',
    },
    intro:{
      fontSize:14,
      textAlign: 'center',
      color: '#0000A5',
    }, 
    box2:{
      flex:1,
      backgroundColor: '#F5EEF8',
    },
    intro2:{
      fontSize:14,
      textAlign: 'center',
      color: '#512E5F',
    }, 
    box3:{
      flex:1,
      backgroundColor: '#D5F5E3',
    },
    intro3:{
      fontSize:14,
      textAlign: 'center',
      color: '#0B5345',
    }, 
    touch: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: '#00BFFF',
      borderRadius: 10,
      width:140,
      
  },
});