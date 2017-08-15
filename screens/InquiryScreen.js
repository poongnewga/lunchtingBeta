import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class InquiryScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '1:1 문의',
      headerRight: (
       <View></View>
      ),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>1:1 문의</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingMenu: {
    width: '100%',
    height: 50,

    borderBottomWidth: 2,
    borderColor: '#ebebeb',
    flexDirection: 'row',
  },
  settingIcon: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingSubmenu: {
    flex:6,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  settingSubLink: {
    flex:2,
    justifyContent: 'center'
  },
  linkBox: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    paddingLeft: 20
  },
  settingFont: {
    fontSize: 16
  }
});

export {InquiryScreen};
