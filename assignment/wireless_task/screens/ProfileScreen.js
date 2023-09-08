import React, {Component} from "react";
import {Text,
    View,
    StyleSheet
    } from "react-native";

export default class ProfileScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
            <Text style={{ fontSize:50}}>Profile</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#F0FFFF',
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      alignItems: 'center',
      justifyContent:'flex-start',
      padding:1,
    }
})