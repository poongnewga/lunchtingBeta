import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StatusBar, Platform, Image, Dimensions, ScrollView } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Title from '../assets/title_logo.png';
import RefreshButton from '../assets/refresh_btn.png';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MyPageScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: '마이페이지',
      tabBarLabel: '마이페이지',
      header: Platform.OS == 'android' ? (<View style={{width: '100%', height:0, backgroundColor: '#ffffff'}}></View>) : (<View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>),
      headerLeft: (<View></View>),
      headerRight: (
       <TouchableOpacity style={{padding: 20}} onPress={()=>{navigation.navigate('settings')}}>
         <FontAwesome name="cog" size={20} color="#f46958" />
       </TouchableOpacity>
      ),
      tabBarIcon: ({ tintColor, focused }) => (
      <FontAwesome
        name={'user-circle-o'}
        size={25}
        style={{ color: tintColor }}
      />)
    }
  }

  constructor (props) {
    super(props);

    props.getMypage(props.user);
  }

  // state = {
  //   lastMeetings : [
  //     {
  //       date: "8.13",
  //       company: '삼성',
  //       p_count: 4
  //     },
  //     {
  //       date: "8.14",
  //       company: '엘지',
  //       p_count: 2
  //     },
  //     {
  //       date: "8.15",
  //       company: '현대',
  //       p_count: 6
  //     },
  //   ],
  // }

  renderDays = (n) => {
    let str = [];
    if (this.props.mypage.waits != undefined && this.props.mypage.waits[n] != undefined) {

      if (this.props.mypage.waits[n].day.mon == "1") {
        str.push("월 ")
      }
      if (this.props.mypage.waits[n].day.tue == "1") {
        str.push("화 ")
      }
      if (this.props.mypage.waits[n].day.wed == "1") {
        str.push("수 ")
      }
      if (this.props.mypage.waits[n].day.thu == "1") {
        str.push("목 ")
      }
      if (this.props.mypage.waits[n].day.fri == "1") {
        str.push("금 ")
      }

      return str.join("");

    }
  }

  render() {



    return (
      <View style={{flex: 1, backgroundColor: '#fafafa', alignItems: 'center'}}>
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
          <View  style={{width: '20%', height: '100%', paddingLeft: DEVICE_WIDTH * 0.05, justifyContent: 'center'}}>

          </View>
          <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
          </View>
          <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{width: '100%', height: '100%', paddingRight: DEVICE_WIDTH * 0.05, justifyContent: 'center', alignItems: 'flex-end'}}
              //  onPress={()=>{this.props.navigation.navigate('settings')}}
               >
              {/* <FontAwesome name="cog" size={20} color="#f46958" /> */}
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView bounces={false}>
        <View style={{width: DEVICE_WIDTH, alignItems: 'center'}}>
        <View style={{width: '90%', height: 40, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', marginTop: 10, flexDirection: 'row', overflow: 'hidden'}}>
          <View style={{width: '60%', height: 40, flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
            <View>
              {this.props.gender == "f" ? (
                <Text style={{fontSize: 5, color: '#ff5955'}}>● </Text>
              ) : (
                <Text style={{fontSize: 5, color: '#00a5b1'}}>● </Text>
              )}
            </View>
            <View>
              <Text style={{color: '#4a4a4a'}}> {this.props.user.split("|")[0]}</Text>
            </View>
          </View>
          <View style={{width: '40%', height: 40, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10}}>
            <TouchableOpacity onPress={()=>{
              this.props.getMypage(this.props.user);
              // this.props.navigation.navigate('auth');
              // this.props.logoutAndDeleteToken(this.props.logout);
            }} style={{minWidth: 100, height: 25, borderRadius: 10, borderWidth: 1, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <Text style={{color: '#fc5a5a'}}> 새로고침</Text>
              <View style={{height: 40, width: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{height: 11, resizeMode: 'contain'}} source={RefreshButton} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 리스트 1 */}
        <View style={{padding: 10, width: '90%', minHeight: 40, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', marginTop: 10, overflow: 'hidden'}}>
          <View>
            <Text style={{color: '#ff5d59'}}>예정된 미팅</Text>
          </View>
          {/* 리스트 컨텐츠 반복문 */}

          {(this.props.chatDays["mon"] != null && this.props.chatDayInfos.mon != null) ? (
              <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.mon.date.toString().slice(4,5) == 0 ?
                      this.props.chatDayInfos.mon.date.toString().slice(5,6) :
                      this.props.chatDayInfos.mon.date.toString().slice(4,6)}.
                    {this.props.chatDayInfos.mon.date.toString().slice(6,7) == 0 ?
                      this.props.chatDayInfos.mon.date.toString().slice(7,8) :
                      this.props.chatDayInfos.mon.date.toString().slice(6,8)}
                  </Text>
                </View>
                <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.gender == "m" ? this.props.chatDayInfos.mon.company.female : this.props.chatDayInfos.mon.company.male}
                  </Text>
                </View>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.mon.p_count/2} : {this.props.chatDayInfos.mon.p_count/2}
                  </Text>
                </View>
              </View>
            ) : (<View></View>)
          }
          {(this.props.chatDays["tue"] != null && this.props.chatDayInfos.tue != null) ? (
              <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.tue.date.toString().slice(4,5) == 0 ?
                      this.props.chatDayInfos.tue.date.toString().slice(5,6) :
                      this.props.chatDayInfos.tue.date.toString().slice(4,6)}.
                    {this.props.chatDayInfos.tue.date.toString().slice(6,7) == 0 ?
                      this.props.chatDayInfos.tue.date.toString().slice(7,8) :
                      this.props.chatDayInfos.tue.date.toString().slice(6,8)}
                  </Text>
                </View>
                <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.gender == "m" ? this.props.chatDayInfos.tue.company.female : this.props.chatDayInfos.tue.company.male}
                  </Text>
                </View>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.tue.p_count/2} : {this.props.chatDayInfos.tue.p_count/2}
                  </Text>
                </View>
              </View>
            ) : (<View></View>)
          }
          {(this.props.chatDays["wed"] != null && this.props.chatDayInfos.wed != null) ? (
              <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.wed.date.toString().slice(4,5) == 0 ?
                      this.props.chatDayInfos.wed.date.toString().slice(5,6) :
                      this.props.chatDayInfos.wed.date.toString().slice(4,6)}.
                    {this.props.chatDayInfos.wed.date.toString().slice(6,7) == 0 ?
                      this.props.chatDayInfos.wed.date.toString().slice(7,8) :
                      this.props.chatDayInfos.wed.date.toString().slice(6,8)}
                  </Text>
                </View>
                <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.gender == "m" ? this.props.chatDayInfos.wed.company.female : this.props.chatDayInfos.wed.company.male}
                  </Text>
                </View>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.wed.p_count/2} : {this.props.chatDayInfos.wed.p_count/2}
                  </Text>
                </View>
              </View>
            ) : (<View></View>)
          }
          {(this.props.chatDays["thu"] != null && this.props.chatDayInfos.thu != null) ? (
              <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.thu.date.toString().slice(4,5) == 0 ?
                      this.props.chatDayInfos.thu.date.toString().slice(5,6) :
                      this.props.chatDayInfos.thu.date.toString().slice(4,6)}.
                    {this.props.chatDayInfos.thu.date.toString().slice(6,7) == 0 ?
                      this.props.chatDayInfos.thu.date.toString().slice(7,8) :
                      this.props.chatDayInfos.thu.date.toString().slice(6,8)}
                  </Text>
                </View>
                <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.gender == "m" ? this.props.chatDayInfos.thu.company.female : this.props.chatDayInfos.thu.company.male}
                  </Text>
                </View>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.thu.p_count/2} : {this.props.chatDayInfos.thu.p_count/2}
                  </Text>
                </View>
              </View>
            ) : (<View></View>)
          }
          {(this.props.chatDays["fri"] != null && this.props.chatDayInfos.fri != null) ? (
              <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.fri.date.toString().slice(4,5) == 0 ?
                      this.props.chatDayInfos.fri.date.toString().slice(5,6) :
                      this.props.chatDayInfos.fri.date.toString().slice(4,6)}.
                    {this.props.chatDayInfos.fri.date.toString().slice(6,7) == 0 ?
                      this.props.chatDayInfos.fri.date.toString().slice(7,8) :
                      this.props.chatDayInfos.fri.date.toString().slice(6,8)}
                  </Text>
                </View>
                <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.gender == "m" ? this.props.chatDayInfos.fri.company.female : this.props.chatDayInfos.fri.company.male}
                  </Text>
                </View>
                <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                    {this.props.chatDayInfos.fri.p_count/2} : {this.props.chatDayInfos.fri.p_count/2}
                  </Text>
                </View>
              </View>
            ) : (<View></View>)
          }

          {/* <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#4a4a4a'}}>8.8</Text>
            </View>
            <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>메리츠화재</Text>
            </View>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#4a4a4a'}}>2 : 2</Text>
            </View>
          </View>



          <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#4a4a4a'}}>8.9</Text>
            </View>
            <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>마이크로소프트</Text>
            </View>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#4a4a4a'}}>2 : 2</Text>
            </View>
          </View> */}
          {/* 흐린 더보기 */}
          <View style={{width: '100%', height: 30, justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#E2E2E2'}}></Text>
            </View>
            <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#E2E2E2'}}></Text>
            </View>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#E2E2E2'}}></Text>
            </View>
            <View style={{width: '100%', height: 25, alignItems: 'flex-end', position: 'absolute', right: 0, bottom: 0}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('chat')}} style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 25, backgroundColor: '#ff8383', borderRadius: 10}}>
                <Text style={{color: 'white'}}>보기</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 버튼 */}
          {/* <View style={{width: '100%', height: 25, marginTop: 10, alignItems: 'flex-end'}}>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 25, backgroundColor: '#ff8383', borderRadius: 10}}>
              <Text style={{color: 'white'}}>보기</Text>
            </TouchableOpacity>
          </View> */}

        </View>

        {/* 매칭 대기 중 미팅 */}
        <View style={{padding: 10, width: '90%', minHeight: 40, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', marginTop: 10, overflow: 'hidden'}}>
          <View>
            <Text style={{color: '#ff5d59'}}>매칭 대기 중 미팅</Text>
          </View>
          {/* 리스트 컨텐츠 반복문 */}

          {this.props.mypage.waits != undefined && this.props.mypage.waits[0] != undefined ? (
            <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{minWidth: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                  {/* {this.props.mypage.waits[0].day.mon == "1" ? ("월") : ("")} */}
                  {this.renderDays(0)}
                </Text>
              </View>
              <View style={{maxWidth: '60%', minWidth: '50%', height: '100%', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a', textAlign: 'left'}}>

                </Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>{this.props.mypage.waits[0].people} : {this.props.mypage.waits[0].people}</Text>
              </View>
            </View>
          ) : (<View></View>)}
          {this.props.mypage.waits != undefined && this.props.mypage.waits[1] != undefined ? (
            <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{minWidth: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                  {/* {this.props.mypage.waits[1].day.mon == "1" ? ("월") : ("")} */}
                  {this.renderDays(1)}
                </Text>
              </View>
              <View style={{maxWidth: '60%', minWidth: '50%', height: '100%', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a', textAlign: 'left'}}>

                </Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>{this.props.mypage.waits[1].people} : {this.props.mypage.waits[1].people}</Text>
              </View>
            </View>
          ) : (<View></View>)}
          {this.props.mypage.waits != undefined && this.props.mypage.waits[2] != undefined ? (
            <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{minWidth: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                  {/* {this.props.mypage.waits[2].day.mon == "1" ? ("월") : ("")} */}
                  {this.renderDays(2)}
                </Text>
              </View>
              <View style={{maxWidth: '60%', minWidth: '50%', height: '100%', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a', textAlign: 'left'}}>

                </Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>{this.props.mypage.waits[2].people} : {this.props.mypage.waits[2].people}</Text>
              </View>
            </View>
          ) : (<View></View>)}
          {this.props.mypage.waits != undefined && this.props.mypage.waits[3] != undefined ? (
            <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{minWidth: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                  {/* {this.props.mypage.waits[3].day.mon == "1" ? ("월") : ("")} */}
                  {this.renderDays(3)}
                </Text>
              </View>
              <View style={{maxWidth: '60%', minWidth: '50%', height: '100%', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a', textAlign: 'left'}}>

                </Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>{this.props.mypage.waits[3].people} : {this.props.mypage.waits[3].people}</Text>
              </View>
            </View>
          ) : (<View></View>)}
          {this.props.mypage.waits != undefined && this.props.mypage.waits[4] != undefined ? (
            <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{minWidth: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                  {/* {this.props.mypage.waits[4].day.mon == "1" ? ("월") : ("")} */}
                  {this.renderDays(4)}
                </Text>
              </View>
              <View style={{maxWidth: '60%', minWidth: '50%', height: '100%', paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a', textAlign: 'left'}}>

                </Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>{this.props.mypage.waits[4].people} : {this.props.mypage.waits[4].people}</Text>
              </View>
            </View>
          ) : (<View></View>)}

          {/* {this.props.mypage.waits != undefined && this.props.mypage.waits[2] != undefined ? (
            <View style={{width: '100%', height: 30, justifyContent: 'center', flexDirection: 'row'}}>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#E2E2E2'}}>
                  {this.renderDays(2)}
                </Text>
              </View>
              <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#E2E2E2'}}></Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#E2E2E2'}}></Text>
              </View>
              <View style={{width: '100%', height: 25, alignItems: 'flex-end', position: 'absolute', right: 0, bottom: 0}}>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 25, backgroundColor: '#ff8383', borderRadius: 10}}>
                  <Text style={{color: 'white'}}>보기</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (<View></View>)} */}

          {/* 흐린 더보기 */}
          {/* <View style={{width: '100%', height: 30, justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#E2E2E2'}}></Text>
            </View>
            <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#E2E2E2'}}></Text>
            </View>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#E2E2E2'}}></Text>
            </View>
            <View style={{width: '100%', height: 25, alignItems: 'flex-end', position: 'absolute', right: 0, bottom: 0}}>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 25, backgroundColor: '#ff8383', borderRadius: 10}}>
                <Text style={{color: 'white'}}>보기</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* 버튼 */}
          {/* <View style={{width: '100%', height: 25, marginTop: 10, alignItems: 'flex-end'}}>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 25, backgroundColor: '#ff8383', borderRadius: 10}}>
              <Text style={{color: 'white'}}>보기</Text>
            </TouchableOpacity>
          </View> */}

        </View>

        {/* 지난 미팅 */}
        <View style={{padding: 10, width: '90%', minHeight: 40, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', marginTop: 10, overflow: 'hidden'}}>
          <View>
            <Text style={{color: '#ff5d59'}}>지난 미팅</Text>
          </View>
          {/* 리스트 컨텐츠 반복문 */}

          {this.props.mypage.oldmeets != undefined && this.props.mypage.oldmeets[0] != undefined ? (
            <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                  {this.props.mypage.oldmeets[0].date.toString().slice(4,5) == 0 ?
                    this.props.mypage.oldmeets[0].date.toString().slice(5,6) :
                    this.props.mypage.oldmeets[0].date.toString().slice(4,6)}.
                  {this.props.mypage.oldmeets[0].date.toString().slice(6,7) == 0 ?
                    this.props.mypage.oldmeets[0].date.toString().slice(7,8) :
                    this.props.mypage.oldmeets[0].date.toString().slice(6,8)}
                </Text>
              </View>
              <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a', textAlign: 'left'}}>
                  {this.props.gender == "m" ? this.props.mypage.oldmeets[0].company.female : this.props.mypage.oldmeets[0].company.male}
                </Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>{this.props.mypage.oldmeets[0].p_count/2} : {this.props.mypage.oldmeets[0].p_count/2}</Text>
              </View>
            </View>
          ) : (<View></View>)}

          {this.props.mypage.oldmeets != undefined && this.props.mypage.oldmeets[1] != undefined ? (
            <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'space-between', flexDirection: 'row'}}>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>
                  {this.props.mypage.oldmeets[1].date.toString().slice(4,5) == 0 ?
                    this.props.mypage.oldmeets[1].date.toString().slice(5,6) :
                    this.props.mypage.oldmeets[1].date.toString().slice(4,6)}.
                  {this.props.mypage.oldmeets[1].date.toString().slice(6,7) == 0 ?
                    this.props.mypage.oldmeets[1].date.toString().slice(7,8) :
                    this.props.mypage.oldmeets[1].date.toString().slice(6,8)}
                </Text>
              </View>
              <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a', textAlign: 'left'}}>
                  {this.props.gender == "m" ? this.props.mypage.oldmeets[1].company.female : this.props.mypage.oldmeets[1].company.male}
                </Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#4a4a4a'}}>{this.props.mypage.oldmeets[1].p_count/2} : {this.props.mypage.oldmeets[1].p_count/2}</Text>
              </View>
            </View>
          ) : (<View></View>)}

          {this.props.mypage.oldmeets != undefined && this.props.mypage.oldmeets[2] != undefined ? (
            <View style={{width: '100%', height: 30, justifyContent: 'center', flexDirection: 'row'}}>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#E2E2E2'}}>
                  {this.props.mypage.oldmeets[2].date.toString().slice(4,5) == 0 ?
                    this.props.mypage.oldmeets[2].date.toString().slice(5,6) :
                    this.props.mypage.oldmeets[2].date.toString().slice(4,6)}.
                  {this.props.mypage.oldmeets[2].date.toString().slice(6,7) == 0 ?
                    this.props.mypage.oldmeets[2].date.toString().slice(7,8) :
                    this.props.mypage.oldmeets[2].date.toString().slice(6,8)}
                </Text>
              </View>
              <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
                <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#E2E2E2'}}>
                  {this.props.gender == "m" ? this.props.mypage.oldmeets[2].company.female : this.props.mypage.oldmeets[2].company.male}
                </Text>
              </View>
              <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: '#E2E2E2'}}>{this.props.mypage.oldmeets[2].p_count/2} : {this.props.mypage.oldmeets[2].p_count/2}</Text>
              </View>
              <View style={{width: '100%', height: 25, alignItems: 'flex-end', position: 'absolute', right: 0, bottom: 0}}>
                {/* <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 25, backgroundColor: '#ff8383', borderRadius: 10}}>
                  <Text style={{color: 'white'}}>보기</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          ) : (<View></View>)}

          {/* <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#4a4a4a'}}>8.1</Text>
            </View>
            <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>우리은행</Text>
            </View>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#4a4a4a'}}>1 : 1</Text>
            </View>
          </View>

          <View style={{width: '100%', height: 30, borderBottomWidth:1, borderColor: '#e6e6e6', justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#4a4a4a'}}>7.28</Text>
            </View>
            <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#4a4a4a'}}>삼성전자</Text>
            </View>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#4a4a4a'}}>1 : 1</Text>
            </View>
          </View> */}
          {/* 흐린 더보기 */}
          {/* <View style={{width: '100%', height: 30, justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#E2E2E2'}}>
                {this.props.mypage.oldmeets[2].date.toString().slice(4,5) == 0 ?
                  this.props.mypage.oldmeets[2].date.toString().slice(5,6) :
                  this.props.mypage.oldmeets[2].date.toString().slice(4,6)}.
                {this.props.mypage.oldmeets[2].date.toString().slice(6,7) == 0 ?
                  this.props.mypage.oldmeets[2].date.toString().slice(7,8) :
                  this.props.mypage.oldmeets[2].date.toString().slice(6,8)}
              </Text>
            </View>
            <View style={{width: '70%', height: '100%', paddingLeft: 30, paddingRight: 10, justifyContent: 'center'}}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={{fontSize: 13, color: '#E2E2E2'}}>
                {this.props.gender == "m" ? this.props.mypage.oldmeets[2].company.female : this.props.mypage.oldmeets[2].company.male}
              </Text>
            </View>
            <View style={{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, color: '#E2E2E2'}}></Text>
            </View>
            <View style={{width: '100%', height: 25, alignItems: 'flex-end', position: 'absolute', right: 0, bottom: 0}}>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 25, backgroundColor: '#ff8383', borderRadius: 10}}>
                <Text style={{color: 'white'}}>보기</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* 버튼 */}
          {/* <View style={{width: '100%', height: 25, marginTop: 10, alignItems: 'flex-end'}}>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 25, backgroundColor: '#ff8383', borderRadius: 10}}>
              <Text style={{color: 'white'}}>보기</Text>
            </TouchableOpacity>
          </View> */}

        </View>
        <View style={{marginVertical: 15}}>
          <Text style={{fontSize: 12, color: '#4a4a4a'}}>문의 : heejae@likelion.org / 010-3375-4005 </Text>
          <Text style={{fontSize: 12, color: '#4a4a4a'}}>공식 : www.lunchting.com </Text>
        </View>

        </View>
        </ScrollView>



      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    selectedDays: state.enroll.selectedDays,
    mapLoaded: state.enroll.mapLoaded,
    region: state.enroll.region,
    pinStatus: state.enroll.pinStatus,
    pin: state.enroll.pin,
    timeSaved: state.enroll.timeSaved,
    startTime: state.enroll.startTime,
    endTime: state.enroll.endTime,
    peopleCount: state.enroll.peopleCount,
    chatDays: state.enroll.chatDays,
    chatDayInfos: state.enroll.chatDayInfos,
    gender: state.enroll.gender,
    user: state.auth.user_token,

    mypage: state.enroll.mypage,
    logout: state.auth.logout,

  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedMyPageScreen  = connect(mapStateToProps, actions)(MyPageScreen);

export { connectedMyPageScreen };
