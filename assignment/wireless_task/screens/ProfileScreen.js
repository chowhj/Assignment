import React, {Component} from "react";
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
import { LogBox } from 'react-native';
import { externalstyles } from "../style/Externalstylesheet";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

let SQLite = require('react-native-sqlite-storage');
let config = require('../Config')

export default class ProfileScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.username,
      email: this.props.route.params.email,
      signedin: this.props.route.params.signedin,
      user: null,
      };

    this._queryByEmail = this._queryByEmail.bind(this);

    // this.db = SQLite.openDatabase(
    //   {name: 'credentialsdb.db', createFromLocation: '~credentialsdb.db'},
    //   this.openCallback,
    //   this.errorCallback,
    // );
    }

  componentDidMount() {
    this._queryByEmail();
  }

  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: 'Profile  ' + this.state.user.username});
  }

  _queryByEmail(){
    let url = config.settings.serverPath + "/api/users/" + this.state.email;
    fetch(url)
        .then(response =>{
            if (!response.ok){
                Alert.alert('Error', response.status.toString());
                throw Error('Error ' + response.status)
            }
            return response.json();
        })
        .then(user=>{
          if (user){
            this.setState({user:user})
          }
        }).catch(error => {console.log(error)})
    }
  // _queryByEmail() {
  //   this.db.transaction(tx =>
  //     tx.executeSql(
  //       'SELECT * FROM users WHERE email=?',
  //       [this.state.email],
  //       (tx, results) => {
  //         console.log(results.rows.item(0));
  //         if (results.rows.length) {
  //           this.setState({user: results.rows.item(0), id: results.rows.item(0).id});
  //         }
  //       },
  //     ),
  //   );
  // }

  // openCallback() {
  //   console.log('Profile Screen Database opened successfully'); 
  // }
    
  // errorCallback(err) {
  //   console.log('Error in opening the database: ' + err);
  // }


  render() {
    let user = this.state.user;
      return (
        <View style={externalstyles.container}>
            <Image
              style={styles.coverPhoto}
              source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUUZgqczMg7bPR2O7Sbty2laosPA-WXj24-6Y6dCpMJWI3cRio9PmSJTYAvo3i0ifxjo&usqp=CAU'}}
            />
            <View style={styles.profileContainer}>
              <Image
                style={styles.profilePhoto}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCu_zlYqgRAA-Q_oEJX28TY-OoRK2Yi2rlyg&usqp=CAU'}}
              />
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('EditProfile',{
                    user: user,
                    refresh: this._queryByEmail,
                  })}
                }
                >
                  <View style={styles.aboutbutton}>
                      <Text style ={styles.introtext}>Edit User Profile</Text>
                  </View>
            </TouchableOpacity>
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
            <InputWithLabel
                  textLabelStyle={styles.TextLabel}
                  textInputStyle={styles.TextInput}
                  label={'User Phone Number:'}
                  value={(user ? user.phone:'').toString()}
                  orientation={'vertical'}
                  editable={false}
            />
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
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'stretch',
        textAlign:'center',
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
