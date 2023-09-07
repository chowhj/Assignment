import React, {Component} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Alert} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
let SQLite = require('react-native-sqlite-storage');

export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            password:"",
            signedin: false,
        };
        this.db = SQLite.openDatabase({
            name: 'credentialsdb.db',
            createFromLocation: '~credentialsdb.db'
        },
        this.openCallBack,
        this.errorCallBack
        );
        this.resetData=this.resetData.bind(this)
    }
    
    componentDidMount(){this.resetData()
    }

    resetData(){
        this.setState({
            username: "",
            email:"",
            password: "",
            signedin: false,
        });
    }

    openCallBack(){
        console.log("Successfull open the database")
    }
    
    errorCallBack(err){
        console.log("Error"  + err)
    }

    queryByEmail(){
        this.db.transaction(tx=>
            tx.executeSql("SELECT * FROM users WHERE email=?",[this.state.email], (tx,results)=>{
                if (results.rows.length && results.rows.item(0).password == this.state.password){
                    this.setState({
                        username:results.rows.item(0).username,
                        password: "",
                        signedin: true
                    });
                    console.log(this.state.username, " login success");
                    this.props.navigation.navigate("HomeScreen",{
                        username: this.state.username,
                        email: this.state.email,
                        signedin: this.state.signedin,
                        resetData: this.resetData
                    })
                }else{
                    console.log("login failed");
                    this.setState({
                        password: "",
                    });
                    this.sendAlert("Wrong email or password")
                };
            }, Error=>{console.log(Error)}),
        )
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    loginTitle:{
        fontSize:40,
        marginBottom: 50,
        color: 'blue',
        fontWeight: "bold"
    },
    inputView:{
        backgroundColor: "#ffc0cb",
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
        backgroundColor: "#FF1493",
      },
    loginText:{
        fontWeight:"bold",
        fontSize:20,
        color:"white",
    },
    signupText:{
        color:'blue'
    }
})