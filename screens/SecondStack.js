import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import io from 'socket.io-client/dist/socket.io';

import { GiftedChat } from 'react-native-gifted-chat';

export default class SecondStack extends React.Component {

  static navigationOptions = {
    title: 'Second Stack',
     messages: [],
  };

  constructor () {
    super();
    console.log("[34m 탭 스크린 생성자 호출");
    // this.socket = io('http://192.168.0.25:8000', {jsonp : false});
    // this.socket.on('resMsg',(msg)=>{
    //   this.setState({messages: [...this.state.messages, msg]});
    // });
  }


  state = {
    hee: '탭 스크린',
    messages: []
  }

  componentWillMount () {
    console.log("[36m 탭 스크린  컴포넌트 마운트 예정");
  }

  componentDidMount () {
    console.log("[32m 탭 스크린  컴포넌트 마운트 완료");
  }

  componentDidUpdate () {
    console.log("[32m 탭 스크린  컴포넌트 업데이트 완료");
  }

  // shouldComponentUpdate (p,nextState) {
  //   console.log("[35m 탭 스크린  컴포넌트 업데이트 여부 판단");
  //   if (this.state.hee != nextState.hee) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  componentWillUnmount () {
    console.log("[31m 탭 스크린  컴포넌트 제거 예정");
  }

  btnPress = () => {
    this.setState({hee: "heejae"});
  }

  goChat = () => {
    this.props.navigation.navigate('Chat', {title: '희햄'})
  }
  goChat2 = () => {
    this.props.navigation.navigate('Chat', {title: '희재'})
  }
  sendMsg = () => {
    this.socket.emit('newMsg', "hello there");
  }

  render() {
    console.log("[33m 탭 스크린  렌더링 시작");
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>{this.state.hee}</Text>
        <Text>{this.state.messages}</Text>

        <TouchableOpacity onPress={this.goChat} style={styles.button}>
          <Text>희햄과 채팅하러 가기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.goChat2} style={styles.button}>
          <Text>희재와 채팅하러 가기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.sendMsg} style={styles.button}>
          <Text>전송</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'cyan',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50
  }
});
