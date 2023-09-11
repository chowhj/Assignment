import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  Alert,
  SafeAreaView,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import AboutScreen from './wireless_task/screens/AboutScreen';
import HomeScreen from './wireless_task/screens/HomeScreen';
import BookingScreen from './wireless_task/screens/BookingScreen';
import ConfirmScreen from './wireless_task/screens/ConfirmScreen';
import ProfileScreen from './wireless_task/screens/ProfileScreen';
import EditProfile from './wireless_task/screens/EditProfile';
import SettingsScreen from './wireless_task/screens/SettingsScreen';
import SignoutScreen from './wireless_task/screens/SignoutScreen';
import LoginScreen from './wireless_task/screens/LoginScreen';
import SignupScreen from './wireless_task/screens/SignupScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {LogBox} from 'react-native';
LogBox.ignoreLogs (['EventEmitter.removeListener']);
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);



//const Tab = createBottomTabNavigator ();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

class MyDrawerComponent extends Component {
  
  render () {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...this.props}
          contentContainerStyle={{backgroundColor: 'skyblue'}}
        >
          <ImageBackground
            source={require ('./wireless_task/img/hotelicon.jpeg')}
            style={{padding: 10}}
          >
            <Image
              style={{
                alignSelf: 'flex-end',
                width: 64,
                height: 64,
                marginLeft: 20,
                borderRadius: 32,
              }}
              source={require ('./wireless_task/img/hotel.jpeg')}
            />
            <Text
              style={{
                color: '#57FEFF',
                fontFamily: 'Roboto-Medium',
                fontSize: 25,
                alignSelf: 'flex-end',
                marginLeft: 20,
              }}
            >
              Superstar Hotel
            </Text>

            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  marginLeft: 10,
                }}
              >
                1200 Likes
              </Text>
              <Ionicons
                name="thumbs-up-outline"
                color={'#ADF802'}
                style={{marginLeft: 2, top: 2}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  alignSelf: 'flex-start',
                  marginLeft: 10,
                }}
              >
                100 Followers
              </Text>
              <Ionicons
                name="people-outline"
                color={'#ADF802'}
                style={{marginLeft: 2, top: 2}}
              />
            </View>

          </ImageBackground>
          <View style={{backgroundColor: '#fff', flex: 1, paddingTop: 10}}>
            <DrawerItemList {...this.props} />
          </View>
        </DrawerContentScrollView>

        <View style={{padding: 15, borderTopWidth: 1, borderTopColor: 'grey'}}>
        <TouchableOpacity style={{paddingVertical: 10}}
          onPress={() => this.props.navigation.navigate('Settings')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="settings-outline" size={20} />
              <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      fontFamily: 'EduQLDBeginner-Bold',
                    }}
              >
                Settings
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{paddingVertical: 10}}
            onPress={() => {
              Alert.alert("Logging out", "Are you sure you want to log out?",[{
                text:"Yes",
                onPress:()=>{
                  this.props.navigation.navigate("LoginScreen",{signout:true})
                },
                style:'default'
              },{
                text: "No",
                onPress:()=>{},
                style: 'cancel'
              }])
              
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={20} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontFamily: 'EduQLDBeginner-Bold',
                }}
              >
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function MyTab () {
  return (
       <Tab.Navigator 
        initialRouteName={'Settings'}
        barStyle={{ backgroundColor: '#E6E6FA' ,padding: 0 }}
        activeColor='#0000A5'
        inactiveColor='grey'
        shifting='true'
         >

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: () => {
                return <Ionicons name="settings-outline" size={26} color={'#940073'} />
                ;
              },
            }}
          />
 
          <Tab.Screen
            name="Signout"
            component={SignoutScreen}
            options={{
              tabBarLabel:'Sign Out',
              tabBarIcon: () => {
                return <Ionicons name="exit-outline" size={26} color={'#940073'} />;
              },
            }}
          />
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarLabel:'Login',
              tabBarIcon: () => {
                return <Ionicons name="enter-outline" size={26} color={'#940073'} />;
              },
            }}
          />
      </Tab.Navigator>
  )
}

const DrawerNavigator=({route})=>{
  const Drawer = createDrawerNavigator ()
    return(
        <Drawer.Navigator initialRouteName={'Home'}
          drawerContent={props => <MyDrawerComponent {...props} />}
          screenOptions={{
            drawerActiveTintColor: 'darkslateblue',
            drawerActiveBackgroundColor: 'skyblue',
            drawerLabelStyle: {
              marginLeft: -24,
              fontFamily: 'EduQLDBeginner-Regular',
            },
            headerStyle: {
              backgroundColor: '#00008B',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
           // headerRight: () => (
              //<TouchableWithoutFeedback
                  //onPress={() => this.props.navigation.navigate('Home')}>
                  //</NavigationContainer><Ionicons name="arrow-back" size={25} color="#00FFFF" />
              //</TouchableWithoutFeedback>
            //)
          }}
        >
        <Drawer.Screen
            name="Home"
            component={HomeScreen}
            initialParams={route.params}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="home-outline" size={20} color={color} />
              ),
        }} />

        <Drawer.Screen
            name="Profile"
            component={ProfileNav}
            initialParams={route.params}
            options={{
                drawerIcon: ({ color }) => (
                <Icon name="user" size={20} color={color} />
                ),
        }}/>
        <Drawer.Screen
            name="About"
            component={AboutScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="information-outline" size={20} color={color} />
              ),
        }} />

        <Drawer.Screen
            name="Booking"
            component={BookingScreen}
            options={{
                drawerIcon: ({ color }) => (
                <Ionicons name="book-outline" size={20} color={color} />
                ),
        }}/>

        <Drawer.Screen
            name="More"
            component={MyTab}
            options={{
                drawerIcon: ({ color }) => (
                <Ionicons name="add-outline" size={20} color={color} />
                ),
        }} />

        <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                drawerLabel: () => null,
                drawerIcon: () => null,
        }} />

        <Drawer.Screen
            name="Signout"
            component={SignoutScreen}
            options={{
                drawerLabel: () => null,
                drawerIcon: () => null,
                
        }} />
    </Drawer.Navigator>
  )
}

const ProfileNav=({route})=>{
  const Profile=createStackNavigator()
  return(
    <Profile.Navigator initialRouteName='ProfileScreen'>
      <Profile.Screen name='ProfileScreen' component={ProfileScreen} initialParams={route.params} options={{headerTitle: 'Profile',headerShown:false}}/>
      <Profile.Screen name='EditProfile' component={EditProfile} initialParams={route.params} options={{headerTitle: 'Edit Profile',headerShown:false}}/>
    </Profile.Navigator>
  )
}
export default class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreen'>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown:false}}/>

          <Stack.Screen name='Drawer' component={DrawerNavigator} options={{headerShown:false}}/>
          <Stack.Screen name='ConfirmScreen' component={ConfirmScreen} options={{ headerShown: true, title: 'Confirm Reservation' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FFFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    margin: 0,
  },
});