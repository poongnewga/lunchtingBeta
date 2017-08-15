import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform,
Animated, FlatList, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FormLabel, FormInput } from 'react-native-elements'
import moment from 'moment/min/moment-with-locales.min.js';
moment.locale('ko');

// moment().format('ll A hh:mm').slice(12, 20)

const DEVICE_WIDTH = Dimensions.get('window').width;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

import { connect } from 'react-redux';
import * as actions from '../actions';


class ChatRoomScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: `${navigation.state.params.day}의 런치팅`,
      tabBarLabel: '채팅',
      headerRight: (
       <View></View>
     ),
      tabBarIcon: ({ tintColor, focused }) => (
      <FontAwesome
        name={'heart'}
        size={25}
        style={{ color: tintColor }}
      />)
    }
  }

  constructor (props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
  }

  state = {
    height: 0,
    myText: '',
    cursorPosition: null,
    messages: null,
    heightChecked: false,
    chatHeight: 0,
    newMsg: null,
  }

  componentWillMount () {
    if (Platform.OS == 'android') {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    } else {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
    }
  }

  componentDidMount () {

  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentWillUpdate (nextProps, nextState) {
    console.log(this.props.messagesMon, '업데이트전');
    console.log(nextProps.messagesMon);
    if(this.props.messagesWed.length + 1 == nextProps.messagesWed.length) {
      console.log('메세지 추가 ');
      // this.refs.chatList.scrollToEnd({
      //   animated: true,
      //   index: this.props.messagesWed.length,
      // });
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // setTimeout(()=>{
    //   this.refs.chatList.scrollToEnd({
    //     animated: false,
    //     index: this.state.messages.length-1,
    //     viewPosition: 1
    //   });
    // },1000);
    if(this.props.messagesWed.length == prevProps.messagesWed.length + 1) {
      console.log('메세지 추가됨');

      this.setState({newMsg: { from: this.props.messagesWed[this.props.messagesWed.length-1].from,
        body: this.props.messagesWed[this.props.messagesWed.length-1].body,
        createdAt: this.props.messagesWed[this.props.messagesWed.length-1].createdAt,
      }});
    }
  }


  _keyboardDidShow = (e) => {
    this.setState({height: e.endCoordinates.height});
    // this.refs.chatList.scrollToEnd({index: 12});

    Animated.timing(this.kHeight, {
      toValue: (this.state.chatHeight - e.endCoordinates.height),
      duration: 0
    }).start();
  }
  _keyboardDidHide = (e) => {
    this.setState({height: 0});

    Animated.timing(this.kHeight, {
      toValue: this.state.chatHeight,
      duration: 0
    }).start();
  }

  sendText = () => {
    switch (this.props.navigation.state.params.day) {
      case "월요일":
        this.props.webSocket.emit('newMsg', {
          from: this.props.user,
          to: this.props.navigation.state.params.roomName,
          body: this.state.myText,
          createdAt: moment().format('ll A hh:mm')
        }, this.props.messagesMon.length);
        var length = this.props.messagesMon.length;
        this.setState({myText: ''}, ()=>{
          var repeat = setInterval(()=>{
            if (length != this.props.messagesMon.length) {
              this.refs.chatList.scrollToEnd({
                animated: true,
                index: this.props.messagesMon.length,
              });
              clearInterval(repeat);
            }
          }, 1000);
        });
        this.refs.textBox.clear();
      break;
      case "화요일":
        this.props.webSocket.emit('newMsg', {
          from: this.props.user,
          to: this.props.navigation.state.params.roomName,
          body: this.state.myText,
          createdAt: moment().format('ll A hh:mm')
        }, this.props.messagesTue.length);
        var length = this.props.messagesTue.length;
        this.setState({myText: ''}, ()=>{
          var repeat = setInterval(()=>{
            if (length != this.props.messagesTue.length) {
              this.refs.chatList.scrollToEnd({
                animated: true,
                index: this.props.messagesTue.length,
              });
              clearInterval(repeat);
            }
          }, 1000);
        });
        this.refs.textBox.clear();
      break;
      case "수요일":
        this.props.webSocket.emit('newMsg', {
          from: this.props.user,
          to: this.props.navigation.state.params.roomName,
          body: this.state.myText,
          createdAt: moment().format('ll A hh:mm')
        }, this.props.messagesWed.length);
        var length = this.props.messagesWed.length;
        this.setState({myText: ''}, ()=>{
          var repeat = setInterval(()=>{
            if (length != this.props.messagesWed.length) {
              this.refs.chatList.scrollToEnd({
                animated: true,
                index: this.props.messagesWed.length,
              });
              clearInterval(repeat);
            }
          }, 1000);
        });
        this.refs.textBox.clear();
      break;
      case "목요일":
        this.props.webSocket.emit('newMsg', {
          from: this.props.user,
          to: this.props.navigation.state.params.roomName,
          body: this.state.myText,
          createdAt: moment().format('ll A hh:mm')
        }, this.props.messagesThu.length);
        var length = this.props.messagesThu.length;
        this.setState({myText: ''}, ()=>{
          var repeat = setInterval(()=>{
            if (length != this.props.messagesThu.length) {
              this.refs.chatList.scrollToEnd({
                animated: true,
                index: this.props.messagesThu.length,
              });
              clearInterval(repeat);
            }
          }, 1000);
        });
        this.refs.textBox.clear();
      break;
      case "금요일":
        this.props.webSocket.emit('newMsg', {
          from: this.props.user,
          to: this.props.navigation.state.params.roomName,
          body: this.state.myText,
          createdAt: moment().format('ll A hh:mm')
        }, this.props.messagesFri.length);
        var length = this.props.messagesFri.length;
        this.setState({myText: ''}, ()=>{
          var repeat = setInterval(()=>{
            if (length != this.props.messagesFri.length) {
              this.refs.chatList.scrollToEnd({
                animated: true,
                index: this.props.messagesFri.length,
              });
              clearInterval(repeat);
            }
          }, 1000);
        });
        this.refs.textBox.clear();
      break;
      default:

    }
  }

  scrollBtnClick = () => {
    this.setState({newMsg: null},()=>{
      this.refs.chatList.scrollToEnd({
        animated: true,
        index: this.props.messagesWed.length,
      });
    });
  }

  measureHeight = (e) => {
    console.log("채팅창 높이 : ",e.nativeEvent.layout.height);
    this.kHeight = new Animated.Value(e.nativeEvent.layout.height);
    this.setState({heightChecked: true, chatHeight: e.nativeEvent.layout.height});
  }

  render() {

    if (!this.state.heightChecked) {
      return (
        <View style={styles.container}>
          <View onLayout={(e) => this.measureHeight(e)} style={{flex: 1, width: DEVICE_WIDTH, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
          <View style={{flexDirection: 'row', backgroundColor: 'white', width: DEVICE_WIDTH, height: 40}}>
            <TextInput style={{width: (DEVICE_WIDTH-80), height: 40, borderWidth:1, borderColor: '#dfdfdf'}}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={{width: 80, height: 40, backgroundColor: "#dfdfdf", justifyContent: 'center', alignItems:'center'}}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    switch (this.props.navigation.state.params.day) {
      case "월요일":
      return (
        <View style={styles.container}>
          <Animated.View style={{width: DEVICE_WIDTH, height: this.kHeight}}>
            <FlatList
              onEndReachedThreshold={1.5}
              style={{flex: 1, width: DEVICE_WIDTH, backgroundColor: "white", paddingBottom: 10}}
              data={this.props.messagesMon}
              ref="chatList"
              ListEmptyComponent={()=>{
                return (
                  <View style={{width: DEVICE_WIDTH, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:16}}>아직 메세지가 없습니다.</Text>
                  </View>
                );
              }}

              keyExtractor={(item, i) => (i)}
              renderItem={({item}) => {
                // 내가 쓴 메세지인 경우 오른쪽에 출력
                if (item.from.split("|")[0] == this.props.user.split("|")[0]) {
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, justifyContent: 'flex-end',  alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingRight: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'right', paddingRight: 5}}>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>   {item.createdAt.slice(12, 20)}   </Text>
                            <Text style={{fontWeight: '500'}} >{item.from.split("|")[0]}  </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#FFEFEA', borderRadius: 5, borderColor: '#FFEFEA', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                } else {
                  // 내가 쓴 메세지가 아닐 경우 왼쪽에 출력
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingLeft: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'left', paddingLeft: 5}}>
                            <Text style={{fontWeight: '500'}}>{item.from.split("|")[0]}  </Text>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>{item.createdAt.slice(12, 20)}   </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#EAF8FF', borderRadius: 5, borderColor: '#EAF8FF', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                }
              }}
            />
            <TouchableOpacity onPress={this.scrollBtnClick} style={{width: DEVICE_WIDTH, height:45, position: 'absolute', left:0, bottom: 5, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
              {this.state.newMsg != null && this.state.newMsg.from.split("|")[0] != this.props.user.split("|")[0] ? (
                <View style={{width: '100%', height: 40, backgroundColor: '#fafafa', borderRadius: 6, borderColor: '#ebebeb', borderWidth: 1}}>
                  <View style={{width: '100%', height: 20, paddingLeft: 20}}>
                    <Text>
                      <Text style={{fontWeight: '500'}}>{this.state.newMsg.from.split("|")[0]} </Text>
                      <Text style={{fontSize: 12}}>{this.state.newMsg.createdAt.slice(12, 20)}</Text>
                    </Text>
                  </View>
                  <View style={{width: '100%', height: 20, paddingLeft: 20, paddingRight: 20}}>
                    <Text ellipsizeMode="tail" numberOfLines={1}>{this.state.newMsg.body}</Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View style={{flexDirection: 'row', backgroundColor: 'white', width: DEVICE_WIDTH, height: 40}}>
            <TextInput style={{width: (DEVICE_WIDTH-80), height: 40, borderWidth:1, borderColor: '#dfdfdf', paddingLeft: 20, paddingRight: 20}}
              selectionColor="#a2a2a2"
              placeholderTextColor="#a2a2a2"
              returnKeyType="done"
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              placeholder=" 메세지를 작성해주세요."
              onChangeText={(text)=>{this.setState({myText: text})}}
              value={this.state.myText}
              ref="textBox"
            />
            <TouchableOpacity onPress={this.sendText}
              style={{width: 80, height: 40, backgroundColor: "#dfdfdf", justifyContent: 'center', alignItems:'center'}}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      case "화요일":
      return (
        <View style={styles.container}>
          <Animated.View style={{width: DEVICE_WIDTH, height: this.kHeight}}>
            <FlatList
              onEndReachedThreshold={1.5}
              style={{flex: 1, width: DEVICE_WIDTH, backgroundColor: "white", paddingBottom: 10}}
              data={this.props.messagesTue}
              ref="chatList"
              ListEmptyComponent={()=>{
                return (
                  <View style={{width: DEVICE_WIDTH, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:16}}>아직 메세지가 없습니다.</Text>
                  </View>
                );
              }}

              keyExtractor={(item, i) => (i)}
              renderItem={({item}) => {
                // 내가 쓴 메세지인 경우 오른쪽에 출력
                if (item.from.split("|")[0] == this.props.user.split("|")[0]) {
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, justifyContent: 'flex-end',  alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingRight: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'right', paddingRight: 5}}>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>   {item.createdAt.slice(12, 20)}   </Text>
                            <Text style={{fontWeight: '500'}} >{item.from.split("|")[0]}  </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#FFEFEA', borderRadius: 5, borderColor: '#FFEFEA', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                } else {
                  // 내가 쓴 메세지가 아닐 경우 왼쪽에 출력
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingLeft: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'left', paddingLeft: 5}}>
                            <Text style={{fontWeight: '500'}}>{item.from.split("|")[0]}  </Text>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>{item.createdAt.slice(12, 20)}   </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#EAF8FF', borderRadius: 5, borderColor: '#EAF8FF', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                }
              }}
            />
            <TouchableOpacity onPress={this.scrollBtnClick} style={{width: DEVICE_WIDTH, height:45, position: 'absolute', left:0, bottom: 5, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
              {this.state.newMsg != null && this.state.newMsg.from.split("|")[0] != this.props.user.split("|")[0] ? (
                <View style={{width: '100%', height: 40, backgroundColor: '#fafafa', borderRadius: 6, borderColor: '#ebebeb', borderWidth: 1}}>
                  <View style={{width: '100%', height: 20, paddingLeft: 20}}>
                    <Text>
                      <Text style={{fontWeight: '500'}}>{this.state.newMsg.from.split("|")[0]} </Text>
                      <Text style={{fontSize: 12}}>{this.state.newMsg.createdAt.slice(12, 20)}</Text>
                    </Text>
                  </View>
                  <View style={{width: '100%', height: 20, paddingLeft: 20, paddingRight: 20}}>
                    <Text ellipsizeMode="tail" numberOfLines={1}>{this.state.newMsg.body}</Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View style={{flexDirection: 'row', backgroundColor: 'white', width: DEVICE_WIDTH, height: 40}}>
            <TextInput style={{width: (DEVICE_WIDTH-80), height: 40, borderWidth:1, borderColor: '#dfdfdf', paddingLeft: 20, paddingRight: 20}}
              selectionColor="#a2a2a2"
              placeholderTextColor="#a2a2a2"
              returnKeyType="done"
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              placeholder=" 메세지를 작성해주세요."
              onChangeText={(text)=>{this.setState({myText: text})}}
              value={this.state.myText}
              ref="textBox"
            />
            <TouchableOpacity onPress={this.sendText}
              style={{width: 80, height: 40, backgroundColor: "#dfdfdf", justifyContent: 'center', alignItems:'center'}}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      case "수요일":
      return (
        <View style={styles.container}>
          <Animated.View style={{width: DEVICE_WIDTH, height: this.kHeight}}>
            <FlatList
              onEndReachedThreshold={1.5}
              style={{flex: 1, width: DEVICE_WIDTH, backgroundColor: "white", paddingBottom: 10}}
              data={this.props.messagesWed}
              ref="chatList"
              ListEmptyComponent={()=>{
                return (
                  <View style={{width: DEVICE_WIDTH, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:16}}>아직 메세지가 없습니다.</Text>
                  </View>
                );
              }}

              keyExtractor={(item, i) => (i)}
              renderItem={({item}) => {
                // 내가 쓴 메세지인 경우 오른쪽에 출력
                if (item.from.split("|")[0] == this.props.user.split("|")[0]) {
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, justifyContent: 'flex-end',  alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingRight: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'right', paddingRight: 5}}>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>   {item.createdAt.slice(12, 20)}   </Text>
                            <Text style={{fontWeight: '500'}} >{item.from.split("|")[0]}  </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#FFEFEA', borderRadius: 5, borderColor: '#FFEFEA', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                } else {
                  // 내가 쓴 메세지가 아닐 경우 왼쪽에 출력
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingLeft: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'left', paddingLeft: 5}}>
                            <Text style={{fontWeight: '500'}}>{item.from.split("|")[0]}  </Text>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>{item.createdAt.slice(12, 20)}   </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#EAF8FF', borderRadius: 5, borderColor: '#EAF8FF', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                }
              }}
            />
            <TouchableOpacity onPress={this.scrollBtnClick} style={{width: DEVICE_WIDTH, height:45, position: 'absolute', left:0, bottom: 5, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
              {this.state.newMsg != null && this.state.newMsg.from.split("|")[0] != this.props.user.split("|")[0] ? (
                <View style={{width: '100%', height: 40, backgroundColor: '#fafafa', borderRadius: 6, borderColor: '#ebebeb', borderWidth: 1}}>
                  <View style={{width: '100%', height: 20, paddingLeft: 20}}>
                    <Text>
                      <Text style={{fontWeight: '500'}}>{this.state.newMsg.from.split("|")[0]} </Text>
                      <Text style={{fontSize: 12}}>{this.state.newMsg.createdAt.slice(12, 20)}</Text>
                    </Text>
                  </View>
                  <View style={{width: '100%', height: 20, paddingLeft: 20, paddingRight: 20}}>
                    <Text ellipsizeMode="tail" numberOfLines={1}>{this.state.newMsg.body}</Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View style={{flexDirection: 'row', backgroundColor: 'white', width: DEVICE_WIDTH, height: 40}}>
            <TextInput style={{width: (DEVICE_WIDTH-80), height: 40, borderWidth:1, borderColor: '#dfdfdf', paddingLeft: 20, paddingRight: 20}}
              selectionColor="#a2a2a2"
              placeholderTextColor="#a2a2a2"
              returnKeyType="done"
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              placeholder=" 메세지를 작성해주세요."
              onChangeText={(text)=>{this.setState({myText: text})}}
              value={this.state.myText}
              ref="textBox"
            />
            <TouchableOpacity onPress={this.sendText}
              style={{width: 80, height: 40, backgroundColor: "#dfdfdf", justifyContent: 'center', alignItems:'center'}}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      case "목요일":
      return (
        <View style={styles.container}>
          <Animated.View style={{width: DEVICE_WIDTH, height: this.kHeight}}>
            <FlatList
              onEndReachedThreshold={1.5}
              style={{flex: 1, width: DEVICE_WIDTH, backgroundColor: "white", paddingBottom: 10}}
              data={this.props.messagesThu}
              ref="chatList"
              ListEmptyComponent={()=>{
                return (
                  <View style={{width: DEVICE_WIDTH, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:16}}>아직 메세지가 없습니다.</Text>
                  </View>
                );
              }}

              keyExtractor={(item, i) => (i)}
              renderItem={({item}) => {
                // 내가 쓴 메세지인 경우 오른쪽에 출력
                if (item.from.split("|")[0] == this.props.user.split("|")[0]) {
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, justifyContent: 'flex-end',  alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingRight: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'right', paddingRight: 5}}>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>   {item.createdAt.slice(12, 20)}   </Text>
                            <Text style={{fontWeight: '500'}} >{item.from.split("|")[0]}  </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#FFEFEA', borderRadius: 5, borderColor: '#FFEFEA', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                } else {
                  // 내가 쓴 메세지가 아닐 경우 왼쪽에 출력
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingLeft: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'left', paddingLeft: 5}}>
                            <Text style={{fontWeight: '500'}}>{item.from.split("|")[0]}  </Text>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>{item.createdAt.slice(12, 20)}   </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#EAF8FF', borderRadius: 5, borderColor: '#EAF8FF', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                }
              }}
            />
            <TouchableOpacity onPress={this.scrollBtnClick} style={{width: DEVICE_WIDTH, height:45, position: 'absolute', left:0, bottom: 5, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
              {this.state.newMsg != null && this.state.newMsg.from.split("|")[0] != this.props.user.split("|")[0] ? (
                <View style={{width: '100%', height: 40, backgroundColor: '#fafafa', borderRadius: 6, borderColor: '#ebebeb', borderWidth: 1}}>
                  <View style={{width: '100%', height: 20, paddingLeft: 20}}>
                    <Text>
                      <Text style={{fontWeight: '500'}}>{this.state.newMsg.from.split("|")[0]} </Text>
                      <Text style={{fontSize: 12}}>{this.state.newMsg.createdAt.slice(12, 20)}</Text>
                    </Text>
                  </View>
                  <View style={{width: '100%', height: 20, paddingLeft: 20, paddingRight: 20}}>
                    <Text ellipsizeMode="tail" numberOfLines={1}>{this.state.newMsg.body}</Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View style={{flexDirection: 'row', backgroundColor: 'white', width: DEVICE_WIDTH, height: 40}}>
            <TextInput style={{width: (DEVICE_WIDTH-80), height: 40, borderWidth:1, borderColor: '#dfdfdf', paddingLeft: 20, paddingRight: 20}}
              selectionColor="#a2a2a2"
              placeholderTextColor="#a2a2a2"
              returnKeyType="done"
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              placeholder=" 메세지를 작성해주세요."
              onChangeText={(text)=>{this.setState({myText: text})}}
              value={this.state.myText}
              ref="textBox"
            />
            <TouchableOpacity onPress={this.sendText}
              style={{width: 80, height: 40, backgroundColor: "#dfdfdf", justifyContent: 'center', alignItems:'center'}}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      case "금요일":
      return (
        <View style={styles.container}>
          <Animated.View style={{width: DEVICE_WIDTH, height: this.kHeight}}>
            <FlatList
              onEndReachedThreshold={1.5}
              style={{flex: 1, width: DEVICE_WIDTH, backgroundColor: "white", paddingBottom: 10}}
              data={this.props.messagesFri}
              ref="chatList"
              ListEmptyComponent={()=>{
                return (
                  <View style={{width: DEVICE_WIDTH, height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:16}}>아직 메세지가 없습니다.</Text>
                  </View>
                );
              }}

              keyExtractor={(item, i) => (i)}
              renderItem={({item}) => {
                // 내가 쓴 메세지인 경우 오른쪽에 출력
                if (item.from.split("|")[0] == this.props.user.split("|")[0]) {
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, justifyContent: 'flex-end',  alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingRight: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'right', paddingRight: 5}}>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>   {item.createdAt.slice(12, 20)}   </Text>
                            <Text style={{fontWeight: '500'}} >{item.from.split("|")[0]}  </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#FFEFEA', borderRadius: 5, borderColor: '#FFEFEA', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                } else {
                  // 내가 쓴 메세지가 아닐 경우 왼쪽에 출력
                  return (
                    <View style={{width: DEVICE_WIDTH, minHeight: 70, alignItems: 'flex-end', flexDirection: 'row', marginBottom: 10}}>
                      <View style={{ maxWidth: DEVICE_WIDTH * 0.8, minHeight: 60, paddingLeft: 10}}>
                        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0)' }}>
                          <Text style={{ textAlign: 'left', paddingLeft: 5}}>
                            <Text style={{fontWeight: '500'}}>{item.from.split("|")[0]}  </Text>
                            <Text style={{ paddingRight: 10, color: "#9d9d9d", fontSize: 12}}>{item.createdAt.slice(12, 20)}   </Text>
                          </Text>
                        </View>
                        <View style={{ minHeight: 40,
                          backgroundColor: '#EAF8FF', borderRadius: 5, borderColor: '#EAF8FF', borderWidth: 1,
                          justifyContent: 'center', paddingLeft: 10, paddingRight: 10, paddingTop:4, paddingBottom: 6 }}
                        >
                          <Text>{item.body}</Text>
                        </View>
                      </View>
                    </View>);
                }
              }}
            />
            <TouchableOpacity onPress={this.scrollBtnClick} style={{width: DEVICE_WIDTH, height:45, position: 'absolute', left:0, bottom: 5, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
              {this.state.newMsg != null && this.state.newMsg.from.split("|")[0] != this.props.user.split("|")[0] ? (
                <View style={{width: '100%', height: 40, backgroundColor: '#fafafa', borderRadius: 6, borderColor: '#ebebeb', borderWidth: 1}}>
                  <View style={{width: '100%', height: 20, paddingLeft: 20}}>
                    <Text>
                      <Text style={{fontWeight: '500'}}>{this.state.newMsg.from.split("|")[0]} </Text>
                      <Text style={{fontSize: 12}}>{this.state.newMsg.createdAt.slice(12, 20)}</Text>
                    </Text>
                  </View>
                  <View style={{width: '100%', height: 20, paddingLeft: 20, paddingRight: 20}}>
                    <Text ellipsizeMode="tail" numberOfLines={1}>{this.state.newMsg.body}</Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View style={{flexDirection: 'row', backgroundColor: 'white', width: DEVICE_WIDTH, height: 40}}>
            <TextInput style={{width: (DEVICE_WIDTH-80), height: 40, borderWidth:1, borderColor: '#dfdfdf', paddingLeft: 20, paddingRight: 20}}
              selectionColor="#a2a2a2"
              placeholderTextColor="#a2a2a2"
              returnKeyType="done"
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              placeholder=" 메세지를 작성해주세요."
              onChangeText={(text)=>{this.setState({myText: text})}}
              value={this.state.myText}
              ref="textBox"
            />
            <TouchableOpacity onPress={this.sendText}
              style={{width: 80, height: 40, backgroundColor: "#dfdfdf", justifyContent: 'center', alignItems:'center'}}>
              <Text>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      );



    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

export {ChatRoomScreen};

const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    user: state.auth.user_token,
    messagesMon : state.enroll.messagesMon,
    messagesTue : state.enroll.messagesTue,
    messagesWed : state.enroll.messagesWed,
    messagesThu : state.enroll.messagesThu,
    messagesFri : state.enroll.messagesFri,
    webSocket: state.enroll.webSocket,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedChatRoomScreen  = connect(mapStateToProps, actions)(ChatRoomScreen);

export { connectedChatRoomScreen };
