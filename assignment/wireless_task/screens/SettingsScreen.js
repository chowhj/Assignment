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
    Switch
    } from "react-native";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
export default class SettingsScreen extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        playSound: false,
        showNotification: false,
        language: 'EN',
        rpromo: 'false',
        name:this.props.route.params?.username,
        signedin:this.props.route.params?.signedin,
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
          ['playSound', 'showNotification', 'language','rpromo'],
          (err, stores) => {
            stores.map((result, i, store) => {
              // get at each store's key/value so you can work with it
              let key = store[i][0]; // the key
              let value = store[i][1]; // the value
  
              if (['playSound', 'showNotification','rpromo'].indexOf(key) != -1) {
                newStates[key] = value == 'true' ? true : false;
              } else {
                newStates[key] = value;
              }
            });
            this.setState(newStates);
          },
        );
      } catch (error) {
        console.log('## ERROR READING ITEMS ##: ', error);
      }
    }
  
    render() {
      return (
        <ScrollView style={styles.container}>
           <TouchableOpacity onPress = {() => this.props.navigation.navigate('HomeScreen',{screen:'Home Page'})}>
                <View style = {styles.aboutbutton}>
                    <Text style={{fontWeight:'bold',flex: 4,fontSize: 20,margin: 10,}}>Home Page{'\t'} 
                        <Ionicons name="home" size={28} color={'#4863A0'} />
                    </Text>
                </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('AboutScreen',{screen:'About'})}>
                <View style = {styles.aboutbutton}>
                    <Text style={{fontWeight:'bold',flex: 4,fontSize: 20,margin: 10,}}>About US {'\t'} 
                        <Icon name="infocirlceo" size={28} color={'#4863A0'} />
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
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F0FFFF',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding:1,
      },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: 60,
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
        backgroundColor: '#F0FFFF',
        flexDirection:'row',
      },
  });
