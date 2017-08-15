import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Animated, Platform, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Logo from '../assets/logo_white.png';
import Gradient from '../assets/gradient_app.png'
import Title from '../assets/title_logo.png';
import EnrollFinish from '../assets/enroll_finish.png';
import DotFilter from '../assets/dot_filter.png';
import { connect } from 'react-redux';
import * as actions from '../actions';
import io from 'socket.io-client/dist/socket.io';
import { Video } from 'expo';

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '홈',
      header: <View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>,
      tabBarLabel: '홈',
      headerLeft: (<View></View>),
      headerRight: (
       <TouchableOpacity style={{padding: 20}} onPress={()=>{navigation.navigate('settings')}}>
         <FontAwesome name="cog" size={20} color="#f46958" />
       </TouchableOpacity>
      ),
      tabBarIcon: ({ tintColor, focused }) => (
      <FontAwesome
        name={'home'}
        size={25}
        style={{ color: tintColor }}
      />)
    }
  }

  constructor (props) {
    super(props);
    this.logoMargin = new Animated.Value(20);
  }

  componentWillMount () {
    // this.logoMargin = new Animated.Value(0);
  }


  componentDidMount () {
    this.socket = io('http://chat.heeham.com:8080', {jsonp : false});
    this.props.enrollSocket(this.socket);

    this.socket.on('connect', async () => {
      // TODO : 해당 유저의 방 목록을 서버에 요청하여 가져온다.
      //
      // let requestOptions = {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   // 토큰을 담아서 레일즈 서버에 요청
      //   body: JSON.stringify({ token: this.props.user })
      // };
      //
      //
      //
      // let res = await fetch('http://www.lunchting.com/app/meetings', requestOptions);
      // let resJSON = await res.json();
      // let result = resJSON.pop();
      //
      // if (result.status == "ok") {
      //   console.warn(result.result);
      // }


      // // 가져오는 데 성공하면 방에 전부 접속
      // // TODO : fetch 로 수정해야함, 가져온 후 리덕스에 저장
      // const chatDays = { mon : 'group1', tue: null, wed: 'group2', thu: null, fri: 'group3'};
      // // TODO : 가져온 것을 등록
      //
      // // chatDays를 등록하면 이것이 채팅 리스트에 반영된다.(페이지 수를 결정)
      // this.props.enrollChatDays(chatDays);
      // // TODO : 채팅 리스트의 상세 데이터는 따로 등록해야 한다.
      //
      // // chatDays로 월요일-금요일까지 방이름을 담은 오브젝트를 전달하면 된다.
      // this.socket.emit('enterRoom', this.props.user, chatDays);
      this.socket.emit('enterRoom', this.props.user, this.props.chatDays);

    });

    // 방에 조인하자마자 서버로부터 데이터 패치
    this.socket.on('initial', (day, messages) => {
    // messages 에는 방 이름과 메세지가 담겨있다.
      console.log('메세지 수신', day, messages);
      this.props.initializeMessages(day, messages);
    });

    Animated.loop(
      Animated.sequence([
        Animated.timing(this.logoMargin, {
          toValue: 0,
          duration: 600,
          delay: 0
        }),
        Animated.timing(this.logoMargin, {
          toValue: 20,
          duration: 800,
          delay: 0
        })
      ])).start();

  }

  componentWillUnmount () {
    this.socket.disconnect();
  }


  doEnroll = () => {
    this.props.navigation.navigate('meet');
  };

  state = {
    selctedPage: 1
  }

  renderPage1 = () => {
    if (this.state.selctedPage == 1) {
      return (
        <View>
          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity
                //  onPress={()=>{this.props.navigation.navigate('article');}} 
                 style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_conversation4.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>공통 취미/관심사 찾기</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_conversation1.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>꼬리를 무는 대화법</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_conversation2.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>편하게 대화하는 법</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_conversation3.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>뻔하지 않은 대화법</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_conversation5.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>대화 끊길 때 이어가는 법</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_conversation6.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>나만 아는 얘기는 안 돼요!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  renderPage2 = () => {
    if (this.state.selctedPage == 2) {
      return (
        <View>
          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_success3.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>지나친 자기자랑은 안돼요!</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_success5.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>핸드폰은 잠시 넣어주세요</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_success2.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>한여름 겨터파크 주의보!</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_success4.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>경청을 통한 호감 얻기</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_success1.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>런치팅 성공 사례 1</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_success6.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>런치팅 성공 사례 2</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  renderPage3 = () => {
    if (this.state.selctedPage == 3) {
      return (
        <View>
          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_location5.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>피해야 할 식당 Top 3!</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_location3.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>런치팅에서 피해야 할 음식</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_location4.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>자리 선정 꿀팁!!</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_location1.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>런치팅 추천 식당 - 선릉편</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_location2.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>런치팅 추천 메뉴 Top 3</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_location6.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>피해야 할 음식 Top 5!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  renderPage4 = () => {
    if (this.state.selctedPage == 4) {
      return (
        <View>
          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_after2.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>고백 타이밍에 대한 모든 것</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_after4.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>지나친 아재개그 금지!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_after6.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>뻔하지 않은 애프터 신청법</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_after3.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>집착은 안돼요ㅠㅠ</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_after1.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>애프터 신청 최고의 타이밍</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_after5.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>카톡으로 애프터 신청하기</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }

  renderPage5 = () => {
    if (this.state.selctedPage == 5) {
      return (
        <View>
          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_job3.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>월요병 극복법</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_job4.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>악덕 상사 대처하기</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_job6.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>Hip한 휴가지 Top 5!</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_job1.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>칼퇴근 하는 법</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{width: '100%', height: 200, flexDirection: 'row', backgroundColor: "#ebebeb", marginBottom: 10}}>
            <View style={{flex: 1, paddingLeft: 10, paddingRight: 5}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: "100%", resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_job2.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>부장님 개그 퇴치법</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, paddingLeft: 5, paddingRight: 10}}>
              <TouchableOpacity style={{flex: 1, backgroundColor: 'white', borderBottomWidth: 2, borderColor: '#dddddd' }}>
                <View style={{width:'100%', height: 150, justifyContent: 'flex-start'}}>
                  <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri : "http://www.lunchting.com/img/ks_job5.png"}}/>
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}}>
                  <Text>재태크 꿀팁!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
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

       <View style={{width: DEVICE_WIDTH, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
         <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
       </View>
        <ScrollView
          bounces={false}
          stickyHeaderIndices={[1]}
        >
          <View style={{width: "100%", height: 230, justifyContent: 'center', alignItems: 'center'}}>
            <Video
              source={{ uri: 'http://www.lunchting.com/videos/main.mp4' }}
              rate={1.0}
              volume={0.0}
              muted={true}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{ width: "100%", height: "100%" }}
            />
            <View style={{width: DEVICE_WIDTH, height: 230, position: 'absolute', left:0, top:0, opacity: 0.6}}>
              <Image style={{width: '100%', height: '100%'}} source={Gradient} />
            </View>
            <View style={{width: DEVICE_WIDTH, height: 230, position: 'absolute', left:0, top:0, opacity: 0.6}}>
              <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={DotFilter} />
            </View>

            <View style={{width: DEVICE_WIDTH, height: 230, position: 'absolute', left:0, top: 0, backgroundColor: "rgba(0,0,0,0)", justifyContent: 'center', flexDirection: 'row'}}>
              <View style={{width: 130, height: 230, alignItems: 'center', justifyContent: 'center'}}>
                <Animated.View style={{width: "100%", height: this.logoMargin}}></Animated.View>
                <Image style={{width: 100, height: 100}} source={Logo} />
              </View>
              <View style={{width: DEVICE_WIDTH-130, height: 230, justifyContent: 'center', paddingTop: 10}}>
                <View style={{width: '100%', height: 54, borderLeftWidth: 3, borderColor: '#fc5a5a', justifyContent: 'space-around', paddingLeft: 4}}>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: '400'}}>삭막한 직장생활</Text>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: '400'}}>새로운 사람을 만나고 싶으신가요?</Text>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: '400'}}>단조로운 점심, 설레는 시간으로 바꿔보세요!</Text>
                </View>
              </View>
            </View>
          </View>
          <ScrollView
            style={{width: DEVICE_WIDTH, height: 50, backgroundColor: 'white', borderBottomWidth:1, borderColor: '#ebebeb'}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{flex:1, minWidth: 30, justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingVertical: 10}}>
              {this.state.selctedPage == 1 ? (
                <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth:5, borderColor: "#fc5a5a"}}>
                  <Text>#대화주제</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={()=>{this.setState({selctedPage: 1})}} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
                  <Text>#대화주제</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{flex:1, minWidth: 30, justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingVertical: 10}}>
              {this.state.selctedPage == 2 ? (
                <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth:5, borderColor: "#fc5a5a"}}>
                  <Text>#성공율높이기</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={()=>{this.setState({selctedPage: 2})}} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
                  <Text>#성공율높이기</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{flex:1, minWidth: 30, justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingVertical: 10}}>
              {this.state.selctedPage == 3? (
                <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth:5, borderColor: "#fc5a5a"}}>
                  <Text>#연애</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={()=>{this.setState({selctedPage: 3})}} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
                  <Text>#연애</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{flex:1, minWidth: 30, justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingVertical: 10}}>
              {this.state.selctedPage == 4 ? (
                <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth:5, borderColor: "#fc5a5a"}}>
                  <Text>#애프터신청</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={()=>{this.setState({selctedPage: 4})}} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
                  <Text>#애프터신청</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{flex:1, minWidth: 30, justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingVertical: 10}}>
              {this.state.selctedPage == 5? (
                <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth:5, borderColor: "#fc5a5a"}}>
                  <Text>#장소꿀팁</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={()=>{this.setState({selctedPage: 5})}} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
                  <Text>#장소꿀팁</Text>
                </TouchableOpacity>
              )}
            </View>

          </ScrollView>
          {/* 여기서부터 기사 렌더링 */}
          {this.renderPage1()}
          {this.renderPage2()}
          {this.renderPage3()}
          {this.renderPage4()}
          {this.renderPage5()}
          {/* 아티클 2개씩 */}


        </ScrollView>
        {this.props.enrollFinished == true ? (
          <View style={{backgroundColor: '#ebebeb', width: DEVICE_WIDTH, height: DEVICE_HEIGHT, position: 'absolute', left:0, top: 50, alignItems: 'center'}}>
            <View style={{width: '90%', padding: 20, minHeight: 300, backgroundColor: 'white', borderRadius: 10, borderWidth: 1 , borderColor: '#d2d2d2', marginTop: 30, alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: '#303030'}}>신청이 확인되었습니다.</Text>
              <View style={{width: 154, height: 154, justifyContent: 'center', alignItems: 'center', marginVertical: 25}}>
                <Image source={EnrollFinish} style={{width: '100%', resizeMode: 'contain'}} />
              </View>
              <Text style={{fontSize: 14, color: '#303030'}}>마이페이지에서 신청내역을 확인하실 수 있습니다.</Text>
            </View>


            <TouchableOpacity onPress={()=>{this.props.enrollOk()}} style={{width: '90%', height: 30, backgroundColor: '#fc5a5a', marginTop: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 14}}>홈으로 돌아가기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}

      </View>
    )
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb'
  },

  enrollButton: {
    width: DEVICE_WIDTH * 0.6,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ebebeb',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    flexDirection: 'row'
  },
  statusContainer: {
    width: '100%',
    height: 200,
    // backgroundColor: "#ebebeb",
    flexDirection: 'row'
  },
  statusHeader: {
    fontSize: 20
  },
  // 로고 시작
  logobox: {
    width: DEVICE_WIDTH * 0.4,
    height: DEVICE_WIDTH * 0.4,
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  // 인풋 폼
  inputform: {
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
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
    color: 'white',
    fontSize: 15,
    paddingLeft: 30,
    width: '100%',
    height: 40,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    selectedDays: state.enroll.selectedDays,
    user: state.auth.user_token,
    chatDays: state.enroll.chatDays,
    enrollFinished: state.enroll.enrollFinished,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedHomeScreen  = connect(mapStateToProps, actions)(HomeScreen);

export { connectedHomeScreen };
