import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, Image, View, TouchableOpacity, WebView, ActivityIndicator } from 'react-native';
import CameraLogo from '../assets/signup_camera.png';
import { TouchButton } from '../components';
import { FontAwesome } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CardScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '명함 전송',
      headerRight: (
       <View></View>
      ),
    }
  }

  state = {
    image: null,
    sending: false,
    loading: false,
    result: null,
    cardError: "",
    sended: false,
  };

  cardSend = () => {
    if (this.state.image == null) {
      this.setState({cardError: "명함 사진이 반드시 필요합니다."});
      return false;
    }
    if (this.state.sended == true) {
      this.setState({cardError: "이미 명함을 전송하셨습니다."});
      return false;
    }
    // // this.setState({image: null});
    // setTimeout(()=>{ this.props.navigation.navigate('cardsend'); }, 1000);
    this.setState({loading: true});
    let formdata = new FormData();

    formdata.append("nickname", this.props.sign_nickname);
    formdata.append("password", this.props.sign_password);
    formdata.append("gender", this.props.sign_gender);
    formdata.append("age", this.props.sign_age);
    formdata.append("card", {
      uri: this.state.image,
      type: 'image/jpg',
      name: `card.jpg`,
    });




    // 주소 변경 필요
    fetch('https://www.lunchting.com/app/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
    })
    .then((res) => res.json())
    .then((resJSON) => {
      if (resJSON.status === "ok") {
        console.log(resJSON);
        console.log(resJSON.msg);
        this.setState({loading: false});
        this.setState({sended: true});
        this.props.navigation.navigate('cardsend');
      } else {
        console.log('뭔가 에러 발생')
      }
    })
    .catch((error) => {
      console.log('진짜 에러 발생')
      console.log(error);
    })


  }

  _pickImage = async () => {
    this.setState({cardError: ""});
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [8, 5],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      console.log(result.uri);
    }
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.card}>

        <View style={{width: DEVICE_WIDTH * 0.9, minHeight: DEVICE_WIDTH * 0.9, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', padding: 20}}>
          <View>
            <Text style={{fontSize: 18, color: '#303030'}}>명함을 인증해주세요.</Text>
          </View>

          <TouchableOpacity onPress={this._pickImage} style={{width: '100%', marginTop: 20, height: 200, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center'}}>
            {/* <View style={{width: '100%'}}>
              <View style={{width: DEVICE_WIDTH * 0.35, height: DEVICE_WIDTH * 0.3}}>
                <Image source={CameraLogo} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
              </View>
              <View style={{marginTop: 15}}>
                <Text style={{fontSize: 12, color: '#535353'}}>터치해서 명함 사진을 찍어주세요.</Text>
              </View>
            </View> */}
            {image == null ? (
              <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: DEVICE_WIDTH * 0.35, height: DEVICE_WIDTH * 0.3}}>
                  <Image source={CameraLogo} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                </View>
                <View style={{marginTop: 15}}>
                  <Text style={{fontSize: 12, color: '#535353'}}>터치해서 명함 사진을 찍어주세요.</Text>
                </View>
              </View>
            ) : (
              <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={{ uri: image }} style={{ height: '100%', width: "100%", resizeMode: "contain" }} />
              </View>
            )}
          </TouchableOpacity>

          <View style={{marginTop: 10, width: '100%', alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: '#535353'}}>* 회사, 이름, 이메일이 잘 나오도록 찍어주세요.</Text>
          </View>
        </View>

        {this.state.loading == false ? (
          <TouchButton onPress={this.cardSend}
            style={{marginBottom: 10, marginTop: 10}} btnWidth={"90%"} btnHeight={30} btnColor={"#f46958"}>
            <Text style={{color: 'white', fontSize: 14}}>명함 인증하기</Text>
          </TouchButton>
        ) : (
          <View style={{width: '90%', height: 30, marginBottom: 10, marginTop: 10, backgroundColor: '#f46958',borderRadius: 6, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color={'white'} />
          </View>
        )}
        <View style={{height: 30, width: '100%',alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: '#303030'}}>{this.state.loading == true ? ("명함을 전송중입니다...") : ("")}</Text>
          <Text style={{fontSize: 14, color: '#fc5a5a'}}>{this.state.cardError}</Text>
        </View>
      </View>
    )
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  card: {
    flex: 1,
    // backgroundColor: "#ebebeb",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },

  bcard: {
    width: DEVICE_WIDTH * 0.8,
    height: DEVICE_WIDTH * 0.8,
    backgroundColor: "#ebebeb",
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    user_token: state.auth.user_token,
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    error: state.auth.error,

    sign_nickname: state.auth.sign_nickname,
    sign_password: state.auth.sign_password,
    sign_password_check: state.auth.sign_password_check,
    sign_gender: state.auth.sign_gender,
    sign_age: state.auth.sign_age,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedCardScreen = connect(mapStateToProps, actions)(CardScreen);

export { connectedCardScreen };
