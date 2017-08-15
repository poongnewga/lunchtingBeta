import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ScrollView, StatusBar, Platform, Image } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Title from '../assets/title_logo.png';
import RefreshButton from '../assets/refresh_btn.png';
import { FontAwesome } from '@expo/vector-icons';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { TouchButton } from '../components';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class ChatScreen extends Component {

  static navigationOptions = {
    title: '',
    header: Platform.OS == 'android' ? (<View style={{width: '100%', height:0, backgroundColor: '#ffffff'}}></View>) : (<View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>),
    headerLeft: (<View></View>),
    headerRight:(<View></View>),

    tabBarLabel: '채팅',
    tabBarIcon: ({ tintColor, focused }) => (
    <FontAwesome
      name={'comments-o'}
      size={25}
      style={{ color: tintColor }}
    />)

  }

  constructor (props) {
    super(props);
    console.log(props.chatDays, '생성자');
    // let count = 0;
    // for (const key of Object.keys(props.chatDays)) {
    //   if(props.chatDays[key] != null) {
    //     count++;
    //   }
    // }
    // this.state = {
    //   // flag: 1,
    //   pageCount: count
    // };

    // this.props.setPageCount(this.props.chatDays);
  }

  renderRoom = () => {
    let rooms = [
      {roomName: "1", roomUsers: ["희", "햄", "히", "재"]},
      {roomName: "2", roomUsers: ["희", "햄", "히", "재"]},
      {roomName: "3", roomUsers: ["희", "햄", "히", "재"]},
      {roomName: "4", roomUsers: ["희", "햄", "히", "재"]},
      {roomName: "5", roomUsers: ["희", "햄", "히", "재"]},
    ]

    if (rooms.length == 0) {
      return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>아직 성사된 매칭이 없습니다. 😭</Text>
        </View>
      )
    }

    return (
      rooms.map((room, i)=>{
        return (
        <TouchableOpacity style={styles.room} key={room.roomName} onPress={()=>{ this.goChat(room.roomName)}}>
          <Text>{JSON.stringify(room.roomUsers)}</Text>
        </TouchableOpacity>
        )
      })
    );
  }

  goChat = (day, roomName) => {
    this.props.navigation.navigate('chatroom', { day, roomName });
  }


  renderNullChatRoom = () => {
    if(this.props.chatDays["mon"] == null && this.props.chatDays["tue"] == null && this.props.chatDays["wed"] == null && this.props.chatDays["thu"] == null && this.props.chatDays["fri"] == null) {
      return (
        <View style={{width: WIDTH, flex: 1, alignItems: 'center', backgroundColor: '#fafafa'}}>
          <View style={{width : '90%', height: 200, padding: 10, backgroundColor: 'white', borderRadius: 10, borderWidth: 1 , borderColor: '#d2d2d2', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 14, marginBottom: 15}}>성사된 매칭이 없습니다.</Text>
            <Text style={{fontSize: 14, marginBottom: 10}}>언젠간 설레는 만남이 있을 거에요!</Text>

          </View>

        </View>
      )
    }
  }

  renderMonChatRoom = () => {
    if (this.props.chatDays["mon"] != null && this.props.chatDayInfos.mon != null) {
      return (
        <View style={{width: WIDTH, flex: 1, alignItems: 'center', backgroundColor: "#fafafa"}}>

          <View style={{width: WIDTH * 0.9, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', overflow: 'hidden', padding: 20}}>
            <View>
              <Text style={{fontSize: 14, marginBottom: 10, color: '#5c5c5c'}}>이번 주 월요일의 런치팅 </Text>
            </View>

            <View style={{width: '100%', height: WIDTH * 0.5, backgroundColor: "#ebebeb", marginBottom: 5}}>
              <MapView
                provider={MapView.PROVIDER_GOOGLE}
                rotateEnabled={false} pitchEnabled={false} scrollEnabled={false} zoomEnabled={false}
                cacheEnabled={true}
                style={{ flex: 1 }}
                initialRegion={{...this.props.chatDayInfos.mon.center, latitudeDelta: 0.00706749106070248, longitudeDelta: 0.00554010272026062}}
                litemode={true}
              >
                <View>
                  <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"}
                    fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.props.chatDayInfos.mon.pin_f}/>

                  <MapView.Marker
                    pinColor="rgb(244, 105, 88)"
                    coordinate={this.props.chatDayInfos.mon.pin_f}/>

                  <MapView.Circle strokeColor={"rgba(66, 134, 244,0.8)"}
                    fillColor={"rgba(66, 134, 244,0.3)"} radius={350} center={this.props.chatDayInfos.mon.pin_m}/>

                  <MapView.Marker
                    pinColor="rgb(66, 134, 244)"
                    coordinate={this.props.chatDayInfos.mon.pin_m}/>
                </View>
              </MapView>
            </View>
            <View style={{flexDirection: 'row', height: 35, marginBottom: 5}}>
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 28, color: '#707070'}}>
                  {this.props.chatDayInfos.mon.date.toString().slice(4,5) == 0 ?
                    this.props.chatDayInfos.mon.date.toString().slice(5,6) :
                    this.props.chatDayInfos.mon.date.toString().slice(4,6)}.
                  {this.props.chatDayInfos.mon.date.toString().slice(6,7) == 0 ?
                    this.props.chatDayInfos.mon.date.toString().slice(7,8) :
                    this.props.chatDayInfos.mon.date.toString().slice(6,8)}
                </Text>
              </View>
              <View style={{justifyContent: 'flex-end', height: 30}}>
                <Text style={{color: '#a9a9a9', fontSize: 14, }}>  월</Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', borderTopWidth: 1, borderColor: '#ebe9e9'}}>
              <View style={{width: '70%'}}>
                <View style={{width: '100%', paddingTop: 10, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>인원</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.mon.p_count/2} : {this.props.chatDayInfos.mon.p_count/2}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>상대</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.gender == "m" ? this.props.chatDayInfos.mon.company.female : this.props.chatDayInfos.mon.company.male}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>시간</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.mon.lunchtime.start} ~ {this.props.chatDayInfos.mon.lunchtime.finish}</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '30%', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{ this.goChat("월요일", this.props.chatDays["mon"])}} style={{width:'100%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#fc5a5a'}}>
                  <Text style={{color: '#ff5955', fontSize: 14}}>채팅하기</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      );
    }
  };

  renderTueChatRoom = () => {
    if (this.props.chatDays["tue"] != null && this.props.chatDayInfos.tue != null) {
      return (
        <View style={{width: WIDTH, flex: 1, alignItems: 'center', backgroundColor: "#fafafa"}}>

          <View style={{width: WIDTH * 0.9, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', overflow: 'hidden', padding: 20}}>
            <View>
              <Text style={{fontSize: 14, marginBottom: 10, color: '#5c5c5c'}}>이번 주 화요일의 런치팅 </Text>
            </View>

            <View style={{width: '100%', height: WIDTH * 0.5, backgroundColor: "#ebebeb", marginBottom: 5}}>
              <MapView
                provider={MapView.PROVIDER_GOOGLE}
                rotateEnabled={false} pitchEnabled={false} scrollEnabled={false} zoomEnabled={false}
                cacheEnabled={true}
                style={{ flex: 1 }}
                initialRegion={{...this.props.chatDayInfos.tue.center, latitudeDelta: 0.00706749106070248, longitudeDelta: 0.00554010272026062}}
                litemode={true}
              >
                <View>
                  <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"}
                    fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.props.chatDayInfos.tue.pin_f}/>

                  <MapView.Marker
                    pinColor="rgb(244, 105, 88)"
                    coordinate={this.props.chatDayInfos.tue.pin_f}/>

                  <MapView.Circle strokeColor={"rgba(66, 134, 244,0.8)"}
                    fillColor={"rgba(66, 134, 244,0.3)"} radius={350} center={this.props.chatDayInfos.tue.pin_m}/>

                  <MapView.Marker
                    pinColor="rgb(66, 134, 244)"
                    coordinate={this.props.chatDayInfos.tue.pin_m}/>
                </View>
              </MapView>
            </View>
            <View style={{flexDirection: 'row', height: 35, marginBottom: 5}}>
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 28, color: '#707070'}}>
                  {this.props.chatDayInfos.tue.date.toString().slice(4,5) == 0 ?
                    this.props.chatDayInfos.tue.date.toString().slice(5,6) :
                    this.props.chatDayInfos.tue.date.toString().slice(4,6)}.
                  {this.props.chatDayInfos.tue.date.toString().slice(6,7) == 0 ?
                    this.props.chatDayInfos.tue.date.toString().slice(7,8) :
                    this.props.chatDayInfos.tue.date.toString().slice(6,8)}
                </Text>
              </View>
              <View style={{justifyContent: 'flex-end', height: 30}}>
                <Text style={{color: '#a9a9a9', fontSize: 14, }}>  화</Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', borderTopWidth: 1, borderColor: '#ebe9e9'}}>
              <View style={{width: '70%'}}>
                <View style={{width: '100%', paddingTop: 10, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>인원</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.tue.p_count/2} : {this.props.chatDayInfos.tue.p_count/2}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>상대</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.gender == "m" ? this.props.chatDayInfos.tue.company.female : this.props.chatDayInfos.tue.company.male}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>시간</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.tue.lunchtime.start} ~ {this.props.chatDayInfos.tue.lunchtime.finish}</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '30%', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{ this.goChat("화요일", this.props.chatDays["tue"])}} style={{width:'100%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#fc5a5a'}}>
                  <Text style={{color: '#ff5955', fontSize: 14}}>채팅하기</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      );
    }
  };

  renderWedChatRoom = () => {
    if (this.props.chatDays["wed"] != null && this.props.chatDayInfos.wed != null) {
      return (
        <View style={{width: WIDTH, flex: 1, alignItems: 'center', backgroundColor: "#fafafa"}}>

          <View style={{width: WIDTH * 0.9, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', overflow: 'hidden', padding: 20}}>
            <View>
              <Text style={{fontSize: 14, marginBottom: 10, color: '#5c5c5c'}}>이번 주 수요일의 런치팅 </Text>
            </View>

            <View style={{width: '100%', height: WIDTH * 0.5, backgroundColor: "#ebebeb", marginBottom: 5}}>
              <MapView
                provider={MapView.PROVIDER_GOOGLE}
                rotateEnabled={false} pitchEnabled={false} scrollEnabled={false} zoomEnabled={false}
                cacheEnabled={true}
                style={{ flex: 1 }}
                initialRegion={{...this.props.chatDayInfos.wed.center, latitudeDelta: 0.00706749106070248, longitudeDelta: 0.00554010272026062}}
                litemode={true}
              >
                <View>
                  <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"}
                    fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.props.chatDayInfos.wed.pin_f}/>

                  <MapView.Marker
                    pinColor="rgb(244, 105, 88)"
                    coordinate={this.props.chatDayInfos.wed.pin_f}/>

                  <MapView.Circle strokeColor={"rgba(66, 134, 244,0.8)"}
                    fillColor={"rgba(66, 134, 244,0.3)"} radius={350} center={this.props.chatDayInfos.wed.pin_m}/>

                  <MapView.Marker
                    pinColor="rgb(66, 134, 244)"
                    coordinate={this.props.chatDayInfos.wed.pin_m}/>
                </View>
              </MapView>
            </View>
            <View style={{flexDirection: 'row', height: 35, marginBottom: 5}}>
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 28, color: '#707070'}}>
                  {this.props.chatDayInfos.wed.date.toString().slice(4,5) == 0 ?
                    this.props.chatDayInfos.wed.date.toString().slice(5,6) :
                    this.props.chatDayInfos.wed.date.toString().slice(4,6)}.
                  {this.props.chatDayInfos.wed.date.toString().slice(6,7) == 0 ?
                    this.props.chatDayInfos.wed.date.toString().slice(7,8) :
                    this.props.chatDayInfos.wed.date.toString().slice(6,8)}
                </Text>
              </View>
              <View style={{justifyContent: 'flex-end', height: 30}}>
                <Text style={{color: '#a9a9a9', fontSize: 14, }}>  수</Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', borderTopWidth: 1, borderColor: '#ebe9e9'}}>
              <View style={{width: '70%'}}>
                <View style={{width: '100%', paddingTop: 10, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>인원</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.wed.p_count/2} : {this.props.chatDayInfos.wed.p_count/2}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>상대</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.gender == "m" ? this.props.chatDayInfos.wed.company.female : this.props.chatDayInfos.wed.company.male}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>시간</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.wed.lunchtime.start} ~ {this.props.chatDayInfos.wed.lunchtime.finish}</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '30%', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{ this.goChat("수요일", this.props.chatDays["wed"])}} style={{width:'100%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#fc5a5a'}}>
                  <Text style={{color: '#ff5955', fontSize: 14}}>채팅하기</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      );
    }
  };

  renderThuChatRoom = () => {
    if (this.props.chatDays["thu"] != null && this.props.chatDayInfos.thu != null) {
      return (
        <View style={{width: WIDTH, flex: 1, alignItems: 'center', backgroundColor: "#fafafa"}}>

          <View style={{width: WIDTH * 0.9, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', overflow: 'hidden', padding: 20}}>
            <View>
              <Text style={{fontSize: 14, marginBottom: 10, color: '#5c5c5c'}}>이번 주 목요일의 런치팅 </Text>
            </View>

            <View style={{width: '100%', height: WIDTH * 0.5, backgroundColor: "#ebebeb", marginBottom: 5}}>
              <MapView
                provider={MapView.PROVIDER_GOOGLE}
                rotateEnabled={false} pitchEnabled={false} scrollEnabled={false} zoomEnabled={false}
                cacheEnabled={true}
                style={{ flex: 1 }}
                initialRegion={{...this.props.chatDayInfos.thu.center, latitudeDelta: 0.00706749106070248, longitudeDelta: 0.00554010272026062}}
                litemode={true}
              >
                <View>
                  <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"}
                    fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.props.chatDayInfos.thu.pin_f}/>

                  <MapView.Marker
                    pinColor="rgb(244, 105, 88)"
                    coordinate={this.props.chatDayInfos.thu.pin_f}/>

                  <MapView.Circle strokeColor={"rgba(66, 134, 244,0.8)"}
                    fillColor={"rgba(66, 134, 244,0.3)"} radius={350} center={this.props.chatDayInfos.thu.pin_m}/>

                  <MapView.Marker
                    pinColor="rgb(66, 134, 244)"
                    coordinate={this.props.chatDayInfos.thu.pin_m}/>
                </View>
              </MapView>
            </View>
            <View style={{flexDirection: 'row', height: 35, marginBottom: 5}}>
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 28, color: '#707070'}}>
                  {this.props.chatDayInfos.thu.date.toString().slice(4,5) == 0 ?
                    this.props.chatDayInfos.thu.date.toString().slice(5,6) :
                    this.props.chatDayInfos.thu.date.toString().slice(4,6)}.
                  {this.props.chatDayInfos.thu.date.toString().slice(6,7) == 0 ?
                    this.props.chatDayInfos.thu.date.toString().slice(7,8) :
                    this.props.chatDayInfos.thu.date.toString().slice(6,8)}
                </Text>
              </View>
              <View style={{justifyContent: 'flex-end', height: 30}}>
                <Text style={{color: '#a9a9a9', fontSize: 14, }}>  목</Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', borderTopWidth: 1, borderColor: '#ebe9e9'}}>
              <View style={{width: '70%'}}>
                <View style={{width: '100%', paddingTop: 10, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>인원</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.thu.p_count/2} : {this.props.chatDayInfos.thu.p_count/2}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>상대</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.gender == "m" ? this.props.chatDayInfos.thu.company.female : this.props.chatDayInfos.thu.company.male}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>시간</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.thu.lunchtime.start} ~ {this.props.chatDayInfos.thu.lunchtime.finish}</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '30%', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{ this.goChat("목요일", this.props.chatDays["thu"])}} style={{width:'100%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#fc5a5a'}}>
                  <Text style={{color: '#ff5955', fontSize: 14}}>채팅하기</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      );
    }
  };

  renderFriChatRoom = () => {
    if (this.props.chatDays["fri"] != null && this.props.chatDayInfos.fri != null) {
      return (
        <View style={{width: WIDTH, flex: 1, alignItems: 'center', backgroundColor: "#fafafa"}}>

          <View style={{width: WIDTH * 0.9, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', overflow: 'hidden', padding: 20}}>
            <View>
              <Text style={{fontSize: 14, marginBottom: 10, color: '#5c5c5c'}}>이번 주 금요일의 런치팅 </Text>
            </View>

            <View style={{width: '100%', height: WIDTH * 0.5, backgroundColor: "#ebebeb", marginBottom: 5}}>
              <MapView
                provider={MapView.PROVIDER_GOOGLE}
                rotateEnabled={false} pitchEnabled={false} scrollEnabled={false} zoomEnabled={false}
                cacheEnabled={true}
                style={{ flex: 1 }}
                initialRegion={{...this.props.chatDayInfos.fri.center, latitudeDelta: 0.00706749106070248, longitudeDelta: 0.00554010272026062}}
                litemode={true}
              >
                <View>
                  <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"}
                    fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.props.chatDayInfos.fri.pin_f}/>

                  <MapView.Marker
                    pinColor="rgb(244, 105, 88)"
                    coordinate={this.props.chatDayInfos.fri.pin_f}/>

                  <MapView.Circle strokeColor={"rgba(66, 134, 244,0.8)"}
                    fillColor={"rgba(66, 134, 244,0.3)"} radius={350} center={this.props.chatDayInfos.fri.pin_m}/>

                  <MapView.Marker
                    pinColor="rgb(66, 134, 244)"
                    coordinate={this.props.chatDayInfos.fri.pin_m}/>
                </View>
              </MapView>
            </View>
            <View style={{flexDirection: 'row', height: 35, marginBottom: 5}}>
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 28, color: '#707070'}}>
                  {this.props.chatDayInfos.fri.date.toString().slice(4,5) == 0 ?
                    this.props.chatDayInfos.fri.date.toString().slice(5,6) :
                    this.props.chatDayInfos.fri.date.toString().slice(4,6)}.
                  {this.props.chatDayInfos.fri.date.toString().slice(6,7) == 0 ?
                    this.props.chatDayInfos.fri.date.toString().slice(7,8) :
                    this.props.chatDayInfos.fri.date.toString().slice(6,8)}
                </Text>
              </View>
              <View style={{justifyContent: 'flex-end', height: 30}}>
                <Text style={{color: '#a9a9a9', fontSize: 14, }}>  금</Text>
              </View>
            </View>

            <View style={{width: '100%', flexDirection: 'row', borderTopWidth: 1, borderColor: '#ebe9e9'}}>
              <View style={{width: '70%'}}>
                <View style={{width: '100%', paddingTop: 10, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>인원</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.fri.p_count/2} : {this.props.chatDayInfos.fri.p_count/2}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>상대</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.gender == "m" ? this.props.chatDayInfos.fri.company.female : this.props.chatDayInfos.fri.company.male}</Text>
                  </View>
                </View>
                <View style={{width: '100%', paddingTop: 1, flexDirection: 'row'}}>
                  <View style={{marginRight: 40}}>
                    <Text style={{fontSize:12, color: '#909090'}}>시간</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 12, color: '#4a4a4a'}}>{this.props.chatDayInfos.fri.lunchtime.start} ~ {this.props.chatDayInfos.fri.lunchtime.finish}</Text>
                  </View>
                </View>
              </View>
              <View style={{width: '30%', justifyContent: 'flex-end'}}>
                <TouchableOpacity onPress={()=>{ this.goChat("금요일", this.props.chatDays["fri"])}} style={{width:'100%', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#fc5a5a'}}>
                  <Text style={{color: '#ff5955', fontSize: 14}}>채팅하기</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      );
    }
  };

  handleScroll = (e) => {
    let scrollPosition = e.nativeEvent.contentOffset.x;
    if ( scrollPosition < WIDTH ) {
      this.props.setFlag(1);
    } else if ( scrollPosition >= WIDTH && scrollPosition < WIDTH * 2) {
      this.props.setFlag(2);
    } else if ( scrollPosition >= WIDTH * 2 && scrollPosition < WIDTH * 3) {
      this.props.setFlag(3);
    } else if ( scrollPosition >= WIDTH * 3 && scrollPosition < WIDTH * 4) {
      this.props.setFlag(4);
    } else if ( scrollPosition >= WIDTH * 4 && scrollPosition < WIDTH * 5) {
      this.props.setFlag(5);
    }
    // 스크롤 위치 출력
    // console.log(e.nativeEvent.contentOffset.x);
  }

  renderFlag1 = () => {
    if (this.props.pageCount >= 1) {
      if (this.props.flag == 1) {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#ff5955'}}>  ●  </Text>
          </View>
        );
      } else {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#919191'}}>  ●  </Text>
          </View>
        );
      }
    }
  }
  renderFlag2 = () => {
    if (this.props.pageCount >= 2) {
      if (this.props.flag == 2) {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#ff5955'}}>  ●  </Text>
          </View>
        );
      } else {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#919191'}}>  ●  </Text>
          </View>
        );
      }
    }
  }
  renderFlag3 = () => {
    if (this.props.pageCount >= 3) {
      if (this.props.flag == 3) {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#ff5955'}}>  ●  </Text>
          </View>
        );
      } else {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#919191'}}>  ●  </Text>
          </View>
        );
      }
    }
  }
  renderFlag4 = () => {
    if (this.props.pageCount >= 4) {
      if (this.props.flag == 4) {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#ff5955'}}>  ●  </Text>
          </View>
        );
      } else {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#919191'}}>  ●  </Text>
          </View>
        );
      }
    }
  }
  renderFlag5 = () => {
    if (this.props.pageCount >= 5) {
      if (this.props.flag == 5) {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#ff5955'}}>  ●  </Text>
          </View>
        );
      } else {
        return (
          <View style={{width: 20, height: 20, justifyContent:'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
            <Text style={{fontSize: 10, color: '#919191'}}>  ●  </Text>
          </View>
        );
      }
    }
  }
  render() {

    return(
      <View style={{width: '100%', height: '100%'}}>
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
        <View style={{width: DEVICE_WIDTH, height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
        </View>
        <View style={{width: '100%', height: 62, backgroundColor: '#fafafa', justifyContent: 'center', alignItems: 'center', paddingTop: 12}}>
          <View style={{width: '90%', height: 40, borderRadius: 10, borderWidth: 1, borderColor: "#d2d2d2", backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
            <Text style={{fontSize: 16, color: '#ff5d59'}}>예정된 미팅</Text>
            <View style={{height: 40, flex:1, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 5}}>
              <TouchableOpacity onPress={()=>{
                this.props.refreshChat(this.props.user);
                this.props.setPageCount(this.props.chatDays);
              }} style={{height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={RefreshButton} style={{width:20, resizeMode: 'contain'}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{width: WIDTH, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa'}}>
          {/* 탭 인디케이터 */}
          {this.renderFlag1()}
          {this.renderFlag2()}
          {this.renderFlag3()}
          {this.renderFlag4()}
          {this.renderFlag5()}

        </View>
        <ScrollView
          bounces={false}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          ref="chatPages"
          style={{width: WIDTH, flex: 1}}
          pagingEnabled={true}
          horizontal={true}>
          {/* 여기서 반복문으로 채팅방을 출력 */}

          {this.renderNullChatRoom()}
          {this.renderMonChatRoom()}
          {this.renderTueChatRoom()}
          {this.renderWedChatRoom()}
          {this.renderThuChatRoom()}
          {this.renderFriChatRoom()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  room : {
    width: '100%',
    height: 40,
    backgroundColor: "#ebebeb",
    marginBottom: 20
  }
})

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

    flag: state.enroll.flag,
    pageCount: state.enroll.pageCount,

  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedChatScreen  = connect(mapStateToProps, actions)(ChatScreen);

export { connectedChatScreen };
