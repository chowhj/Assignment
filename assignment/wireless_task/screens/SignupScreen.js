import React, {Component} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
let SQLite = require('react-native-sqlite-storage');

var flag = false;

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
        this.db = SQLite.openDatabase({
            name:"credentialsdb.db",
            createFromLocation: "~credentialsdb.db"
        },
        this.openCallBack(),
        this.errorCallBack()
        )
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
    openCallBack(){
        console.log("Successfully open the database")
    }
    
    errorCallBack(err){
        console.log("Error " + err)
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
        this.db.transaction(tx=>{
            tx.executeSql("INSERT INTO users(username,password,email,phone,createDate) VALUES (?,?,?,?,?)",[
                this.state.username,
                this.state.password,
                this.state.email,
                this.state.phoneNumber,
                new Date()
            ])
        });
        Alert.alert("Success","You have signed up successfully. Please use the username and email to login",[{
            text: "OK",
            onPress:()=>{
                this.props.route.params.resetData()
                this.props.navigation.goBack();
            }
        }])
    }
    validation(){
        this.db.executeSql("SELECT * FROM users WHERE email=?",[this.state.email],results=>{
            if (results.rows.length == 1){
                this.sendAlert("Warning","This email has been signed up");
            }else if (!this.state.username || !this.state.password || !this.state.email || !this.state.phoneNumber){
                this.sendAlert("Warning","Please fill up all fields")
            }else if (!this.testingOK(this.state.username, "Username")){
            }else if (!this.testingOK(this.state.password, "Password")){
            }else if (this.state.phoneNumber.length < 10 || this.state.phoneNumber.length > 11){
                this.sendAlert("Warning","Please enter valid Malaysian phone number")
            }else if (!this.emailTestOK(this.state.email)){
                this.sendAlert("Warning","Please enter a valid email address")
            }else{this.setState({confirm:true})}
        })
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
                        placeholder='Re-enter password'
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(pw)=>this.setState({tempData:pw})}
                    />
                </View>
                <View style={{marginTop:15,flexDierction:'row'}}>
                    <TouchableOpacity style={[styles.confirmBtn,{backgroundColor:"skyblue"}]} onPress={()=>{
                        if (this.state.tempData == this.state.password){this._insertDB()}
                        else{this.sendAlert("Warning","Password is not the same")}
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
            <View style={styles.container}>
                <Text style={styles.textTitle}>Sign Up Page</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputStyle}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        onChangeText={(username)=>this.setState({username:username})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputStyle}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password)=>this.setState({password:password})}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputStyle}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email)=>this.setState({email:email})}
                        value={this.state.email}
                    />  
                </View>  
                <View style={styles.inputView}>
                    <TextInput style={styles.inputStyle}
                        placeholder="Phone number"
                        placeholderTextColor="#003f5c"
                        onChangeText={(phoneNumber)=>this.setState({phoneNumber:phoneNumber})}
                        value={this.state.phoneNumber}
                    />
                </View>                  
                <TouchableOpacity style={[styles.confirmBtn,{backgroundColor:'lime'}]}
                    onPress={()=>{
                        this.validation();
                    }}>
                    <Text style={[styles.ButtonText,{color:'blue'}]}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.confirmBtn,{backgroundColor:'red'}]}
                    onPress={()=>{
                        this.props.route.params.resetData()
                        this.props.navigation.goBack()}}>
                    <Text style={[styles.ButtonText,{color:'yellow'}]}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render(){
        return(
            <View style={{flex:1, justifyContent:'center'}}>
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
        backgroundColor: "#ffc0cb",
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
        margin: 5,
        marginTop:20
    },
    textTitle:{
        fontSize:35,
        fontWeight:"800",
        color:'blue',
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