import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';

class ReviewScreen extends Component {
  static navigationOptions = ({navigation}) => {

    return {
      title: 'Review Jobs',
      // header: null,
      headerLeft: (<View></View>),
      headerRight: (
       <TouchableOpacity style={{padding: 20}} onPress={()=>{navigation.navigate('settings')}}>
         <Text style={{color: '#f46958', fontSize: 16}}>Settings</Text>
       </TouchableOpacity>
      ),
      // iOS만 적용
      // headerBackTitle: ' ',


    }
  }



  render() {
    return (
      <View>
        <Text> ReviewScreen </Text>
        <Text> ReviewScreen </Text>
        <Text> ReviewScreen </Text>
        <Text> ReviewScreen </Text>
        <Text> ReviewScreen </Text>
        <Text> ReviewScreen </Text>
      </View>
    )
  }
}

export {ReviewScreen};
