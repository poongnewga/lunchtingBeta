import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Platform, StatusBar, ActivityIndicator, ScrollView,
TextInput, } from 'react-native';
import LikeButton from '../assets/btn_like.png';
import LikedButton from '../assets/btn_liked.png';
import CommentButton from '../assets/btn_comment.png';
import WriteCommentButton from '../assets/comment_write.png';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Title from '../assets/title_logo.png';
const DEVICE_WIDTH = Dimensions.get('window').width;

class NewPostScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '새 글 작성하기',
      header: Platform.OS == 'android' ? (<View style={{width: '100%', height:0, backgroundColor: '#ffffff'}}></View>) : (<View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>),
      headerRight: (
       <View></View>
      ),
    }
  }

  state = {
    titleText: '',
    content: '',
    writeLoading: false,


  }

  writeNewPost = () => {
    this.setState({writeLoading: true}, () => {

    let formdata = new FormData();
    formdata.append("token", this.props.user);
    formdata.append("title", this.state.titleText);
    formdata.append("content", this.state.content);

    fetch('https://www.lunchting.com/app/write_new_post', {
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

        this.props.refreshPostsFunction();
        this.props.navigation.navigate('community');

      } else {
        this.setState({writeLoading: false});
        if (resJSON.status == "no-data") {
          console.log('더 이상 데이터가 없습니다.');
        } else {
          // 상태가 ok가 아닌 경우. fail.
          console.log(resJSON.msg);
        }
      }
    })
    .catch((error) => {
      this.setState({writeLoading: false,});
      console.log('진짜 에러 발생')
      console.log(error);
    })

    })
  }

  render() {

    if (this.state.loading == true) {
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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('community')}} style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome size={30} color={"#fc5a5a"} name="angle-left" />
            </TouchableOpacity>
            <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
            </View>
            <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

            </View>
          </View>


          <ScrollView contentContainerStyle={{width: DEVICE_WIDTH, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </ScrollView>
        </View>
      )
    }

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
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('community')}} style={{width: '20%', height: '100%', paddingLeft: DEVICE_WIDTH * 0.05, justifyContent: 'center'}}>
            <FontAwesome size={40} color={"#fc5a5a"} name="angle-left" />
          </TouchableOpacity>
          <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
          </View>
          <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

          </View>
        </View>


        <ScrollView bounces={false}>
          <View style={{alignItems: 'center', width: DEVICE_WIDTH}}>


            <View style={{width: '90%', height: 20 , marginTop: 15, flexDirection: 'row', marginBottom: 7}}>
              <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 5, color: '#ff5955'}}>● </Text>
              </View>
              <View>
                <Text style={{fontSize: 16, color: '#4a4a4a'}}> 제목</Text>
              </View>
            </View>

            <View style={{width: '90%', height: 35, marginBottom: 25, borderRadius: 6, borderWidth: 1, borderColor: '#bdbdbd'}}>
              <TextInput style={{width: '100%', height: '100%', paddingLeft: 20, paddingRight: 20, fontSize: 16}}
                selectionColor="#a5a5a5"
                placeholderTextColor="#a5a5a5"
                returnKeyType="done"
                autoCapitalize={'none'}
                autoCorrect={false}
                underlineColorAndroid={"rgba(0,0,0,0)"}
                placeholder=" 제목을 입력해주세요 :)"
                onChangeText={(text)=>{this.setState({titleText: text})}}
                value={this.state.titleText}
                ref="titleBox"
              />
            </View>

            <View style={{width: '90%', height: 20 , flexDirection: 'row', marginBottom: 7}}>
              <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 5, color: '#ff5955'}}>● </Text>
              </View>
              <View>
                <Text style={{fontSize: 16, color: '#4a4a4a'}}> 내용</Text>
              </View>
            </View>

            <View style={{width: '90%', paddingVertical: 10, height: 300, marginBottom: 25, borderRadius: 6, borderWidth: 1, borderColor: '#bdbdbd'}}>
              <TextInput style={{width: '100%', height: '100%', paddingLeft: 20, paddingRight: 20, fontSize: 16}}
                selectionColor="#a5a5a5"
                multiline={true}
                placeholderTextColor="#a5a5a5"

                autoCapitalize={'none'}
                autoCorrect={false}
                underlineColorAndroid={"rgba(0,0,0,0)"}
                placeholder=" 내용을 입력해주세요."
                onChangeText={(text)=>{this.setState({content: text})}}
                value={this.state.content}
                ref="contentBox"
              />
            </View>

            {this.state.writeLoading == false ? (
              <TouchableOpacity onPress={this.writeNewPost} style={{width: '90%', backgroundColor: '#ff7070', borderRadius: 10, height: 29, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 14}}>작성하기</Text>
              </TouchableOpacity>
            ) : (
              <View style={{width: '90%', backgroundColor: '#ff7070', borderRadius: 10, height: 29, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="small" color={'white'}/>
              </View>
            )}


            <View style={{width:DEVICE_WIDTH, height: 400}}>

            </View>


          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});


const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    user: state.auth.user_token,
    refreshPostsFunction: state.community.refreshPostsFunction,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedNewPostScreen  = connect(mapStateToProps, actions)(NewPostScreen);

export { connectedNewPostScreen };
