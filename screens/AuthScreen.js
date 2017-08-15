import React from 'react';
import { Keyboard, Dimensions, StyleSheet, Text, View, Image, Animated,
Platform, TouchableOpacity, Linking, TextInput, ActivityIndicator } from 'react-native';
import { Gradation, TouchButton, AppLoadingIcon } from '../components';
import AppIcon from '../assets/loading-icon.png';
import Logo from '../assets/big_logo_coral.png'
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { AppLoading, Notifications } from 'expo';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import registerForPushNotifications from '../services/push_notifications';

class AuthScreen extends React.Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '로그인',
      header: null,
      headerRight: (
       <View></View>
      ),
    }
  }

  constructor(props) {
    super(props);
    this.logoWidth = new Animated.Value(0.5 * WIDTH);
    this.footerPadding = new Animated.Value(0);
    // this.titleOpacity = new Animated.Value(1.0);

    this.iconOpacity = new Animated.Value(1.0);
    props.enrollLogoutFunction(props.navigation);
  }

  componentWillMount () {
    // 앱 시작 시 푸쉬 토큰을 확인함. 없다면 사용자에게 푸쉬 토큰 허용을 요청함. 거절시 false 리턴.
    registerForPushNotifications().then((token)=>{this.push_token = token;});

    console.log('will mount');
    if (this.props.user_token == null) {
      this.props.getLunchtingToken(this.props.navigation.navigate);
    }

    if (Platform.OS == 'android') {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    } else {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
    }
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    Animated.parallel([Animated.timing(this.logoWidth, {
      toValue: 0.3 * WIDTH,
      duration: 250
    }),
    Animated.timing(this.footerPadding, {
      toValue: 0.5 * WIDTH,
      duration: 250
    })]).start();
  }
  _keyboardDidHide = (e) => {
    Animated.parallel([Animated.timing(this.logoWidth, {
      toValue: 0.5 * WIDTH,
      duration: 250
    }),
    Animated.timing(this.footerPadding, {
      toValue: 0,
      duration: 250
    })]).start();
  }

  componentDidMount() {
    console.log('컴포넌트 마운트 완료시 TOKEN: ', this.props.user_token);
    // Animated.loop(
    //   Animated.sequence([
    //     Animated.timing(this.titleOpacity, {
    //       toValue: 0,
    //       duration: 1000,
    //       delay: 100
    //     }),
    //     Animated.timing(this.titleOpacity, {
    //       toValue: 1,
    //       duration: 1000,
    //       delay: 25
    //     })
    //   ])).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(this.iconOpacity, {
            toValue: 0,
            duration: 1000,
            delay: 100
          }),
          Animated.timing(this.iconOpacity, {
            toValue: 1,
            duration: 1000,
            delay: 25
          })
        ])).start();

  }

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  }

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  }

  doLogin = () => {
    Keyboard.dismiss();
    this.props.doingLogin(this.props.email, this.props.password, this.props.navigation.navigate, this.push_token);
  }

  signUpWithCard = () => {
    this.props.navigation.navigate('signup');
  }

  renderLoginButton = () => {
    if (this.props.loading == true) {
      return (
        <View style={{marginBottom: 10, marginTop: 10, width:"80%",
          height:40, backgroundColor:'#fc5a5a', borderRadius:6,
          justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'white'} size={'small'} />
        </View>
      );
    } else {
      return (
        <TouchButton onPress={this.doLogin}
          style={{marginBottom: 10, marginTop: 10}} btnWidth={"80%"} btnHeight={40} btnColor={"#f46958"}>
          <Text style={{color: 'white', fontSize: 20}}>로그인</Text>
        </TouchButton>
      );
    }
  }

  render() {
    // TODO toke==null, 즉 아직 토큰을 확인조차 안해봤을 경우에는 로딩창을 띄운다. 스타일링 필요
    if (this.props.user_token == null) {
      return (
        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: 70, height: 70 }}>
            <Animated.Image style={{width: '100%', height: '100%', resizeMode: 'contain', opacity: this.iconOpacity}} source={AppIcon} />
          </View>
        </View>
      )
    }
    return (


      // 로그인 메인 그라데이션 배경
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        {/* 로고 */}
        {/* <View style={styles.logobox}>
          <Animated.Image style={styles.logo} source={Logo} />
        </View> */}
        <Animated.Image style={{width: this.logoWidth, height: this.logoWidth, }} source={Logo} />

        {/* Form 태그 */}
        <View style={[styles.inputform, styles.errorform]}>
          <Text style={[{ backgroundColor: 'rgba(0,0,0,0)', fontSize: 20, color: 'red'}]}>{this.props.error}</Text>
        </View>

        <View style={styles.inputform}>
          <TextInput placeholderTextColor="#a2a2a2" value={this.props.email}
            selectionColor={"#a2a2a2"}
            autoCapitalize={'none'} onChangeText={this.onEmailChange} returnKeyType="done"
            autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
            autoFocus={false} keyboardType="email-address" placeholder="닉네임" style={styles.tinput}
          />
        </View>
        <View style={styles.inputform}>
          <TextInput placeholderTextColor="#a2a2a2" value={this.props.password} returnKeyType="done"
            selectionColor={"#a2a2a2"}
            onChangeText={this.onPasswordChange} underlineColorAndroid={"rgba(0,0,0,0)"}
            secureTextEntry={true} placeholder="비밀번호" style={styles.tinput}
          />
        </View>

        {this.renderLoginButton()}

        <TouchButton onPress={this.signUpWithCard} style={styles.inputform} btnWidth={"80%"} btnHeight={40} btnColor={"white"}>
          <Text style={{color: '#f46958', fontSize: 20}}>명함으로 회원가입</Text>
        </TouchButton>

        <Animated.View style={{width: "100%", height: this.footerPadding}}>

        </Animated.View>

      </View>

    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  // 로고 시작
  logobox: {
    width: 300,
    height: 300,
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: this.logoWidth,
    height: this.logoHeight,
    resizeMode: 'contain',
  },
  // 인풋 폼
  inputform: {
    width: '80%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fc5a5a',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 10
  },
  errorform: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0)'
  },
  tinput: {
    color: 'black',
    fontSize: 15,
    paddingLeft: 30,
    width: '100%',
    height: 40,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    user_token: state.auth.user_token,
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedAuthScreen = connect(mapStateToProps, actions)(AuthScreen);

export { connectedAuthScreen };
