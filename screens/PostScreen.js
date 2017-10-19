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
class PostScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '게시글',
      header: Platform.OS == 'android' ? (<View style={{width: '100%', height:0, backgroundColor: '#ffffff'}}></View>) : (<View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>),
      headerRight: (
       <View></View>
      ),
    }
  }

  state = {
    loading : false,
    post : null,
    commentText: '',
    commentLoading: false,
    deleteLoading: false,
    deleteComment: null,
    deletePostLoading: false,
    likeLoading: false,

  }

  componentWillMount () {

    this.setState({loading : true}, () => {

      let formdata = new FormData();
      formdata.append("token", this.props.user);
      formdata.append("id", this.props.navigation.state.params.id);

      fetch('https://www.lunchting.com/app/get_post', {
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
          console.log(resJSON.data);

          // for (var i in resJSON.data) {
          //   for (const key of Object.keys(resJSON.data[i])) {
          //     if (resJSON.data[i]["gender"] == "m") {
          //       resJSON.data[i]["gender"] = "male"
          //     } else {
          //       resJSON.data[i]["gender"] = "female"
          //     }
          //   }
          // }

          this.setState({post : resJSON.data, loading: false})

        } else {
          this.setState({searchLoading: false});
          if (resJSON.status == "no-data") {
            console.log('더 이상 데이터가 없습니다.');
          } else {
            // 상태가 ok가 아닌 경우. fail.
            console.log(resJSON.msg);
          }
        }
      })
      .catch((error) => {
        console.log('진짜 에러 발생')
        console.log(error);
      })

    });

  }

  setPost = () => {
    this.setState({loading : true}, () => {

      let formdata = new FormData();
      formdata.append("token", this.props.user);
      formdata.append("id", this.props.navigation.state.params.id);

      fetch('https://www.lunchting.com/app/get_post', {
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
          console.log(resJSON.data);

          // for (var i in resJSON.data) {
          //   for (const key of Object.keys(resJSON.data[i])) {
          //     if (resJSON.data[i]["gender"] == "m") {
          //       resJSON.data[i]["gender"] = "male"
          //     } else {
          //       resJSON.data[i]["gender"] = "female"
          //     }
          //   }
          // }

          this.setState({post : resJSON.data, loading: false})

        } else {
          this.setState({searchLoading: false});
          if (resJSON.status == "no-data") {
            console.log('더 이상 데이터가 없습니다.');
          } else {
            // 상태가 ok가 아닌 경우. fail.
            console.log(resJSON.msg);
          }
        }
      })
      .catch((error) => {
        console.log('진짜 에러 발생')
        console.log(error);
      })

    });
  }

  likePostToggle = () => {
    console.log('좋아요 토글');
    this.setState({likeLoading: true}, () => {

    let formdata = new FormData();
    formdata.append("token", this.props.user);
    formdata.append("id", this.state.post.id);

    fetch('https://www.lunchting.com/app/like_toggle', {
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
        console.log(resJSON.data);

        this.setState({likeLoading: false, post : resJSON.data,})

      } else {
        this.setState({likeLoading: false});
        if (resJSON.status == "no-data") {
          console.log('더 이상 데이터가 없습니다.');
        } else {
          // 상태가 ok가 아닌 경우. fail.
          console.log(resJSON.msg);
        }
      }
    })
    .catch((error) => {
      this.setState({likeLoading: false,});
      console.log('진짜 에러 발생')
      console.log(error);
    })

    })


  }

  writeComment = () => {
    this.setState({commentLoading: true}, () => {

    let formdata = new FormData();
    formdata.append("token", this.props.user);
    formdata.append("id", this.state.post.id);
    formdata.append("content", this.state.commentText);

    fetch('https://www.lunchting.com/app/write_comment', {
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
        console.log(resJSON.data);

        this.setState({commentLoading: false, post : resJSON.data, commentText: ''})

      } else {
        this.setState({commentLoading: false});
        if (resJSON.status == "no-data") {
          console.log('더 이상 데이터가 없습니다.');
        } else {
          // 상태가 ok가 아닌 경우. fail.
          console.log(resJSON.msg);
        }
      }
    })
    .catch((error) => {
      this.setState({commentLoading: false,});
      console.log('진짜 에러 발생')
      console.log(error);
    })

    })
  }

  deleteComment = (id) => {

    this.setState({deleteLoading: true, deleteComment: id}, () => {

      let formdata = new FormData();
      formdata.append("token", this.props.user);
      formdata.append("id", this.state.post.id);
      formdata.append("comment_id", id);

      fetch('https://www.lunchting.com/app/delete_comment', {
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
          console.log(resJSON.data);

          this.setState({deleteLoading: false, deleteComment: null, post : resJSON.data, commentText: ''})

        } else {
          this.setState({deleteLoading: false, deleteComment: null,});
          if (resJSON.status == "no-data") {
            console.log('더 이상 데이터가 없습니다.');
          } else {
            // 상태가 ok가 아닌 경우. fail.
            console.log(resJSON.msg);
          }
        }
      })
      .catch((error) => {
        this.setState({deleteLoading: false,deleteComment: null,});
        console.log('진짜 에러 발생')
        console.log(error);
      })

    })
  }

  deletePost = (id) => {

    this.setState({deletePostLoading: true}, () => {

      let formdata = new FormData();
      formdata.append("token", this.props.user);
      formdata.append("id", id);

      fetch('https://www.lunchting.com/app/delete_post', {
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
          // console.log(resJSON.data);

          // this.setState({deletePostLoading: false, post : resJSON.data, commentText: ''})
          this.props.refreshPostsFunction();
          this.props.navigation.navigate('community');

        } else {
          this.setState({deletePostLoading: false,});
          if (resJSON.status == "no-data") {
            console.log('더 이상 데이터가 없습니다.');
          } else {
            // 상태가 ok가 아닌 경우. fail.
            console.log(resJSON.msg);
          }
        }
      })
      .catch((error) => {
        this.setState({deletePostLoading: false,});
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


        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '100%', paddingTop: 20, minHeight: 70, borderBottomWidth: 1, borderColor: '#bdbdbd', alignItems: 'center'}}>
              <View style={{width: '90%', flexDirection: 'row', paddingBottom: 15}}>
                <Text>
                  <Text style={{fontSize: 16, color: '#4a4a4a'}}>{this.state.post.title}</Text>
                  {this.state.post.hits >= 100 ? (
                    <Text style={{color: '#ff5955', fontSize: 12}}>  HOT</Text>
                  ) : (
                    <Text style={{color: '#ff5955', fontSize: 12}}></Text>
                  )}
                </Text>
              </View>
              <View style={{width: '90%', flexDirection: 'row', paddingBottom: 7}}>
                <View style={{maxWidth: '50%', height: 14, flexDirection: 'row'}}>
                  <View style={{justifyContent: 'center', height: '100%'}}>
                    {this.state.post.gender == "m" ? (
                      <Text style={{fontSize: 5, color: '#00a5b1'}}>● </Text>
                    ) : (
                      <Text style={{fontSize: 5, color: '#ff5955'}}>● </Text>
                    )}
                  </View>
                  <View style={{height: '100%', justifyContent: 'center'}}>
                    <Text style={{color: '#a0a0a0', fontSize: 12}}> {this.state.post.nickname}  </Text>
                  </View>
                </View>
                <View style={{height: 14, justifyContent: 'flex-end', flex: 1, flexDirection: 'row',alignItems: 'center'}}>
                  <View style={{height: 14, flex:1, justifyContent: 'center'}}>
                    <Text style={{color: '#a0a0a0', fontSize: 12, textAlign: 'right'}}>
                      {this.state.post.created_at}  조회수 {this.state.post.hits}
                    </Text>
                  </View>
                  {this.state.post.nickname == this.props.user.split("|")[0] ? (
                    this.state.deletePostLoading == false ? (
                      <TouchableOpacity onPress={()=>{this.deletePost(this.state.post.id)}} style={{width: 35, height: 14, justifyContent: 'center', alignItems: 'flex-end', }}>
                        <Text style={{fontSize: 12, color: '#a0a0a0'}}> 삭제 </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={{width: 35, height: 14, justifyContent: 'center', alignItems: 'flex-end', }}>
                        <ActivityIndicator size="small" color={"#a0a0a0"}/>
                      </View>
                    )

                  ) : (
                    <TouchableOpacity style={{width: 35, height: 14, justifyContent: 'center', alignItems: 'flex-end', }}>
                      <FontAwesome size={12} color={"#fc5a5a"} name="ban" />
                    </TouchableOpacity>
                  )}
                </View>

              </View>
            </View>
            <View style={{marginBottom: 12 ,width: '100%', minHeight: 70, borderBottomWidth: 1, borderColor: '#bdbdbd', alignItems: 'center'}}>
              <View style={{width: '90%', paddingTop: 25, paddingBottom: 10}}>
                <Text>{this.state.post.content}</Text>
              </View>
              <View style={{width: '90%', paddingBottom: 15}}>

                <View style={{height: 30, width: '100%', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                  {this.state.likeLoading == false ? (
                    this.state.post.liked == false ? (
                      <TouchableOpacity onPress={this.likePostToggle} style={{flexDirection:'row'}}>
                        <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={{width: 16, height: 16, resizeMode: 'contain'}} source={LikeButton} />
                        </View>
                        <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 14, color: '#fc5a5a'}}>{this.state.post.likeCount} </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={this.likePostToggle} style={{flexDirection:'row'}}>
                        <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={{width: 16, height: 16, resizeMode: 'contain'}} source={LikedButton} />
                        </View>
                        <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{fontSize: 14, color: '#fc5a5a'}}>{this.state.post.likeCount} </Text>
                        </View>
                      </TouchableOpacity>
                    )

                  ) : (
                    <View onPress={this.likePostToggle} style={{flexDirection:'row'}}>
                      <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{width: 16, height: 16, resizeMode: 'contain'}} source={LikeButton} />
                      </View>
                      <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="small" color={"#fc5a5a"}/>
                      </View>
                    </View>
                  )}


                  <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 16, height: 16, resizeMode: 'contain'}} source={CommentButton} />
                  </View>
                  <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 14, color: '#00a5b1'}}>{this.state.post.commentCount} </Text>
                  </View>
                </View>

              </View>
            </View>

            {/* <View style={{padding: 6, borderWidth: 1, borderColor: '#ededed', width: '90%', minHeight: 60, backgroundColor: '#fafafa'}}>
              <View style={{width: '100%', minHeight: 20}}>
                <Text>

                </Text>
              </View>
            </View> */}

            {this.state.post.comments.map((comment, i)=>{
              return (
                <View key={i} style={{padding: 8, borderWidth: 1, borderColor: '#ededed', width: '90%', minHeight: 60, backgroundColor: '#fafafa'}}>
                  <View style={{width: '100%', height: 20, flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', height: '100%'}}>
                      {comment.gender == "m" ? (
                        <Text style={{fontSize: 5, color: '#00a5b1'}}>● </Text>
                      ) : (
                        <Text style={{fontSize: 5, color: '#ff5955'}}>● </Text>
                      )}
                    </View>
                    <View style={{justifyContent: 'center', height: '100%'}}>
                      <Text style={{color: '#4a4a4a', fontSize: 12}}> {comment.nickname}  </Text>
                    </View>
                    <View style={{justifyContent: 'center', height: '100%'}}>
                      <Text style={{color: '#a0a0a0', fontSize: 12}}> {comment.created_at}  </Text>
                    </View>
                    <View style={{justifyContent: 'center', height: '100%', flex:1, alignItems: 'flex-end'}}>
                      {comment.nickname == this.props.user.split("|")[0] ? (
                        this.state.deleteLoading == true && this.state.deleteComment == comment.id ? (
                          <View style={{height: '100%', width: 35, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="small" color={"#a0a0a0"} />
                          </View>
                        ) : (
                          <TouchableOpacity onPress={()=>{this.deleteComment(comment.id)}} style={{height: '100%', width: 35, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 12, color: '#a0a0a0'}}>삭제</Text>
                          </TouchableOpacity>
                        )
                      ) : (
                        <View></View>
                      )}
                    </View>
                  </View>
                  <View style={{width: '100%',}}>
                    <Text>{comment.content}</Text>
                  </View>
                </View>
              );
            })}

            <View style={{width: DEVICE_WIDTH, height: 38, flexDirection: 'row', marginTop: 13}}>
              <View style={{height: 38, flex: 1, backgroundColor: '#f4f4f4'}}>
                <TextInput style={{width: '100%', height: '100%', paddingLeft: 20, paddingRight: 20, fontSize: 14}}
                  onSubmitEditing={this.writeComment}
                  selectionColor="#a2a2a2"
                  placeholderTextColor="#a2a2a2"
                  returnKeyType="send"
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  underlineColorAndroid={"rgba(0,0,0,0)"}
                  placeholder=" 댓글을 입력해주세요."
                  onChangeText={(text)=>{this.setState({commentText: text})}}
                  value={this.state.commentText}
                  ref="commentBox"
                />
              </View>
              <View style={{width: 38, height: 38}}>
                {this.state.commentLoading == false ? (
                  <TouchableOpacity onPress={this.writeComment} style={{width: '100%', height: '100%', backgroundColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 17, height: 26, resizeMode: 'contain'}} source={WriteCommentButton} />
                  </TouchableOpacity>
                ) : (
                  <View style={{width: '100%', height: '100%', backgroundColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="small" color={"white"} />
                  </View>
                )}
              </View>
            </View>







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
  settingMenu: {
    width: '100%',
    height: 50,

    borderBottomWidth: 2,
    borderColor: '#ebebeb',
    flexDirection: 'row',
  },
  settingIcon: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingSubmenu: {
    flex:6,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  settingSubLink: {
    flex:2,
    justifyContent: 'center'
  },
  linkBox: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    paddingLeft: 20
  },
  settingFont: {
    fontSize: 16
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    user: state.auth.user_token,
    refreshPostsFunction: state.community.refreshPostsFunction,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedPostScreen  = connect(mapStateToProps, actions)(PostScreen);

export { connectedPostScreen };
