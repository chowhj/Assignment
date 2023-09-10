import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WebSocket from 'react-native-websocket';

class MyWebSocketComponent extends Component {
  componentDidMount() {
    const socket = new WebSocket('ws://localhost:3000');
  }

  render() {
    return (
      <View>
        <Text>WebSocket Example</Text>
      </View>
    );
  }
}

export default MyWebSocketComponent;
