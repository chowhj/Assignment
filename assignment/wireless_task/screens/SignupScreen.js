import React, {Component} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
let SQLite = require('react-native-sqlite-storage');
let config = require('../Config')

export default class SignupScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            email:"",
            phoneNumber:"",
            confirm:false,
            tempData:"",
        }
    }
    componentDidMount(){
        this.setState({
            username:"",
            password:"",
            email:"",
            phoneNumber:"",
            confirm:false,
            tempData:"",
        });
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

    _insertDB(){
        let url = config.settings.serverPath + "/api/users";
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.phoneNumber,
                createDate: new Date()
            })
        }).then(response =>{
            if (!response.ok){
                this.sendAlert("Error", response.status.toString());
                throw Error('Error' + response.status)
            }
            return response.json();
        }).then(responseJSON=> {
            if (responseJSON.affected > 0){
                Alert.alert("Success","You have signed up successfully. Please use the username and email to login");
            }else{
                Alert.alert('Error saving record')
            }
            this.props.route.params.resetData();
            this.props.navigation.goBack();
        }).catch(error => {console.log(error)})
    }

    validation(){
        let url = config.settings.serverPath + '/api/users/' + this.state.email
        fetch(url)
        .then(response=> {
            if (!response.ok){
                Alert.alert('Error', response.status.toString());
                throw Error('Error ' + response.status)
            }
            return response.json();
        }).then(user => {
            if (user){
                this.sendAlert("Warning","This.email has been signed up");
            }else if (!this.state.username || !this.state.password || !this.state.email || !this.state.phoneNumber){
                this.sendAlert("Warning","Please fill up all fields")
            }else if (!this.testingOK(this.state.username, "Username")){
            }else if (!this.testingOK(this.state.password, "Password")){
            }else if (this.state.phoneNumber.length < 10 || this.state.phoneNumber.length > 11){
                this.sendAlert("Warning","Please enter valid Malaysian phone number")
            }else if (!this.emailTestOK(this.state.email)){
                this.sendAlert("Warning","Please enter a valid email address")
            }else{this.setState({confirm:true})}
        }).catch(error => console.log(error))
    }

    sendAlert(title, alertMsg){
        Alert.alert(title, alertMsg,[{
            text:"OK",
            onPress:()=>{},
            style:"cancel"
        }])
    }

    confirmationRender(){
        return(
            <View style={styles.container}>
                <Text style={styles.textTitle}>Confirm your details</Text>
                <View style={[styles.confirmView,{flexDirection:'row'}]}>
                    <Text style={[styles.confirmDetails,{color:'dimgrey'}]}>Username: </Text>
                    <Text style={[styles.confirmDetails,{fontWeight:'500',color:'black'}]}>{this.state.username}</Text>
                </View>
                <View style={[styles.confirmView,{flexDirection:'row'}]}>
                    <Text style={[styles.confirmDetails,{color:'dimgrey'}]}>Email: </Text>
                    <Text style={[styles.confirmDetails,{fontWeight:'500',color:'black'}]}>{this.state.email}</Text>
                </View>            
                <View style={[styles.confirmView,{flexDirection:'row'}]}>
                    <Text style={[styles.confirmDetails,{color:'dimgrey'}]}>Phone Number: </Text>
                    <Text style={[styles.confirmDetails,{fontWeight:'500',color:'black'}]}>{this.state.phoneNumber}</Text>
                </View>
                <Text style={{fontSize:20,marginTop:30,color:"red"}}>Re-enter your password to confirm</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputStyle}
                        ref = {input => {this.reenterpw = input}}
                        placeholder='Re-enter password'
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(pw)=>this.setState({tempData:pw})}
                    />
                </View>
                <View style={{marginTop:15,flexDierction:'row'}}>
                    <TouchableOpacity style={[styles.confirmBtn,{backgroundColor:"skyblue"}]} onPress={()=>{
                        if (this.state.tempData == this.state.password){this._insertDB()}
                        else{
                            this.sendAlert("Warning","Password is not the same")
                            this.reenterpw.clear()
                        }
                    }}>
                        <Text style={[styles.ButtonText, {color:"blue"}]}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.confirmBtn,{backgroundColor:"red"}]} onPress={()=>{
                        this.setState({confirm:false})
                    }}>
                        <Text style={[styles.ButtonText, {color:"white"}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    inputRender(){
        return(
            <View style={[styles.container,{margin: 10, borderRadius:10, borderWidth:8, borderColor:"#6B44B6" ,backgroundColor:"#44D7BF"}]}>
                <Text style={styles.textTitle}>Sign Up</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputStyle}
                        placeholder="Username"
                        placeholderTextColor="grey"
                        onChangeText={(username)=>this.setState({username:username})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputStyle}
                        placeholder="Password"
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                        onChangeText={(password)=>this.setState({password:password})}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputStyle}
                        placeholder="Email"
                        placeholderTextColor="grey"
                        onChangeText={(email)=>this.setState({email:email})}
                        value={this.state.email}
                    />  
                </View>  
                <View style={[styles.inputView,{marginBottom:30}]}>
                    <TextInput style={[styles.inputStyle]}
                        placeholder="Phone number"
                        placeholderTextColor="grey"
                        onChangeText={(phoneNumber)=>this.setState({phoneNumber:phoneNumber})}
                        value={this.state.phoneNumber}
                    />
                </View>               
                <View style={{flexDirection:'row',marginBottom: 15}}>
                <TouchableOpacity style={[styles.confirmBtn,{backgroundColor:'#3DF72E',borderColor:'#1F7918',borderWidth:3}]}
                    onPress={()=>{
                        if (!this.state.email){this.sendAlert("Warning","Please fill up all fields")}
                        else{this.validation()}
                    }}>
                    <Text style={[styles.ButtonText,{color:'blue'}]}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.confirmBtn,{backgroundColor:'#F43333',borderColor:'#F9573D',borderWidth:3}]}
                    onPress={()=>{
                        this.props.route.params.resetData()
                        this.props.navigation.popToTop()}}>
                    <Text style={[styles.ButtonText,{color:'yellow'}]}>Cancel</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View style={{ flex:1, justifyContent:'center'}}>
                {this.state.confirm? this.confirmationRender(): this.inputRender()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    ButtonText:{
        fontSize:25,
        textAlign:'center',
        fontWeight:'bold',
    },
    inputStyle:{
        fontSize:20,
        textAlign:'center',
    },
    inputView:{
        backgroundColor: "#B3FEE2",
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        width: 300,
        height: 45,
        margin:10
    },
    confirmBtn:{
        borderRadius: 30,
        width:130,
        height:45,
        justifyContent:'center',
        margin:5
    },
    textTitle:{
        fontSize:40,
        fontWeight:"800",
        color:'black',
        margin: 12
    },
    confirmView:{
        margin: 5,
    },
    confirmDetails:{
        fontSize:20,
        textAlign: "left"
    }
})