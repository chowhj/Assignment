import React, {Component,useRef, useState, useEffect} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
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
} from "react-native";

import { ViewPropTypes } from 'deprecated-react-native-prop-types';


const ENTRIES1 = [
  {
    title:"ROOM 1",
    image: require('../img/aboutscreen/image1.png'),
  },
  {
    title:"ROOM 2",
    image: require('../img/aboutscreen/image2.png'),
  },
  {
    title:"ROOM 3",
    image: require('../img/aboutscreen/image3.png'),
  },
  {
    title:"ROOM 4",
    image: require('../img/aboutscreen/image4.png'),
  },
  {
    title:"ROOM 5",
    image: require('../img/aboutscreen/image5.png'),
  },

];

const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item.image}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={goForward}>
        <Text>The next room view</Text>
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight= {screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
}

export default class AboutScreen extends Component{

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.welcome}>
                  <ScrollView>
                    <Text style={styles.welcomeText}>Superstar Villa Hotel Resort</Text>
                    <Text style={styles.introtext}>Hotel Room View</Text>
                    <MyCarousel/>
                    <Text style={styles.welcomeText}>ABOUT US</Text>
                    <Text style={styles.about}>SuperVilla Star Resort is a hotel chain of the Mauritian brand that offers 
                    5 hotels perfect for those looking for a unique and unforgettable stay in Mauritius. SuperVilla Star Resort is 
                    specialized in boutique hotel accommodation and services in Mauritius.
                    Started in 2015 with one hotel namely Seapoint Boutique Hotel of 22 rooms in the north of the island.
                    Today the group has reached an inventory 
                    of 216 keys daily altogether and our customers are sourced from European countries, 
                    Asian, Africa and Reunion Island. The hotels are marketed from 4 to 5 stars categories, and each hotel targets specific segments 
                    from Adult-Only boutique hotel customers, couples, honeymooners, weddings, families, 
                    nature lovers, leisure travelers, groups and business travel.</Text>
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
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F0FFFF',
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      alignItems: 'center',
      justifyContent:'flex-start',
      padding:1,
    },

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
        color: '#1F6357',
      },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
      },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
      },
    image:{
      width: 50,
      height: 50,
      margin: 10,
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
        fontSize:13,
        textAlign: 'center',
        color: '#6F2DA8',
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
      color: '#4B0150',
    },  
    
});