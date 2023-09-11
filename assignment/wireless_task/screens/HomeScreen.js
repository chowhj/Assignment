import React, {Component} from "react";
import {Text,View,ScrollView,Image,StyleSheet,TouchableHighlight} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/FontAwesome';
import Iconfont from 'react-native-vector-icons/Fontisto';
import { externalstyles } from "../style/Externalstylesheet";



export default class HomeScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
        username:this.props.route.params?.username,
        email:this.props.route.params?.email,
        signedin:this.props.route.params?.signedin,
      };
    }

    render(){
        return(
            <View style={externalstyles.container}>
              <View style ={styles.welcome}>
                <ScrollView>
                  <Text style ={styles.welcomeText}>
                      Welcome To Superstar Villa Resort {'\t'}{'\t'}    
                      <Iconfont
                        name="hotel"
                        size={30}
                        color={'#6960EC'} 
                      />
                  </Text>
                  <Text style={{fontSize:22,color:'#483D8B'}}>Hotel Room View </Text>
                  <ScrollView horizontal={true}>
                  <Image source={require('../img/homescreen/hotelhome1.jpeg')} style={{width: 120, height: 120, margin: 10}} />
                  <Image source={require('../img/homescreen/hotelhome2.jpeg')} style={{width: 120, height: 120, margin: 10}} />
                  <Image source={require('../img/homescreen/hotelhome3.jpeg')} style={{width: 120, height: 120, margin: 10}} />
                  <Image source={require('../img/homescreen/hotelhome4.jpeg')} style={{width: 120, height: 120, margin: 10}} />
                  <Image source={require('../img/homescreen/hotelhome5.jpeg')} style={{width: 120, height: 120, margin: 10}} />
                  </ScrollView>
                  <Text style={styles.displaytext}>DISCOVER OUR HOTELS & RESORTS IN SOUTHEAST ASIA</Text>
                  <Text style ={{fontSize:22,color:'#483D8B'}}>
                      About
                      <Ionicons
                            name="information-circle-sharp"
                            size={30}
                            color={'#08A04B'} 
                        />
                  </Text>
                  <TouchableOpacity onPress = {() => this.props.navigation.navigate('About')}>
                    <View style = {styles.aboutbutton}>
                      <Text style={styles.introtext}>Superstar Villa Hotel Resort, Seasense is, 
                          a beachfront property, consisting of 30 rooms on 2 levels (Ground & 1st floor). 
                          The hotel boasts 3 Restaurants, 2 Bars, a Lounge, Reception, Boathouse and Spa.</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style ={{fontSize:22,color:'#483D8B'}}></Text>
                  <TouchableHighlight 
                    underlayColor="#E0FFFF"
                    onPress = {() => this.props.navigation.navigate('Booking')}>
                    <View style = {styles.bookingbutton}>
                      <Text style={styles.bookingtext}>Booking Room</Text>
                    </View>
                  </TouchableHighlight>
                  <Text style ={{fontSize:22,color:'#483D8B'}}>Room Recommendation
                    <Iconfont
                          name="room"
                          size={30}
                          color={'#6A287E'} 
                        />
                  </Text>
                  <ScrollView>
                    <Text style={{fontSize:20}}>Deluxe Beachfront and Ocean Rooms(Only steps away from the shores and fine sand of the East Coast)</Text>
                    <Image source={require('../img/homescreen/hotelroom1.jpg')} style={{width: 180, height: 180, margin: 10}} />
                    <Text style={{fontSize:20}}>Double Deluxe Chalets And Spacious Rooms(Spacious and clean rooms)</Text>
                    <Image source={require('../img/homescreen/hotelroom2.jpeg')} style={{width: 180, height: 180, margin: 10}} />
                    <Text style={{fontSize:20}}>Spacious Bayview and Bayview with Balcony Rooms(Deluxe European style, full-service beachfront)</Text>
                    <Image source={require('../img/homescreen/hotelroom3.png')} style={{width: 180, height: 180, margin: 10}} />
                    <Text style={{fontSize:20}}>Sea Diamond Boutique Rooms (spectacular view of the five islets of the north-east of Mauritius)</Text>
                    <Image source={require('../img/homescreen/hotelroom4.jpg')} style={{width: 180, height: 180, margin: 10}} />
                    <Text style={{fontSize:20}}>Sea View Family Rooms(Hospitality and unique, personalized services)</Text>
                    <Image source={require('../img/homescreen/hotelroom5.jpg')} style={{width: 180, height: 180, margin: 10}} />
                  </ScrollView>
                </ScrollView>
              </View>
            </View>

        );

    }
};

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
  displaytext: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:24,
    textAlign: 'center',
    color: '#454545'
  },
  introtext:{
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:20,
    textAlign: 'center',
    color: '#046307',
  },
  aboutbutton: {
    height:120,
    width: 390,
    alignItems: 'center',
    backgroundColor: '#C3FDB8'
  },
  bookingtext:{
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:20,
    textAlign: 'center',
    color: '#0909FF',
  },
  bookingbutton: {
    height:50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: '#ADDFFF'
  },
});

