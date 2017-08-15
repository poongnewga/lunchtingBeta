import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, TextInput, Keyboard, Platform, Animated, StatusBar, Dimensions, Image, ActivityIndicator } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Title from '../assets/title_logo.png';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
const DEVICE_WIDTH = Dimensions.get('window').width;

class SelectPeopleScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: '인원 선택',
      header: <View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>,
      tabBarLabel: '런치팅',
      headerLeft: (<View></View>),
      headerRight: (
       <TouchableOpacity style={{padding: 20}} onPress={()=>{navigation.navigate('selday')}}>
         <Text style={{fontSize: 16, color: "#f46958"}}>다음</Text>
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

  constructor(props) {
    super(props);
    this.tHeight = new Animated.Value(70);
    this.tPadding = new Animated.Value(15);
  }

  componentWillMount () {
    if (Platform.OS == 'android') {
      this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    } else {
      this.keyboardShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
      this.keyboardHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
    }
  }

  componentWillUnmount () {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  _keyboardDidShow = () => {
    console.log('show');
    Animated.parallel([Animated.timing(this.tHeight, {
      toValue: 0,
      duration: 250
    }),
    Animated.timing(this.tPadding, {
      toValue: 0,
      duration: 250
    })]).start();
  }

  _keyboardDidHide = () => {
    console.log('hide');
    Animated.parallel([Animated.timing(this.tHeight, {
      toValue: 70,
      duration: 250
    }),
    Animated.timing(this.tPadding, {
      toValue: 15,
      duration: 250
    })]).start();
  }


  renderAuth1 = () => {
    if (this.props.peopleCount >= 2) {
      return (
        <View style={{overflow: 'hidden', flexDirection: 'row', width: "100%", height: 30, justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
          <View style={{width: '65%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#979797'}}>
            <TextInput placeholderTextColor="#cccccc" value={this.state.nickname1} returnKeyType="done"
              autoCapitalize={'none'} onChangeText={(text)=>{this.setState({nickname1: text, checkedNickname1: null, errorMsg: "", nickname1Error: ""})}}
              autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={false} keyboardType="email-address" placeholder="닉네임 1" style={styles.tinput}
              selectionColor={"#c5c5c5"}
            />
          </View>

          {this.state.checkedNickname1 == null ? (
            this.state.nickname1IsLoading == false ? (
              <TouchableOpacity onPress={this.checkCompanion1} style={{width: '30%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fc5a5a', fontSize: 12}}>인증하기</Text>
              </TouchableOpacity>
            ) : (
              <View style={{width: '30%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={"#fc5a5a"} size="small" />
              </View>
            )
          ) : (
            <View style={{overflow: 'hidden',width: '30%', overflow: 'hidden', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="ios-checkmark" size={30} color="#fc5a5a" style={{backgroundColor: 'rgba(0,0,0,0)'}} />
            </View>
          )}

        </View>
      );
    }
  }
  renderAuth1Error = () => {
    if (this.props.peopleCount >= 2) {
      return (
        <View style={{width: '100%', height: 20, paddingLeft: 5}}>
          <Text style={{color: '#fc5a5a', fontSize: 10}}>{this.state.nickname1Error}</Text>
        </View>
      );
    }
  }

  renderAuth2 = () => {
    if (this.props.peopleCount >= 3) {
      return (
        <View style={{flexDirection: 'row', width: "100%", height: 30, justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
          <View style={{width: '65%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#979797'}}>
            <TextInput placeholderTextColor="#cccccc" value={this.state.nickname2} returnKeyType="done"
              autoCapitalize={'none'} onChangeText={(text)=>{this.setState({nickname2: text, checkedNickname2: null, errorMsg: "", nickname2Error: ""})}}
              autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={false} keyboardType="email-address" placeholder="닉네임 2" style={styles.tinput}
              selectionColor={"#c5c5c5"}
            />
          </View>

          {this.state.checkedNickname2 == null ? (
            this.state.nickname2IsLoading == false ? (
              <TouchableOpacity onPress={this.checkCompanion2} style={{width: '30%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fc5a5a', fontSize: 12}}>인증하기</Text>
              </TouchableOpacity>
            ) : (
              <View style={{width: '30%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={"#fc5a5a"} size="small" />
              </View>
            )
          ) : (
            <View style={{width: '30%', overflow: 'hidden', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="ios-checkmark" size={30} color="#fc5a5a" style={{backgroundColor: 'rgba(0,0,0,0)'}} />
            </View>
          )}
        </View>
      );
    }
  }
  renderAuth2Error = () => {
    if (this.props.peopleCount >= 3) {
      return (
        <View style={{width: '100%', height: 20, paddingLeft: 5}}>
          <Text style={{color: '#fc5a5a', fontSize: 10}}>{this.state.nickname2Error}</Text>
        </View>
      );
    }
  }

  renderAuth3 = () => {
    if (this.props.peopleCount >= 4) {
      return (
        <View style={{flexDirection: 'row', width: "100%", height: 30, justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
          <View style={{width: '65%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#979797'}}>
            <TextInput placeholderTextColor="#cccccc" value={this.state.nickname3} returnKeyType="done"
              autoCapitalize={'none'} onChangeText={(text)=>{this.setState({nickname3: text, checkedNickname3: null, errorMsg: "", nickname3Error: ""})}}
              autoCorrect={false} underlineColorAndroid={"rgba(0,0,0,0)"}
              autoFocus={false} keyboardType="email-address" placeholder="닉네임 3" style={styles.tinput}
              selectionColor={"#c5c5c5"}
            />
          </View>

          {this.state.checkedNickname3 == null ? (
            this.state.nickname3IsLoading == false ? (
              <TouchableOpacity onPress={this.checkCompanion3} style={{width: '30%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fc5a5a', fontSize: 12}}>인증하기</Text>
              </TouchableOpacity>
            ) : (
              <View style={{width: '30%', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={"#fc5a5a"} size="small" />
              </View>
            )
          ) : (
            <View style={{width: '30%', overflow: 'hidden', height:30, borderRadius: 6, borderWidth:1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="ios-checkmark" size={30} color="#fc5a5a" style={{backgroundColor: 'rgba(0,0,0,0)'}}/>
            </View>
          )}
        </View>
      );
    }
  }
  renderAuth3Error = () => {
    if (this.props.peopleCount >= 4) {
      return (
        <View style={{width: '100%', height: 20, paddingLeft: 5}}>
          <Text style={{color: '#fc5a5a', fontSize: 10}}>{this.state.nickname3Error}</Text>
        </View>
      );
    }
  }

  renderSingle = () => {
    if (this.props.peopleCount == 1) {
      return (
        <View style={{width: '100%', height: 80, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, marginBottom: 20}}>혼자 나가는 런치팅,</Text>
          <Text style={{fontSize: 20}}>색다른 설렘이 기다리고 있을 거에요.</Text>
        </View>
      );
    }
  }

  onPeopleChange = (peopleCount) => {
    this.props.changePeopleCount(peopleCount);
  }

  state = {
    nickname1: null,
    nickname1IsLoading: false,
    nickname1IsChecked: false,
    checkedNickname1: null,
    nickname1Error: '',

    nickname2: null,
    nickname2IsLoading: false,
    nickname2IsChecked: false,
    checkedNickname2: null,
    nickname2Error: '',

    nickname3: null,
    nickname3IsLoading: false,
    nickname3IsChecked: false,
    checkedNickname3: null,
    nickname3Error: '',

    errorMsg: ""


  }

  checkCompanion1 = () => {

    if (this.state.nickname1 == "" || this.state.nickname1 == null) {
      this.setState({nickname1Error: "닉네임을 입력해주세요."})
      return false;
    }

    if (this.state.nickname1 == this.props.user.split("|")[0]) {
      this.setState({nickname1Error: "본인의 닉네임은 사용할 수 없습니다."})
      return false;
    }

    if (this.state.nickname1 == this.state.nickname2 || this.state.nickname1 == this.state.nickname3) {
      this.setState({nickname1Error: "중복된 닉네임입니다."})
      return false;
    }

    this.setState({nickname1IsLoading: true});
    let formdata = new FormData();
    formdata.append("nickname", this.state.nickname1);
    // 주소 변경 필요
    fetch('http://www.lunchting.com/app/checkcompanion', {
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
        this.setState({nickname1Error: resJSON.msg, checkedNickname1: resJSON.checkedNickname, nickname1IsLoading: false});
      } else {
        console.log(resJSON.msg);
        this.setState({nickname1Error: resJSON.msg, nickname1IsLoading: false});
      }
    })
    .catch((error) => {
      console.log('진짜 에러 발생')
      console.log(error);
    })
  }
  checkCompanion2 = () => {

    if (this.state.nickname2 == "" || this.state.nickname2 == null) {
      this.setState({nickname2Error: "닉네임을 입력해주세요."})
      return false;
    }

    if (this.state.nickname2 == this.props.user.split("|")[0]) {
      this.setState({nickname2Error: "본인의 닉네임은 사용할 수 없습니다."})
      return false;
    }

    if (this.state.nickname2 == this.state.nickname1 || this.state.nickname2 == this.state.nickname3) {
      this.setState({nickname2Error: "중복된 닉네임입니다."})
      return false;
    }

    this.setState({nickname2IsLoading: true});
    let formdata = new FormData();
    formdata.append("nickname", this.state.nickname2);
    // 주소 변경 필요
    fetch('http://www.lunchting.com/app/checkcompanion', {
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
        this.setState({nickname2Error: resJSON.msg, checkedNickname2: resJSON.checkedNickname, nickname2IsLoading: false});
      } else {
        console.log(resJSON.msg);
        this.setState({nickname2Error: resJSON.msg, nickname2IsLoading: false});
      }
    })
    .catch((error) => {
      console.log('진짜 에러 발생')
      console.log(error);
    })
  }

  checkCompanion3 = () => {

    if (this.state.nickname3 == "" || this.state.nickname3 == null) {
      this.setState({nickname3Error: "닉네임을 입력해주세요."})
      return false;
    }

    if (this.state.nickname3 == this.props.user.split("|")[0]) {
      this.setState({nickname3Error: "본인의 닉네임은 사용할 수 없습니다."})
      return false;
    }

    if (this.state.nickname3 == this.state.nickname1 || this.state.nickname3 == this.state.nickname2) {
      this.setState({nickname3Error: "중복된 닉네임입니다."})
      return false;
    }

    this.setState({nickname3IsLoading: true});
    let formdata = new FormData();
    formdata.append("nickname", this.state.nickname3);
    // 주소 변경 필요
    fetch('http://www.lunchting.com/app/checkcompanion', {
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
        this.setState({nickname3Error: resJSON.msg, checkedNickname3: resJSON.checkedNickname, nickname3IsLoading: false});
      } else {
        console.log(resJSON.msg);
        this.setState({nickname3Error: resJSON.msg, nickname3IsLoading: false});
      }
    })
    .catch((error) => {
      console.log('진짜 에러 발생')
      console.log(error);
    })
  }


  validatePeople = () => {
    if (this.props.peopleCount == 2) {
      if (this.state.checkedNickname1 == null) {
        this.setState({errorMsg: "참가자의 닉네임을 인증해주세요."});
        return false;
      }
    }

    if (this.props.peopleCount == 3) {
      if (this.state.checkedNickname1 == null || this.state.checkedNickname2 == null) {
        this.setState({errorMsg: "참가자의 닉네임을 인증해주세요."});
        return false;
      }
    }

    if (this.props.peopleCount == 4) {
      if (this.state.checkedNickname1 == null || this.state.checkedNickname2 == null || this.state.checkedNickname3 == null) {
        this.setState({errorMsg: "참가자의 닉네임을 인증해주세요."});
        return false;
      }
    }

    this.props.enrollPeople(this.state.checkedNickname1, this.state.checkedNickname2, this.state.checkedNickname3);

    this.props.navigation.navigate('selday');
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
         <View style={{width: '20%', height: '100%'}}></View>
         <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
           <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
         </View>
         <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
           <TouchableOpacity onPress={this.validatePeople}>
             <Text style={{color: '#fc5a5a', fontSize: 18}}>다음</Text>
           </TouchableOpacity>
         </View>
       </View>

        <Animated.View style={{paddingTop: this.tPadding, width: '100%', justifyContent: 'center', alignItems: 'center', height: this.tHeight, backgroundColor: 'white', overflow: "hidden"}}>
          {/* <Text style={{fontSize: 30}}>{moment().month() + 1}월의 런치팅</Text>
          <Text style={{fontSize: 20, marginBottom: 20}}>({moment().day(8).format("MM/DD")} ~ {moment().day(12).format("MM/DD")})</Text>
          <Text style={{fontSize: 20, marginBottom: 10}}>런치팅에 참여할 인원을 설정해주세요.</Text> */}
          <View style={{width: '80%'}}>
            <Text style={{color: '#fc5a5a', fontSize: 18}}>Step 1.</Text>
            <Text style={{color: '#4a4a4a', fontSize: 18}}>함께 런치팅을 할 인원을 선택해주세요.</Text>
          </View>
        </Animated.View>

        {/* <View style={{width: "80%", height: 80, flexDirection: 'row', marginBottom: 10, backgroundColor: '#fafafa'}}>
          <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: '#5e5e5e'}}>인원</Text>
          </View>
          <Picker style={{width: "70%", height: 80 }} itemStyle={{height: '100%', fontSize: 12,color: '#5e5e5e', borderColor: 'black'}}
            selectedValue={this.props.peopleCount}
            onValueChange={(itemValue, itemIndex) => this.onPeopleChange(itemValue)}>
            <Picker.Item label="1 명" value="1" />
            <Picker.Item label="2 명" value="2" />
            <Picker.Item label="3 명" value="3" />
            <Picker.Item label="4 명" value="4" />
          </Picker>
        </View> */}

        {Platform.OS == 'android' ? (
          <View style={{width: "80%", height: 30, flexDirection: 'row', marginBottom: 25, marginTop: 25, backgroundColor: '#fafafa'}}>
            <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 14, color: '#5e5e5e'}}>인원</Text>
            </View>
            <View style={{width: "70%", height: 30, borderRadius: 6, borderWidth:1 , borderColor: '#979797', justifyContent: 'center', alignItems: 'center'}}>
              <Picker style={{width: "100%", height: 30 }} itemStyle={{height: '100%', fontSize: 12,color: '#5e5e5e', borderColor: 'black'}}
                selectedValue={this.props.peopleCount}
                onValueChange={(itemValue, itemIndex) => this.onPeopleChange(itemValue)}>
                <Picker.Item label="1 명" value="1" />
                <Picker.Item label="2 명" value="2" />
                <Picker.Item label="3 명" value="3" />
                <Picker.Item label="4 명" value="4" />
              </Picker>
            </View>
          </View>
        ) : (
          <View style={{width: "80%", height: 80, flexDirection: 'row', marginBottom: 10, backgroundColor: '#fafafa'}}>
            <View style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 14, color: '#5e5e5e'}}>인원</Text>
            </View>
            <Picker style={{width: "70%", height: 80 }} itemStyle={{height: '100%', fontSize: 12,color: '#5e5e5e', borderColor: 'black'}}
              selectedValue={this.props.peopleCount}
              onValueChange={(itemValue, itemIndex) => this.onPeopleChange(itemValue)}>
              <Picker.Item label="1 명" value="1" />
              <Picker.Item label="2 명" value="2" />
              <Picker.Item label="3 명" value="3" />
              <Picker.Item label="4 명" value="4" />
            </Picker>
          </View>
        )}



        {/* {this.renderSingle()} */}
        {/* {this.renderText()} */}
        {/* {this.renderAuth1()} */}
        {/* {this.renderAuth2()} */}
        {/* {this.renderAuth3()} */}
        <View style={{width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10, borderWidth:1, borderColor: '#d2d2d2', justifyContent: 'center'}}>
          {this.props.peopleCount == 1 ? (
            <View style={{width: '100%', minHeight: 40, justifyContent: 'center', alignItems: 'center',}}>
              <Text style={{color: '#4a4a4a'}}>혼자 나가는 런치팅,</Text>
              <Text style={{color: '#4a4a4a'}}>색다른 설렘이 기다리고 있을 거에요.</Text>
            </View>
          ) : (
            <View>
              <Text style={{color: '#4a4a4a'}}>함께 런치팅에 참여할</Text>
              <Text style={{color: '#4a4a4a'}}>참가자의 닉네임을 인증해주세요.</Text>
            </View>
          )}
          {/* <View>
            <Text style={{color: '#4a4a4a'}}>함께 런치팅에 참여할</Text>
            <Text style={{color: '#4a4a4a'}}>참가자의 닉네임을 인증해주세요.</Text>
          </View> */}
          <View style={{width: '100%'}}>
            {this.renderAuth1()}
            {this.renderAuth1Error()}
            {this.renderAuth2()}
            {this.renderAuth2Error()}
            {this.renderAuth3()}
            {this.renderAuth3Error()}
          </View>
        </View>
        <View style={{height: 30, width: '100%', paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fc5a5a', fontSize: 16}}>{this.state.errorMsg}</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  tinput: {
    color: '#4a4a4a',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: 30,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    peopleCount: state.enroll.peopleCount,
    user: state.auth.user_token,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedSelectPeopleScreen  = connect(mapStateToProps, actions)(SelectPeopleScreen);

export { connectedSelectPeopleScreen };
