import React, {Component} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert,
    LogBox} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
let config = require('../Config');
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            password:"",
        };
        this.resetData=this.resetData.bind(this)
    }
    
    componentDidMount(){this.resetData()}

    resetData(){
        this.setState({
            username: "",
            email:"",
            password: "",
        });
    }

    queryByEmail(){
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
                if (user && user.password == this.state.password){
                    this.setState({
                        username: user.username,
                    })
                    console.log(user.username, " login success")
                    this.props.navigation.navigate("Drawer",{
                        username: this.state.username,
                        email: this.state.email,
                        resetData: this.resetData,
                        }
                    )
                }else {
                    console.log("Login failed")
                    this.setState({
                        password:"",
                    })
                    this.sendAlert("Wrong email or password")
                }
            }).catch(error => {console.log(error)})
        }

    login(){
        if (this.state.email == "")
            {this.sendAlert("Email cannot be empty")
        }else if (this.state.password == "")
            {this.sendAlert("Password cannot be empty")
        }else{
            this.queryByEmail()
        }
    }

    sendAlert(alertMsg){
        Alert.alert("Warning", alertMsg,[{
            text:"OK",
            onPress:()=>{},
            style:"cancel"
        }])
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}> Superstar Villa Hotel Resort Booking App</Text>
                <Text style={styles.loginTitle}>Login to continue</Text>
                <View style={styles.inputView}>
                    <TextInput style={{fontSize:18}}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => this.setState({email:email})}
                        value={this.state.email}>
                    </TextInput>
                </View>
                <Text> {this.state.user} </Text>
                <View style={styles.inputView}>
                    <TextInput style={{fontSize:18}}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password:password})}
                        value={this.state.password}
                    ></TextInput>
                </View>

                <View>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>this.login()}>
                    <Text style={styles.loginText}>LOGIN</Text> 
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:18}}>Don't have an account? </Text>
                    <Text style={[styles.signupText,{fontSize:18}]}
                        onPress={()=>this.props.navigation.navigate("SignupScreen",{
                            resetData:this.resetData
                        })}>Sign up now
                    </Text>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D5FFD0",
        alignItems: "center",
        justifyContent: "center",
      },
    title:{
        fontSize:45,
        fontWeight:'900',
        color: 'darkblue',
        textAlign: 'center',
        marginBottom: 50,
    },
    loginTitle:{
        fontSize:30,
        marginBottom: 30,
        color: 'indigo',
        fontWeight: "bold"
    },
    inputView:{
        backgroundColor: "#40F8FF",
        borderRadius:30,
        alignItems:'center',
        width: "70%",
        height: 45,
    },
    loginBtn: {
        width: 150,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        margin: 40,
        backgroundColor: "#ace737",
      },
    loginText:{
        fontWeight:"bold",
        fontSize:25,
        color:"#3D6B55",
    },
    signupText:{
        color:'blue'
    }
})