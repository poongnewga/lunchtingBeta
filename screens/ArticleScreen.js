import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Platform, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import LikeButton from '../assets/btn_like.png';
import CommentButton from '../assets/btn_comment.png';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Title from '../assets/title_logo.png';
const DEVICE_WIDTH = Dimensions.get('window').width;

class ArticleScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '게시글',
      header: Platform.OS == 'android' ? (<View style={{width: '100%', height:0, backgroundColor: '#ffffff'}}></View>) : (<View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>),
      headerRight: (
       <View></View>
      ),
    }
  }


  render() {

    return (
      <View style={styles.container}>
        {Platform.OS == 'android' ?
          <StatusBar
           translucent={false}
           backgroundColor="#000000"
           barStyle="light-content"
         /> :
         <StatusBar
          translucent={false}
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
        />
        }
        <View style={{width: DEVICE_WIDTH, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('home')}} style={{width: '20%', height: '100%', paddingLeft: DEVICE_WIDTH * 0.05, justifyContent: 'center'}}>
            <FontAwesome size={40} color={"#fc5a5a"} name="angle-left" />
          </TouchableOpacity>
          <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
          </View>
          <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

          </View>
        </View>
        <View style={{flex: 1, width: DEVICE_WIDTH, height: DEVICE_WIDTH * 3, justifyContent: 'flex-start'}}>
           <ScrollView>
             <View style={{width: DEVICE_WIDTH, height: DEVICE_WIDTH * 3, justifyContent: 'flex-start'}}>
               <Image style={{width: DEVICE_WIDTH,height: DEVICE_WIDTH * 3, resizeMode: 'cover'}} source={{uri : this.props.navigation.state.params.uri}}/>
               {/* <Image style={{width: '100%', resizeMode: 'contain'}} source={{uri : "http://lunchlunch-whehdrms.c9users.io/images/ks_card2.png"}}/> */}

             </View>
           </ScrollView>
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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


const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    user: state.auth.user_token,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedArticleScreen  = connect(mapStateToProps, actions)(ArticleScreen);

export { connectedArticleScreen };
