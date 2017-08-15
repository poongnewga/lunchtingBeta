import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MapView } from 'expo';

class MeetScreen extends Component {

  state = {
    region: {
      latitude : 37.49705869016147,
      latitudeDelta : 0.01173226770569613,
      longitude : 127.0266611762199,
      longitudeDelta : 0.01000966896782529,
    },

    pin1: {
      "latitude": 37.497365761519056, "longitude": 127.02739521861076
    },
    pin2: {
      "latitude": 37.49570300124481, "longitude": 127.025339640677
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Lunchting',
      tabBarLabel: 'Lunchting',
      headerLeft: (<View></View>),
      headerRight: (
       <TouchableOpacity style={{padding: 20}} onPress={()=>{navigation.navigate('settings')}}>
         <Text style={{fontSize: 20, color: "#f46958"}}>다음</Text>
       </TouchableOpacity>
     ),
      tabBarIcon: ({ tintColor, focused }) => (
      <FontAwesome
        name={'heart'}
        size={25}
        style={{ color: tintColor }}
      />)
    }
  }

  componentDidMount () {
    this.setState({mapLoaded: true});
  }

  onRegionChangeComplete = (region) => {
    console.log(region);
    this.setState({ region });
  }

  onDragPin1 = (e) => {
    console.log(e.nativeEvent.coordinate);
    this.setState({pin1: {...e.nativeEvent.coordinate}})

  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    }


// 4201738803816157
    return (
      <View style={{flex: 1}}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE} rotateEnabled={false} pitchEnabled={false}
          onPress={e => console.log(e.nativeEvent, '클릭했으!')}
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete = {this.onRegionChangeComplete} >

            <MapView.Circle strokeColor={"rgba(93, 149, 239,0.8)"} fillColor={"rgba(93, 149, 239,0.3)"} radius={350} center={this.state.pin2}/>
            <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"} fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.state.pin1}/>
            <MapView.Marker onDrag={ e => this.onDragPin1(e) } draggable pinColor="rgb(244, 105, 88)" title="희햄" description="설명" coordinate={this.state.pin1}/>
            <MapView.Marker draggable pinColor="rgb(93, 149, 239)" title="희순" description="설명" coordinate={this.state.pin2}/>

        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ball: {
    width: 80,
    height: 80,
    backgroundColor: 'black',
    borderRadius: 30
  },
});

export { MeetScreen };
