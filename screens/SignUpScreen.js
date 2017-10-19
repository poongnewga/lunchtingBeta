import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Picker, Platform, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SignUpScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '회원가입',
      headerRight: (
       <View></View>
      ),
    }
  }

  state = {
    sign_nickname_error: '',
    sign_password_error: '',
    sign_gender_error: '',
    sign_agree_error: '',

    checkedNickname: null,
    checkLoading: false,

    sign_agree_all : false,
    sign_agree_privacy: false,
    sign_agree_service: false,
    sign_agree_location: false
  }

  checkAll = () => {
    if (this.state.sign_agree_all == false) {
      this.setState({sign_agree_error: ""});
      this.setState({
        sign_agree_all: true,
        sign_agree_privacy: true,
        sign_agree_service: true,
        sign_agree_location: true
      });
    } else {
      this.setState({
        sign_agree_all: false,
        sign_agree_privacy: false,
        sign_agree_service: false,
        sign_agree_location: false
      });
    }
  }

  togglePrivacy = () => {
    if (this.state.sign_agree_all == true) {
      this.setState({sign_agree_privacy: false, sign_agree_all: false});
      return false;
    }

    if (this.state.sign_agree_service == true && this.state.sign_agree_location == true && this.state.sign_agree_privacy == false) {
      this.setState({sign_agree_error: ""});
      this.setState({sign_agree_privacy: true, sign_agree_all: true});
    } else {
      this.setState({sign_agree_privacy: !this.state.sign_agree_privacy});
    }
  }
  toggleServie = () => {
    if (this.state.sign_agree_all == true) {
      this.setState({sign_agree_service: false, sign_agree_all: false});
      return false;
    }
    if (this.state.sign_agree_privacy == true && this.state.sign_agree_location == true && this.state.sign_agree_service == false) {
      this.setState({sign_agree_error: ""});
      this.setState({sign_agree_service: true, sign_agree_all: true});
    } else {
      this.setState({sign_agree_service: !this.state.sign_agree_service});
    }
  }
  toggleLocation = () => {
    if (this.state.sign_agree_all == true) {
      this.setState({sign_agree_location: false, sign_agree_all: false});
      return false;
    }
    if (this.state.sign_agree_privacy == true && this.state.sign_agree_service == true && this.state.sign_agree_location == false) {
      this.setState({sign_agree_error: ""});
      this.setState({sign_agree_location: true, sign_agree_all: true});
    } else {
      this.setState({sign_agree_location: !this.state.sign_agree_location});
    }
  }

  validateFormAndGoCard = () => {
    if (this.props.sign_nickname == "") {
      this.setState({sign_nickname_error: " 닉네임을 입력해주세요."});
      return false;
    }

    if (this.state.checkedNickname == null) {
      this.setState({sign_nickname_error: " 닉네임 중복확인을 해주세요."});
      return false;
    }

    if (this.state.checkedNickname != this.props.sign_nickname) {
      this.setState({sign_nickname_error: " 닉네임 중복확인을 다시 해주세요."});
      return false;
    }

    if (this.props.sign_password == "") {
      this.setState({sign_password_error: " 패스워드를 입력해주세요."});
      return false;
    }

    if (this.props.sign_password.length < 6) {
      this.setState({sign_password_error: " 최소 6자리 이상 입력해주세요."});
      return false;
    }

    if (this.props.sign_password != this.props.sign_password_check) {
      return false;
    }

    if (this.props.sign_gender == null) {
      this.setState({sign_gender_error: " 성별을 선택해주세요."});
      return false;
    }

    if (this.state.sign_agree_all != true) {
      this.setState({sign_agree_error: " 약관에 모두 동의해주세요."});
      return false;
    }


    this.props.navigation.navigate('card');
  }

  checkUniq = () => {
    this.setState({checkLoading: true});
    if (this.props.sign_nickname == "") {
      this.setState({sign_nickname_error: " 닉네임을 입력해주세요.", checkLoading: false});
      return false;
    }

    let formdata = new FormData();

    formdata.append("nickname", this.props.sign_nickname);

    // 주소 변경 필요
    fetch('https://www.lunchting.com/app/checkuniq', {
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
        this.setState({sign_nickname_error: resJSON.msg, checkedNickname: resJSON.checkedNickname, checkLoading: false});
      } else {
        console.log(resJSON.msg);
        this.setState({sign_nickname_error: resJSON.msg, checkLoading: false});
      }
    })
    .catch((error) => {
      this.setState({checkLoading: false});
      console.log('진짜 에러 발생')
      console.log(error);
    })
  }


  render() {

    // <Ionicons name="ios-checkmark" size={30} color="#fc5a5a" />

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}} bounces={false}>
          <View style={{width: DEVICE_WIDTH, alignItems: 'center'}}>
            <View style={{width: DEVICE_WIDTH * 0.8, height: '100%'}}>
              {/* 닉네임 폼 */}
              <Text style={{marginBottom: 5}}>
                <Text style={{fontSize: 14, color: '#535353'}}>닉네임</Text>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}> {this.state.sign_nickname_error}</Text>
              </Text>
              <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={[styles.inputform, {width: '65%'}]}>
                  <TextInput placeholderTextColor="#c5c5c5" value={this.props.sign_nickname}
                    maxLength={10}
                    selectionColor={"#c5c5c5"}
                    autoCapitalize={'none'} onChangeText={(text)=>{
                      this.setState({checkedNickname: null});
                      this.setState({sign_nickname_error: ""});
                      this.props.signNicknameChanged(text);
                    }} returnKeyType="done"
                    autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
                    autoFocus={false} keyboardType="email-address" placeholder="한글/영어 최대 10글자" style={styles.tinput}
                  />
                </View>
                {/* <TouchableOpacity onPress={this.checkUniq} style={{width: '30%', height: 32, marginBottom: 10, borderRadius: 6, borderWidth: 1, borderColor: '#fc5a5a', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#fc5a5a'}}>중복확인</Text>
                </TouchableOpacity> */}
                {/* {this.state.checkLoading == false ? (
                  <TouchableOpacity onPress={this.checkUniq} style={{width: '30%', height: 32, marginBottom: 10, borderRadius: 6, borderWidth: 1, borderColor: '#fc5a5a', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fc5a5a'}}>중복확인</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{width: '30%', height: 32, marginBottom: 10, borderRadius: 6, borderWidth: 1, borderColor: '#fc5a5a', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color={"#fc5a5a"} size="small" />
                  </View>
                )} */}

                {this.state.checkedNickname == null ? (
                  this.state.checkLoading == false ? (
                    <TouchableOpacity onPress={this.checkUniq} style={{width: '30%', height: 32, marginBottom: 10, borderRadius: 6, borderWidth: 1, borderColor: '#fc5a5a', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: '#fc5a5a'}}>중복확인</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{width: '30%', height: 32, marginBottom: 10, borderRadius: 6, borderWidth: 1, borderColor: '#fc5a5a', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                      <ActivityIndicator color={"#fc5a5a"} size="small" />
                    </View>
                  )
                ) : (
                  <View style={{width: '30%', height: 32, marginBottom: 10, borderRadius: 6, borderWidth: 1, borderColor: '#fc5a5a', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
                    <Ionicons name="ios-checkmark" size={30} color="#fc5a5a" />
                  </View>
                )}
              </View>

              <Text style={{marginBottom: 5}}>
                <Text style={{fontSize: 14, color: '#535353'}}>비밀번호</Text>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}> {this.state.sign_password_error}</Text>
              </Text>
              <View style={styles.inputform}>
                <TextInput placeholderTextColor="#c5c5c5" secureTextEntry={true}
                  selectionColor={"#c5c5c5"} onChangeText={(text)=>{
                    this.setState({sign_password_error: ""});
                    this.props.signPasswordChanged(text);
                  }}
                  autoCapitalize={'none'} returnKeyType="done"
                  autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
                  autoFocus={false} placeholder="최소 6자리 이상 입력해주세요." style={styles.tinput}
                  value={this.props.sign_password}
                />
              </View>
              <Text style={{marginBottom: 5}}>
                <Text style={{fontSize: 14, color: '#535353'}}>비밀번호 확인</Text>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}>{this.props.sign_password != this.props.sign_password_check ?
                ("  비밀번호가 일치하지 않습니다."):("")}</Text>
              </Text>
              <View style={styles.inputform}>
                <TextInput placeholderTextColor="#c5c5c5" value={this.props.sign_password_check} secureTextEntry={true}
                  selectionColor={"#c5c5c5"}
                  autoCapitalize={'none'} onChangeText={(text)=>{

                    this.props.signPasswordCheckChanged(text);
                  }} returnKeyType="done"
                  autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
                  autoFocus={false} placeholder="비밀번호를 다시 입력해주세요." style={styles.tinput}
                />
              </View>

              <Text style={{marginBottom: 5}}>
                <Text style={{fontSize: 14, color: '#535353'}}>성별</Text>
                <Text style={{fontSize: 12, color: '#fc5a5a'}}>{this.state.sign_gender_error}</Text>
              </Text>
              <View style={{width: '100%', height: 30, justifyContent: 'space-between', flexDirection: 'row', marginRight: 10, marginBottom: 10, marginTop: 5}}>
                {this.props.sign_gender==null || this.props.sign_gender=="female" ? (
                  <TouchableOpacity style={{width: '45%', borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center',
                  }} onPress={() => {
                    this.setState({sign_gender_error: ""});
                    this.props.signGenderChanged("male");
                  }}
                  >
                    <Text style={{color: '#fc5a5a'}}>남자</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={{width: '45%', borderRadius: 6,
                    borderWidth: 1, backgroundColor: '#fc5a5a',
                    borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center',
                  }} onPress={() => {}}
                  >
                    <Text style={{color: 'white'}}>남자</Text>
                  </TouchableOpacity>
                )}

                {this.props.sign_gender==null || this.props.sign_gender=="male" ? (
                  <TouchableOpacity style={{width: '45%', borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center',
                  }} onPress={() => {
                    this.setState({sign_gender_error: ""});
                    this.props.signGenderChanged("female");
                  }}
                  >
                    <Text style={{color: '#fc5a5a'}}>여자</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={{width: '45%', borderRadius: 6,
                    borderWidth: 1, backgroundColor: '#fc5a5a',
                    borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center',
                  }} onPress={() => {}}
                  >
                    <Text style={{color: 'white'}}>여자</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* 나이 폼 */}
              <Text style={{fontSize: 14, color: '#535353'}}>나이</Text>

              {Platform.OS == 'android' ? (
                <View style={{width: '100%', height: 30, borderRadius: 6, borderColor: '#8b8b8b', borderWidth:1, marginTop: 5, marginBottom: 10, justifyContent: 'center'}}>
                  <Picker style={{width: "100%", height: '100%'}} itemStyle={{height: '100%', fontSize: 14}}
                    selectedValue={this.props.sign_age}
                    onValueChange={(itemValue, itemIndex) => {this.props.signAgeChanged(itemValue);}}>
                    <Picker.Item label="20세" value="20" />
                    <Picker.Item label="21세" value="21" />
                    <Picker.Item label="22세" value="22" />
                    <Picker.Item label="23세" value="23" />
                    <Picker.Item label="24세" value="24" />
                    <Picker.Item label="25세" value="25" />
                    <Picker.Item label="26세" value="26" />
                    <Picker.Item label="27세" value="27" />
                    <Picker.Item label="28세" value="28" />
                    <Picker.Item label="29세" value="29" />
                    <Picker.Item label="30세" value="30" />
                    <Picker.Item label="31세" value="31" />
                    <Picker.Item label="32세" value="32" />
                    <Picker.Item label="33세" value="33" />
                    <Picker.Item label="34세" value="34" />
                    <Picker.Item label="35세" value="35" />
                  </Picker>
                </View>
              ) : (
                <View style={{width: '100%', height: 80, marginBottom: 10, justifyContent: 'center'}}>
                  <Picker style={{width: "100%", height: '100%'}} itemStyle={{height: '100%', fontSize: 14}}
                    selectedValue={this.props.sign_age}
                    onValueChange={(itemValue, itemIndex) => {this.props.signAgeChanged(itemValue);}}>
                    <Picker.Item label="20세" value="20" />
                    <Picker.Item label="21세" value="21" />
                    <Picker.Item label="22세" value="22" />
                    <Picker.Item label="23세" value="23" />
                    <Picker.Item label="24세" value="24" />
                    <Picker.Item label="25세" value="25" />
                    <Picker.Item label="26세" value="26" />
                    <Picker.Item label="27세" value="27" />
                    <Picker.Item label="28세" value="28" />
                    <Picker.Item label="29세" value="29" />
                    <Picker.Item label="30세" value="30" />
                    <Picker.Item label="31세" value="31" />
                    <Picker.Item label="32세" value="32" />
                    <Picker.Item label="33세" value="33" />
                    <Picker.Item label="34세" value="34" />
                    <Picker.Item label="35세" value="35" />
                  </Picker>
                </View>
              )}

              {/* 약관 폼 */}
              <View style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}>{this.state.sign_agree_error}</Text>
              </View>
              <View style={{width: DEVICE_WIDTH * 0.8, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5}}>
                <CheckBox
                  containerStyle={{width:40, height: 40, justifyContent: 'center', marginLeft:0, marginRight:0, paddingLeft:0, borderWidth: 0, backgroundColor: 'white'}}
                  title=''
                  onPress={this.checkAll}
                  iconType='material'
                  checkedIcon='done'
                  uncheckedIcon='crop-din'
                  uncheckedColor='#828282'
                  checkedColor='#fc5a5a'
                  checked={this.state.sign_agree_all}
                />
                <TouchableOpacity onPress={this.checkAll} style={{justifyContent: 'center', height: 40, flex: 1, paddingBottom: 1}}>
                  <Text style={{color: '#4a4a4a'}}>전체 약관에 동의합니다.</Text>
                </TouchableOpacity>
              </View>

              <View style={{width: DEVICE_WIDTH * 0.8, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <CheckBox
                  containerStyle={{width:40, height: 40, justifyContent: 'center', marginLeft:0, marginRight:0, paddingLeft:0, borderWidth: 0, backgroundColor: 'white'}}
                  title=''
                  onPress={this.togglePrivacy}
                  iconType='material'
                  checkedIcon='done'
                  uncheckedIcon='crop-din'
                  uncheckedColor='#828282'
                  checkedColor='#fc5a5a'
                  checked={this.state.sign_agree_privacy}
                />
                <View style={{justifyContent: 'center', height: 40, flex: 1, paddingBottom: 1}}>
                  <Text>
                    <Text onPress={()=> {this.props.navigation.navigate('personaldata')}} style={{color: '#00A5B1', textDecorationLine: 'underline'}}>개인정보 취급 방침</Text>
                    <Text style={{color: '#4a4a4a'}}>에 동의합니다.</Text>
                  </Text>
                </View>
              </View>

              <View style={{width: DEVICE_WIDTH * 0.8, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <CheckBox
                  containerStyle={{width:40, height: 40, justifyContent: 'center', marginLeft:0, marginRight:0, paddingLeft:0, borderWidth: 0, backgroundColor: 'white'}}
                  title=''
                  onPress={this.toggleServie}
                  iconType='material'
                  checkedIcon='done'
                  uncheckedIcon='crop-din'
                  uncheckedColor='#828282'
                  checkedColor='#fc5a5a'
                  checked={this.state.sign_agree_service}
                />
                <View style={{justifyContent: 'center', height: 40, flex: 1, paddingBottom: 1}}>
                  <Text>
                    <Text onPress={()=> {this.props.navigation.navigate('agreement')}} style={{color: '#00A5B1', textDecorationLine: 'underline'}}>서비스 이용약관</Text>
                    <Text style={{color: '#4a4a4a'}}>에 동의합니다.</Text>
                  </Text>
                </View>
              </View>

              <View style={{width: DEVICE_WIDTH * 0.8, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                <CheckBox
                  containerStyle={{width:40, height: 40, justifyContent: 'center', marginLeft:0, marginRight:0, paddingLeft:0, borderWidth: 0, backgroundColor: 'white'}}
                  title=''
                  onPress={this.toggleLocation}
                  iconType='material'
                  checkedIcon='done'
                  uncheckedIcon='crop-din'
                  uncheckedColor='#828282'
                  checkedColor='#fc5a5a'
                  checked={this.state.sign_agree_location}
                />
                <View style={{justifyContent: 'center', height: 40, flex: 1, paddingBottom: 1}}>
                  <Text>
                    <Text onPress={()=> {this.props.navigation.navigate('locationagreement')}} style={{color: '#00A5B1', textDecorationLine: 'underline'}}>위치정보 이용약관</Text>
                    <Text style={{color: '#4a4a4a'}}>에 동의합니다.</Text>
                  </Text>
                </View>
              </View>

              <TouchableOpacity onPress={this.validateFormAndGoCard} style={{width: '100%', height: 30, backgroundColor: '#fc5a5a', borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                <Text style={{color: 'white', fontSize: 14}}>다음</Text>
              </TouchableOpacity>



            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputform: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8b8b8b',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 10
  },
  tinput: {
    color: '#4a4a4a',
    fontSize: 14,
    paddingLeft: 20,
    width: '100%',
    height: 30,
  },
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
    sign_agree_all : state.auth.sign_agree_all,
    // sign_agree_privacy: state.auth.sign_agree_privacy,
    // sign_agree_service: state.auth.sign_agree_service,
    // sign_agree_location: state.suth.sign_agree_location,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedSignUpScreen = connect(mapStateToProps, actions)(SignUpScreen);

export { connectedSignUpScreen };
