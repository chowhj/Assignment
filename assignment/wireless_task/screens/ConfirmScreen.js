import React, { useState, useEffect } from 'react';
import { Text, View, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ConfirmScreen = ({ route, navigation }) => {
  const { selectedRoom } = route.params;

  const [selectedDates, setSelectedDates] = useState({});
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    calculateTotalCost();
  }, [selectedDates]);

  const handleDateSelect = (date) => {
    if (!selectedDates.startDate || (selectedDates.startDate && selectedDates.endDate)) {
      setSelectedDates({
        startDate: date.dateString,
        endDate: null,
      });
    } else {
      if (new Date(date.dateString) >= new Date(selectedDates.startDate)) {
        setSelectedDates({
          ...selectedDates,
          endDate: date.dateString,
        });
      } else {
        setSelectedDates({
          startDate: date.dateString,
          endDate: null,
        });
      }
    }
  };

  const calculateTotalCost = () => {
    const price = parseFloat(selectedRoom.price.replace('RM', ''));

    if (selectedDates.startDate && selectedDates.endDate) {
      const checkInDate = new Date(selectedDates.startDate);
      const checkOutDate = new Date(selectedDates.endDate);
      const numberOfDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      setNumberOfDays(numberOfDays);
      const cost = price * numberOfDays;
      setTotalCost(cost);
    } else {
      setNumberOfDays(0);
      setTotalCost(0);
    }
  };

  const selectedDateStyle = {
    backgroundColor: 'lightgreen',
    borderRadius: 16,
  };

  const handlePayment = (selectedDates) => {
    navigation.navigate('Payment', {
      totalCost: totalCost,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={selectedRoom.image} style={styles.roomImage} />
      <Text style={styles.roomName}>Room Name: {selectedRoom.name}</Text>
      <Text style={styles.roomPrice}>Price: {selectedRoom.price}</Text>

      <Text style={styles.checkInText}>Check in at 2:00pm, Check out at 12:00pm</Text>

      <Calendar
        onDayPress={(day) => handleDateSelect(day)}
        markedDates={{
          ...selectedDates,
          [selectedDates.startDate]: {
            ...selectedDates.startDate,
            selected: true,
            customStyles: selectedDateStyle,
          },
          [selectedDates.endDate]: {
            ...selectedDates.endDate,
            selected: true,
            customStyles: selectedDateStyle,
          },
        }}
        markingType="custom"
      />

      {selectedDates.startDate && (
        <Text style={styles.dateRangeText}>
          {selectedDates.startDate} - {selectedDates.endDate || 'Select check-out date'}
        </Text>
      )}

      {numberOfDays > 0 && (
        <Text style={styles.numberOfDaysText}>
          {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}
        </Text>
      )}

      {totalCost > 0 && (
        <Text style={styles.totalCostText}>Total Cost: RM{totalCost} </Text>
      )}

      <View style={styles.paymentButtonContainer}>
        <Button
          title="Proceed with payment"
          onPress={() => handlePayment(selectedDates)}
          disabled={totalCost <= 0}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  roomImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roomPrice: {
    fontSize: 16,
    marginBottom: 8,
  },
  checkInText: {
    fontSize: 16,
    marginBottom: 16,
  },
  dateRangeText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
  numberOfDaysText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  totalCostText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentButtonContainer: {
    marginTop: 32,
  },
});

export default ConfirmScreen;
