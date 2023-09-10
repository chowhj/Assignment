import React, { Component } from "react";
import { Text, View, Image, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { RefreshControl } from "react-native";

const roomData = {
  deluxeBeachfront: [
  {
    id: 1,
          roomNumber: "DB1",
          name: "Deluxe Room 1",
          image: require("../img/deluxe-room1.jpg"),
          price: "RM200",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 2,
          roomNumber: "DB2",
          name: "Deluxe Room 2",
          image: require("../img/deluxe-room2.jpg"),
          price: "RM200",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 3,
          roomNumber: "DB3",
          name: "Deluxe Room 3",
          image: require("../img/deluxe-room3.jpg"),
          price: "RM200",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 4,
          roomNumber: "DB4",
          name: "Deluxe Room 4",
          image: require("../img/deluxe-room4.jpg"),
          price: "RM200",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 5,
          roomNumber: "DB5",
          name: "Deluxe Room 5",
          image: require("../img/deluxe-room5.jpg"),
          price: "RM200",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 6,
          roomNumber: "DB6",
          name: "Deluxe Room 6",
          image: require("../img/deluxe-room6.jpg"),
          price: "RM200",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
      ],
      doubleDeluxeChalets: [
        {
          id: 1,
          roomNumber: "DD1",
          name: "Double Deluxe Room 1",
          image: require("../img/double-deluxe-room1.jpg"),
          price: "RM300",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 2,
          roomNumber: "DD2",
          name: "Double Deluxe Room 2",
          image: require("../img/double-deluxe-room2.jpg"),
          price: "RM300",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 3,
          roomNumber: "DD3",
          name: "Double Deluxe Room 3",
          image: require("../img/double-deluxe-room3.jpg"),
          price: "RM300",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 4,
          roomNumber: "DD4",
          name: "Double Deluxe Room 4",
          image: require("../img/double-deluxe-room4.jpg"),
          price: "RM300",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 5,
          roomNumber: "DD5",
          name: "Double Deluxe Room 5",
          image: require("../img/double-deluxe-room5.jpg"),
          price: "RM300",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 6,
          roomNumber: "DD6",
          name: "Double Deluxe Room 6",
          image: require("../img/double-deluxe-room6.jpg"),
          price: "RM300",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
      ],
      spaciousBayviewWithBalcony: [
        {
          id: 1,
          roomNumber: "BB1",
          name: "Spacious Bayview With Balcony Room 1",
          image: require("../img/spcacious-bayview-with-balcony-room1.jpg"),
          price: "RM400",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 2,
          roomNumber: "BB2",
          name: "Spacious Bayview With Balcony Room 2",
          image: require("../img/spcacious-bayview-with-balcony-room2.jpg"),
          price: "RM400",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 3,
          roomNumber: "BB3",
          name: "Spacious Bayview With Balcony Room 3",
          image: require("../img/spcacious-bayview-with-balcony-room3.jpg"),
          price: "RM400",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 4,
          roomNumber: "BB4",
          name: "Spacious Bayview With Balcony Room 4",
          image: require("../img/spcacious-bayview-with-balcony-room4.jpg"),
          price: "RM400",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 5,
          roomNumber: "BB5",
          name: "Spacious Bayview With Balcony Room 5",
          image: require("../img/spcacious-bayview-with-balcony-room5.jpg"),
          price: "RM400",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 6,
          roomNumber: "BB6",
          name: "Spacious Bayview With Balcony Room 6",
          image: require("../img/spcacious-bayview-with-balcony-room6.jpg"),
          price: "RM400",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
      ],
      seaDiamondBoutique: [
        {
          id: 1,
          roomNumber: "SDB1",
          name: "Sea Diamond Boutique Room 1",
          image: require("../img/sea-diamond-boutique-room1.jpg"),
          price: "RM500",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 2,
          roomNumber: "SDB2",
          name: "Sea Diamond Boutique Room 2",
          image: require("../img/sea-diamond-boutique-room2.jpg"),
          price: "RM500",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 3,
          roomNumber: "SDB3",
          name: "Sea Diamond Boutique Room 3",
          image: require("../img/sea-diamond-boutique-room3.jpg"),
          price: "RM500",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 4,
          roomNumber: "SDB4",
          name: "Sea Diamond Boutique Room 4",
          image: require("../img/sea-diamond-boutique-room4.jpg"),
          price: "RM500",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 5,
          roomNumber: "SDB5",
          name: "Sea Diamond Boutique Room 5",
          image: require("../img/sea-diamond-boutique-room5.jpg"),
          price: "RM500",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 6,
          roomNumber: "SDB6",
          name: "Sea Diamond Boutique Room 6",
          image: require("../img/sea-diamond-boutique-room6.jpg"),
          price: "RM500",
          occupancy: 4,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
      ],
      seaViewFamily: [
        {
          id: 1,
          roomNumber: "SVF1",
          name: "Sea View Family Room 1",
          image: require("../img/sea-view-family-room1.jpg"),
          price: "RM600",
          occupancy: 5,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 2,
          roomNumber: "SVF2",
          name: "Sea View Family Room 2",
          image: require("../img/sea-view-family-room2.jpg"),
          price: "RM600",
          occupancy: 5,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 3,
          roomNumber: "SVF3",
          name: "Sea View Family Room 3",
          image: require("../img/sea-view-family-room3.jpg"),
          price: "RM600",
          occupancy: 5,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 4,
          roomNumber: "SVF4",
          name: "Sea View Family Room 4",
          image: require("../img/sea-view-family-room4.jpg"),
          price: "RM600",
          occupancy: 5,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 5,
          roomNumber: "SVF5",
          name: "Sea View Family Room 5",
          image: require("../img/sea-view-family-room5.jpg"),
          price: "RM600",
          occupancy: 5,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
        {
          id: 6,
          roomNumber: "SVF6",
          name: "Sea View Family Room 6",
          image: require("../img/sea-view-family-room6.jpg"),
          price: "RM600",
          occupancy: 5,
          isCheckedIn: false,
          isRoomNumberVisible: false,
        },
      ],
    };

    export default class BookingScreen extends Component {
      state = {
        selectedRoomType: "deluxeBeachfront",
        selectedDates: {},
        refreshing: false,
      };
    
      updateRoomStatus = () => {
        const { selectedRoomType } = this.state;
        const rooms = roomData[selectedRoomType];
    
        rooms.forEach((room) => {
          if (!room.isCheckedIn) {
            room.isCheckedIn = Math.random() < 0.5;
          }
        });
    
        this.setState({ refreshing: false });
      };
    
      handleRefresh = () => {
        this.setState({ refreshing: true }, this.updateRoomStatus);
      };
    
      navigateToConfirm = (selectedRoom) => {
        this.props.navigation.navigate("ConfirmScreen", {
          selectedRoom: selectedRoom,
        });
      };
    
      handlePayment = (room, selectedDates) => {
        console.log("handlePayment called");
        const { selectedRoomType } = this.state;
        const rooms = roomData[selectedRoomType];
    
        const selectedRoom = rooms.find((r) => r.id === room.id);
    
        if (selectedRoom) {
          selectedRoom.isRoomNumberVisible = false;
          selectedRoom.isCheckedIn = true;
    
          // You can handle booking or confirmation here if you don't use WebSocket
    
          this.navigateToConfirm(selectedRoom);
        }
      };
    
      renderRooms() {
        const { selectedRoomType, refreshing } = this.state;
        const rooms = roomData[selectedRoomType];
    
        return (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} tintColor="blue" title="Refreshing..." />
            }
          >
            <View style={styles.roomContainer}>
              {rooms.map((room, index) => (
                <View key={room.id} style={styles.roomCard}>
                  <Image source={room.image} style={styles.roomImage} />
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.roomPrice}>Price: {room.price}</Text>
                  <Text style={styles.roomOccupancy}>Occupancy: {room.occupancy} guests</Text>
                  <Text
                    style={[
                      styles.roomStatus,
                      room.isCheckedIn ? styles.roomStatusCheckedIn : styles.roomStatusAvailable,
                    ]}
                  >
                    {room.isCheckedIn ? 'Status: Checked In' : 'Status: Available'}
                  </Text>
                  {room.isRoomNumberVisible && !room.isCheckedIn && (
                    <Text style={styles.roomNumber}>Room Number: {room.roomNumber}</Text>
                  )}
                  {!room.isCheckedIn && (
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={() => {
                        if (!room.isCheckedIn) {
                          this.handlePayment(room, this.state.selectedDates);
                        }
                      }}
                      disabled={room.isCheckedIn} // Ensure this condition is set correctly
                    >
                      <Text style={styles.bookButtonText}>Book</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        );
      }
    
      render() {
        return (
          <View style={styles.container}>
            <Picker
              selectedValue={this.state.selectedRoomType}
              onValueChange={(itemValue) => this.setState({ selectedRoomType: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="Deluxe Beachfront and Ocean Rooms" value="deluxeBeachfront" />
              <Picker.Item label="Double Deluxe Chalets and Spacious" value="doubleDeluxeChalets" />
              <Picker.Item label="Spacious Bayview and Bayview with Balcony" value="spaciousBayviewWithBalcony" />
              <Picker.Item label="Sea Diamond Boutique Rooms" value="seaDiamondBoutique" />
              <Picker.Item label="Sea View Family Rooms" value="seaViewFamily" />
            </Picker>
    
            {this.renderRooms()}
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      heading: {
        fontSize: 25,
        marginVertical: 10,
      },
      picker: {
        width: '100%',
      },
      roomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      roomCard: {
        width: '45%',
        backgroundColor: '#f5f5f5',
        margin: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      roomImage: {
        width: 100,
        height: 100,
      },
      roomName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
      },
      roomPrice: {
        fontSize: 14,
      },
      roomOccupancy: {
        fontSize: 14,
      },
      roomStatus: {
        fontSize: 14,
      },
      roomStatusAvailable: {
        fontSize: 14,
        color: 'green', 
      },
      roomStatusCheckedIn: {
        fontSize: 14,
        color: 'red', 
      },      
      roomNumber: {
        fontSize: 14,
      },
      bookButton: {
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
      },
      bookButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      timerAlert: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999, // Ensure the alert is on top
      },
      timerAlertText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
      },
      timerAlertButton: {
        fontSize: 18,
        color: 'blue',
      },
    });
    