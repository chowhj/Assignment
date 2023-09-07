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
            password:"",
            signedin: false,
        };
        this.db = SQLite.openDatabase({
            name: 'users.db',
            createFromLocation: '~users.db'
        },
        this.openCallBack,
        this.errorCallBack
        );
    }

    componentDidMount(){
        this.setState({
            username: "",
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

    queryByUsername(){
        this.db.transaction(tx=>
            tx.executeSql("SELECT * FROM users WHERE username=?",[this.state.username], (tx,results)=>{
                if (results.rows.length && results.rows.item(0).password == this.state.password){
                    this.setState({
                        password: "",
                        signedin: true
                    });
                    console.log(this.state.username, " login success");
                    this.props.navigation.navigate("HomeScreen",{
                        username:this.state.username,
                        signedin:this.state.signedin
                    })
                }else{
                    console.log("login failed");
                    this.setState({
                        password: "",
                    });
                    this.sendAlert("Wrong username or password")
                };
            }, Error=>{console.log(Error)}),
        )
    }
    login(){
        if (this.state.username == "")
            {this.sendAlert("Username cannot be empty")
        }else if (this.state.password == "")
            {this.sendAlert("Password cannot be empty")
        }else{
            this.queryByUsername()
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
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        onChangeText={user => this.setState({username:user})}>
                    </TextInput>
                </View>
                <Text> {this.state.user} </Text>
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={password =>
                        this.setState({password:password})
                    }></TextInput>
                </View>

                <View>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>this.login()}>
                    <Text style={styles.loginText}>LOGIN</Text> 
                </TouchableOpacity>
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
        fontSize:30,
        marginBottom: 30,
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
        marginTop: 40,
        backgroundColor: "#FF1493",
      },
    loginText:{
        fontWeight:"bold",
        fontSize:20,
        color:"white",
    }
})