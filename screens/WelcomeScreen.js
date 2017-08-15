import React, { Component } from 'react';
import { Text, View } from 'react-native';


const SLIDE_DATA = [
  { text : ' 안녕하세요 첫 화면입니다. 넘겨주세요. ', color : '#03A9F4'},
  { text : ' 두 번째 페이지 입니다. 다음으로 갑시다.', color : '#009688'},
  { text : ' 마지막 페이지입니다. 버튼을 눌러 주세요. ' , color : '#03A9F4'},
];

class WelcomeScreen extends Component {


  onSlideComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      // <Slides onComplete={this.onSlideComplete} data={SLIDE_DATA}/>
        <View>
          <Text> WelcomeScreen </Text>
          <Text> WelcomeScreen </Text>
          <Text> WelcomeScreen </Text>
          <Text> WelcomeScreen </Text>
          <Text> WelcomeScreen </Text>
          <Text> WelcomeScreen </Text>
        </View>
    );
  }
}

export {WelcomeScreen};
