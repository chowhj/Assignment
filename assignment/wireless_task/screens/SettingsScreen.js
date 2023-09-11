import React, {Component} from "react";
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
    TouchableWithoutFeedback,
    Switch,
    ImageBackground
    } from "react-native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconfont from 'react-native-vector-icons/FontAwesome5';
import { externalstyles } from "../style/Externalstylesheet";
import Slider from '@react-native-community/slider';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class SettingsScreen extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        playSound: false,
        showNotification: false,
        rpromo: false,
        rating: 5,
      };
    }
  
    componentDidMount() {
      this._readSettings();
    }
  
    async _saveSetting(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log('## ERROR SAVING ITEM ##: ', error);
      }
    }
  
    async _readSettings() {
      newStates = {};
  
      try {
        let keys = await AsyncStorage.multiGet(
          ['playSound', 'showNotification','rpromo'],
          (err, stores) => {
            stores.map((result, i, store) => {
              // get at each store's key/value so you can work with it
              let key = store[i][0]; // the key
              let value = store[i][1]; // the value
  
              if (['playSound', 'showNotification'].indexOf(key) != -1) {
                newStates[key] = value == 'true' ? true : false;
              } else {
                newStates[key] = value;
              }
            });
            this.setState(newStates);
            console.log(newStates);
          },
        );
      } catch (error) {
        console.log('## ERROR READING ITEMS ##: ', error);
      }
      
    }

    render() {
      return (
        <View style={externalstyles.container}>
          <ScrollView >
            <ImageBackground source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHI7uzxuldZIgTE3t6imxOv0qGdnvqpV8ruG8JXzP0ymxz61nYvzuEP4Zf7i89c3Gmsk&usqp=CAU'}} style={styles.image}> 
              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Drawer',{screen:'Home'})}>
                    <View style = {styles.aboutbutton}>
                        <Text style={{fontWeight:'bold',flex: 4,fontSize: 20,margin: 10,}}>Home Page{'\t'} 
                            <Ionicons name="home" size={28} color={'#4863A0'} />
                        </Text>
                    </View>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Drawer',{screen:'About'})}>
                    <View style = {styles.aboutbutton}>
                        <Text style={{fontWeight:'bold',flex: 4,fontSize: 20,margin: 10,}}>About Us {'\t'} 
                            <Iconfont name="info-circle" size={28} color={'#4863A0'} />
                        </Text>
                    </View>
              </TouchableOpacity>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>{'Play Sound  '}
                    <Icon name="sound" size={28} color={'#4863A0'} /></Text>
                <Switch
                  style={styles.switch}
                  onValueChange={playSound => {
                    this.setState({playSound});
                    this._saveSetting('playSound', playSound.toString());
                  }}
                  value={this.state.playSound}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>{'Show Notification  '}
                    <Icon name="notification" size={28} color={'#4863A0'} /></Text>
                <Switch
                  style={styles.switch}
                  onValueChange={showNotification => {
                    this.setState({showNotification});
                    this._saveSetting(
                      'showNotification',
                      showNotification.toString(),
                    );
                  }}
                  value={this.state.showNotification}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>{'Received promotion  '}
                    <Ionicons name="newspaper-outline" size={28} color={'#4863A0'} /></Text>
                <Switch
                  style={styles.switch}
                  onValueChange={rpromo => {
                    this.setState({rpromo});
                    this._saveSetting('rpromo', rpromo.toString());
                  }}
                  value={this.state.rpromo}
                />
              </View>
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>{'Rating'}</Text>
                <Slider style={{width: 300}}
                  step={1}
                  minimumValue={0}
                  maximumValue={10}
                  value={this.state.rating}
                  onValueChange={(rating) => {
                    this.setState({rating});
                    }}
                />
                <Text style={styles.sliderText}>
                  {this.state.rating}
                  <Icon name="star" size={28} color={'#4863A0'} />
                </Text>
              </View>
            </ImageBackground>
          </ScrollView> 
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: 80,
    },
    switchLabel: {
      flex: 4,
      fontSize: 20,
      margin: 10,
    },
    switch: {
      flex: 1,
      margin: 10,
    },
    aboutbutton: {
        height:60,
        alignItems: 'flex-start',
        flexDirection:'row',
      },
    sliderContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        //height: 60,
      },
    sliderLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
      },
    sliderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#002395',
        marginLeft:10,
      },
    image: {
        flex: 1,
        resizeMode:"cover",
        height: screenHeight,
        width: screenWidth,
      },
  });
