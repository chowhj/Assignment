import React, {Component,useEffect,useRef,usePrevious} from 'react';
import {
  StyleSheet, 
  TextInput, 
  Text, 
  View, 
  ScrollView, 
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputWithLabel, PickerWithLabel, AppButton} from '../../UI';

let config = require('../Config')
let SQLite = require('react-native-sqlite-storage');

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      email: '',
      phone:'',
      password:'',
      user:{},
    };
  }

  componentDidMount() {
    this.setState({
      username:this.props.route.params.user.username,
      email:this.props.route.params.user.email,
      phone: this.props.route.params.user.phone,
      password:this.props.route.params.user.password,
      user: this.props.route.params.user,
    })
  }
  
  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: 'Edit User Profile ' + this.state.username});
    }
  
  
  _update() {
    let url = config.settings.serverPath + '/api/users/' + this.state.email;
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone
      }),
    }).then(response => {
      if (!response.ok){
        Alert.alert("Error", response.status.toString())
        throw Error('Error' + response.status)
      }
      return response.json()
    }).then(responseJson => {
      if (responseJson.affected > 0) {
        console.log(responseJson)
        Alert.alert("Success", "You have changed your user's information",[{
          text: "OK",
          onPress:() => {
            this.props.route.params.refresh()
            this.props.navigation.goBack()
          }
        }])
      }
    }).catch(error => {console.error (error)})
  }
  
  emailTestOK(email){
      return /\S+@\S+\.\S/.test(email)
  }
  numTestOK(str){
      return /\d/.test(str)
  }
  alphaTestOK(str){
      return /[a-zA-Z]/.test(str)
  }
  alphanumTestOK(str){
      return Boolean(str.match(/^[a-zA-Z0-9]+$/))
  }

  testingOK(item, paraType){
    if (item.length < 8 || !this.alphaTestOK(item)){
        this.sendAlert(paraType, " needs more than 8 alphanumeric characters, no special characters needed")
        return false
    }
    if (!this.numTestOK(item)){
        this.sendAlert(paraType, " needs at least one numeric character")
        return false
    }
    if (!this.alphaTestOK(item)){
        this.sendAlert(paraType, " needs at least one alphabetic character")
        return false
    }
    return true
  }

  _checkChange(){
    if(this.state.user.username !== this.state.username || this.state.user.password !== this.state.password || this.state.user.phone !== this.state.phone){
      return true
    }else{return false}
  }  

  
  _validation(){
    if (!this.testingOK(this.state.username, "Username")){return false}
    else if (!this.testingOK(this.state.password, "Password")){return false}
    else if (this.state.phone.length < 10 || this.state.phone.length > 11){
      this.sendAlert("Warning","Please enter valid Malaysian phone number")
      return false;
    }else{return true}
  }

  sendAlert(title, alertMsg){
    Alert.alert(title, alertMsg,[{
        text:"OK",
        onPress:()=>{},
        style:"cancel"
    }])
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ImageBackground source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe8afj_s3VbdfdBbIBBL7rwDMo3uS5M-n_wQ&usqp=CAU'}} style={styles.image}> 
            <View style={{alignSelf:"flex-start"}}>
              <TouchableWithoutFeedback
                onPress={() => {this.props.navigation.navigate('ProfileScreen');
                }}
              >
                <View style ={styles.touch} flexDirection="row">
                  <Ionicons name="arrow-back" size={25} color={'#93FFE8'} />
                  <Text style = {{color:'#F0FFFF',fontWeight:'bold',fontSize:18}}>Back to Profile</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              label={'User Name :'}
              value={this.state.username}
              onChangeText={username => {
                this.setState({username});
              }}
              orientation={'vertical'}
            />
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              label={'User Phone Number :'}
              value={this.state.phone.toString()}
              onChangeText={phone => {
                this.setState({phone});
              }}
              keyboardType={'numeric'}
              orientation={'vertical'}
            />
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              label={'User Password :'}
              value={this.state.password}
              onChangeText={password => {
                this.setState({password});
              }}
              secureTextEntry={true}
              orientation={'vertical'}
            />
            <Text></Text>
            <TouchableOpacity 
            onPress={()=>{ 
              this._checkChange()
              this._validation()
              console.log(this.state.change)
              if (this._validation() && this._checkChange()){
                Alert.alert("Confirmation", "Are you sure to edit your details?",[{
                  text:'Yes',
                  onPress:()=>this._update(),
                  style:'default'
                },{
                  text:'No',
                  onPress:()=>{},
                  style:'cancel'
                }])
              } else {
                this.sendAlert("Error", "No changes made")
              };
            }}>
              <View style ={styles.button}>
                <Text style ={styles.buttontext}> Save </Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
        flex:1,
        flexDirection:'column',
        backgroundColor: '#F0FFFF',
        borderRadius: 40,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        padding:1,
      },
  TextLabel: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    color:'#8B008B',
  },

  TextInput: {
    fontSize: 18,
    color: 'black',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    
  },
  image: {
    flex: 1,
    resizeMode:"cover",
    height: screenHeight,
    width: screenWidth,
  },
  button: {
    height:30,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#9400D3',
    borderRadius:15,
  },
  buttontext:{
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:18,
    textAlign: 'center',
    color: '#DCD0FF',
  },
  touch: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#00BFFF',
    borderRadius: 10,
    width:150,
  }
});
