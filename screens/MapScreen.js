import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';

class MapScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>DECK</Text>
        <Text>DECK</Text>
        <Text>DECK</Text>
        {/* <MapView style={{flex: 1}} /> */}
      </View>
    )
  }
}

export { MapScreen };
