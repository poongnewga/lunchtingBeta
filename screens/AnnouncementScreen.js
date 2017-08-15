import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class AnnouncementScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '공지사항',
      headerRight: (
       <View></View>
      ),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          
        </Text>
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

export {AnnouncementScreen};
