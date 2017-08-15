import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class FAQScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '자주 묻는 질문(FAQ)',
      headerRight: (
       <View></View>
      ),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>FAQ</Text>
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

export {FAQScreen};
