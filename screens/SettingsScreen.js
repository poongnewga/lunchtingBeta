import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class SettingsScreen extends Component {

  state = {
    recommendOn : false,
    pushOn : false,
  }

  static navigationOptions = ({navigation}) => {

    return {
      title: 'Settings',
      headerRight: (
       <View></View>
      ),
    }
  }

  goAnnouncement = () => {
    this.props.navigation.navigate('announce');
  };
  goAgreement = () => {
    this.props.navigation.navigate('agreement');
  };
  goPersonalData = () => {
    this.props.navigation.navigate('personaldata');
  }
  goFAQ = () => {
    this.props.navigation.navigate('faq');
  }
  goInquiry = () => {
    this.props.navigation.navigate('inquiry');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.settingMenu, { borderTopWidth: 2, borderColor: '#ebebeb',}]}>
          <View style={styles.settingIcon}>
            <FontAwesome name="volume-up" size={25} color="#f46958" />
          </View>
          <View style={styles.settingSubmenu}>
            <Text style={styles.settingFont}>공지사항</Text>
          </View>
          <View style={styles.settingSubLink}>
            <TouchableOpacity onPress={this.goAnnouncement} style={styles.linkBox}>
              <FontAwesome name="chevron-right" size={25} color="#f46958" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={this.goAgreement}  style={styles.settingMenu}>
          <View style={styles.settingIcon}>
            <FontAwesome name="file-text-o" size={25} color="#f46958" />
          </View>
          <View style={styles.settingSubmenu}>
            <Text style={styles.settingFont}>서비스 이용약관</Text>
          </View>
          <View style={styles.settingSubLink}>
            <TouchableOpacity onPress={this.goAgreement} style={styles.linkBox}>
              <FontAwesome name="chevron-right" size={25} color="#f46958" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.settingMenu}>
          <View style={styles.settingIcon}>
            <FontAwesome name="info-circle" size={25} color="#f46958" />
          </View>
          <View style={styles.settingSubmenu}>
            <Text style={styles.settingFont}>개인정보 취급 방침</Text>
          </View>
          <View style={styles.settingSubLink}>
            <TouchableOpacity onPress={this.goPersonalData} style={styles.linkBox}>
              <FontAwesome name="chevron-right" size={25} color="#f46958" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingMenu}>
          <View style={styles.settingIcon}>
            <FontAwesome name="thumbs-o-up" size={25} color="#f46958" />
          </View>
          <View style={styles.settingSubmenu}>
            <Text style={styles.settingFont}>추천 알림</Text>
          </View>
          <View style={styles.settingSubLink}>
            <View style={styles.linkBox}>
              <Switch thumbTintColor={"#f46958"} value={this.state.recommendOn} disabled={false} onValueChange={(value) => this.setState({recommendOn: value})}/>
            </View>
          </View>
        </View>
        <View style={styles.settingMenu}>
          <View style={styles.settingIcon}>
            <FontAwesome name="bell-o" size={25} color="#f46958" />
          </View>
          <View style={styles.settingSubmenu}>
            <Text style={styles.settingFont}>푸쉬 알림</Text>
          </View>
          <View style={styles.settingSubLink}>
            <View style={styles.linkBox}>
              <Switch thumbTintColor={"#f46958"} value={this.state.pushOn} disabled={false} onValueChange={(value) => this.setState({pushOn: value})}/>
            </View>
          </View>
        </View>
        <View style={styles.settingMenu}>
          <View style={styles.settingIcon}>
            <FontAwesome name="question-circle-o" size={25} color="#f46958" />
          </View>
          <View style={styles.settingSubmenu}>
            <Text style={styles.settingFont}>자주 묻는 질문(FAQ)</Text>
          </View>
          <View style={styles.settingSubLink}>
            <TouchableOpacity onPress={this.goFAQ} style={styles.linkBox}>
              <FontAwesome name="chevron-right" size={25} color="#f46958" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingMenu}>
          <View style={styles.settingIcon}>
            <FontAwesome name="commenting-o" size={25} color="#f46958" />
          </View>
          <View style={styles.settingSubmenu}>
            <Text style={styles.settingFont}>1:1 문의</Text>
          </View>
          <View style={styles.settingSubLink}>
            <TouchableOpacity onPress={this.goInquiry} style={styles.linkBox}>
              <FontAwesome name="chevron-right" size={25} color="#f46958" />
            </TouchableOpacity>
          </View>
        </View>
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

export {SettingsScreen};
