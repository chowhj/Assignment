import React, {Component,useEffect} from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Button,
    } from "react-native";

import {InputWithLabel} from '../../UI';
import {FloatingAction} from 'react-native-floating-action';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

let SQLite = require('react-native-sqlite-storage');



export default class ProfileScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name:this.props.route.params.params.username,
      email:this.props.route.params.params.email,
      signedin:this.props.route.params.params.signedin,
      user: null,
      };

    this.db = SQLite.openDatabase(
      {name: 'credentialsdb.db', createFromLocation: '~credentialsdb.db'},
      this.openCallback,
      this.errorCallback,
    );
    console.log(this.props.route.params.params)
    }

  componentDidMount() {
    this._readSettings();
    this._saveSettings(this.state.email)
    this._queryByEmail();
  }

  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: 'Profile  ' + this.state.name });
  }

  _queryByEmail() {
    this.db.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM users WHERE email=?',
        [this.state.email],
        (tx, results) => {
          console.log(results.rows.item(0));
          if (results.rows.length) {
            this.setState({user: results.rows.item(0)});
          }
        },
      ),
    );
  }

  openCallback() {
    console.log('Profile Screen Database opened successfully'); 
  }
    
  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }

  async _saveSettings(email) {
    try {
      await AsyncStorage.setItem('email', email);
    } catch (error) {
      console.log('## ERROR SAVING ITEM ##: ', error);
    }
  }

  async _readSettings() {
    try {
      let email = await AsyncStorage.getItem('email');
      if (email !== null) {
        this.setState({email: email});
      }else if (email !== this.props.route.params.params.email){
        this.setState ({
          name:this.props.route.params.params.username,
          email:this.props.route.params.params.email,
          signedin:this.props.route.params.params.signedin,
          user: null,
          });
      }
    } catch (error) {
      console.log('## ERROR READING ITEM ##: ', error);
    }
  }


  render() {
    let user = this.state.user;
      return (
        <View style={styles.container}>
            <Image
              style={styles.coverPhoto}
              source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUUZgqczMg7bPR2O7Sbty2laosPA-WXj24-6Y6dCpMJWI3cRio9PmSJTYAvo3i0ifxjo&usqp=CAU'}}
            />
            <View style={styles.profileContainer}>
              <Image
                style={styles.profilePhoto}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCu_zlYqgRAA-Q_oEJX28TY-OoRK2Yi2rlyg&usqp=CAU'}}
              />
            </View>
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              label={'User Name:'}
              value={user ? user.username:''}
              orientation={'vertical'}
              editable={false}
            />
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              label={'User Email:'}
              value={user ? user.email:''}
              orientation={'vertical'}
              editable={false}
            />
            <Text></Text>
            <Text>{'\n'}</Text>
            <Button
                  title="Go back Home Screen"
                  onPress={() => this.props.navigation.goBack()}
            />
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        backgroundColor: '#F0FFFF',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        alignItems: 'center',
        justifyContent:'flex-start',
        padding:1,
      },
    coverPhoto: {
        width: '100%',
        height: 180,
        borderRadius:10,
      },
    profileContainer: {
        alignItems: 'center',
        marginTop: -60,
      },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
      },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
    TextLabel: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
      },
    
    TextInput: {
        color: 'black',
        //marginRight: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'stretch',
      },
    aboutbutton: {
        height:30,
        width: 200,
        alignItems: 'center',
        backgroundColor: '#C3FDB8',
        borderRadius:15,
      },
    introtext:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:18,
        textAlign: 'center',
        color: '#046307',
      },
    });

