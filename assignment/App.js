import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  TouchableNativeFeedbackBase,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AboutScreen from './task/screens/AboutScreen';
import HomeScreen from './task/screens/HomeScreen';
import ProfileScreen from './task/screens/ProfileScreen';
import SettingsScreen from './task/screens/SettingsScreen';
import SignoutScreen from './task/screens/SignoutScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';
LogBox.ignoreLogs (['EventEmitter.removeListener']);

const Drawer = createDrawerNavigator ();
const Tab = createBottomTabNavigator ();

class MyDrawerComponent extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...this.props}
          contentContainerStyle={{backgroundColor: 'skyblue'}}
        >
          <ImageBackground
            source={require ('./task/img/icon.jpeg')}
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
              source={require ('./task/img/hotel.jpeg')}
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
            onPress={() => this.props.navigation.navigate('Signout')}>
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
       <Tab.Navigator initialRouteName={'Setings'}
          screenOptions={{
            tabBarActiveTintColor:'#800080',
            tabBarActiveBackgroundColor:'#ADD8E6',
            tabBarLabelStyle:{
              fontSize:22,
            },
            tabBarStyle:{
              backgroundColor:'silver',
              borderRadius:50
            },
          }}
        >
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="settings-outline" size={20} color={'blue'} />;
              },
            }}
          />
          <Tab.Screen
            name="Signout"
            component={SignoutScreen}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="exit-outline" size={20} color={'blue'} />;
              },
            }}
          />
      </Tab.Navigator>
  )
}

export default class App extends Component {
  render () {
    return (
      <NavigationContainer>
      <Drawer.Navigator initialRouteName={'Home'}
          drawerContent={props => <MyDrawerComponent {...props} />}
          screenOptions={{
            drawerActiveTintColor: 'darkslateblue',
            drawerActiveBackgroundColor: 'skyblue',
            drawerLabelStyle: {
              marginLeft: -24,
              fontFamily: 'EduQLDBeginner-Regular',
            },
          }}
        >
          <Drawer.Screen
            name="About"
            component={AboutScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="information-outline" size={20} color={color} />
              ),
            }} />

          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="home-outline" size={20} color={color} />
              ),
            }} />

          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="man-outline" size={20} color={color} />
              ),
            }} />

          <Drawer.Screen
            name="Others"
            component={MyTab}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name="add-outline" size={20} color={color} />
              ),
            }} />

        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
