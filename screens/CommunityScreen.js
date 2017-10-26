import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Dimensions, Image, Platform, StatusBar, TextInput, ActivityIndicator} from 'react-native';
import Title from '../assets/title_logo.png';
import WriteButton from '../assets/btn_write.png';
import LikeButton from '../assets/btn_like.png';
import LikedButton from '../assets/btn_liked.png';
import CommentButton from '../assets/btn_comment.png';
const DEVICE_WIDTH = Dimensions.get('window').width;
import { Foundation, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommunityScreen extends Component {
  static navigationOptions = {
    title: '커뮤니티',
    headerLeft: (<View></View>),
    headerRight:(<View></View>),

    header: Platform.OS == 'android' ? (<View style={{width: '100%', height:0, backgroundColor: '#ffffff'}}></View>) : (<View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>),

    tabBarLabel: '커뮤니티',
    tabBarIcon: ({ tintColor, focused }) => (
    <Foundation
      name={'torsos-all'}
      size={25}
      style={{ color: tintColor }}
    />)

  }

  state = {
    searchText: "",
    searched: false,
    searchPage: 0,
    searchLoading: false,
    page: 0,
    loading: false,
    searchPosts: [],
    posts: [
    //   {
    //     title: '여자분들 이런 상황에서는 도대체...',
    //     from: '울고싶지않아',
    //     gender: 'male',
    //     viewCount: 150,
    //     likeCount: 120,
    //     commentCount: 34,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '이런 나 정상인가요?',
    //     from: '곧이직함',
    //     gender: 'female',
    //     viewCount: 80,
    //     likeCount: 24,
    //     commentCount: 20,
    //     created_at: "2017년 8월 2일"
    //   },
    //   {
    //     title: '연애 초반인데도 외로워요',
    //     from: '부먹찍먹다부질없다',
    //     gender: 'female',
    //     viewCount: 80,
    //     likeCount: 110,
    //     commentCount: 67,
    //     created_at: "2017년 8월 2일"
    //   },
    //   {
    //     title: '서로 바쁜데 괜찮나요?',
    //     from: '본능적으로',
    //     gender: 'male',
    //     viewCount: 120,
    //     likeCount: 85,
    //     commentCount: 24,
    //     created_at: "2017년 8월 3일"
    //   },
    //   {
    //     title: '나한테 관심이 있는건지 없는건지 휴..',
    //     from: '칼퇴그자체',
    //     gender: 'male',
    //     viewCount: 100,
    //     likeCount: 210,
    //     commentCount: 98,
    //     created_at: "2017년 8월 2일"
    //   },
    //   {
    //     title: '이거 그린라이트인가요??',
    //     from: '치킨',
    //     gender: 'female',
    //     viewCount: 80,
    //     likeCount: 73,
    //     commentCount: 17,
    //     created_at: "2017년 8월 2일"
    //   },
    //   {
    //     title: '대낮에 강남역 데이트 뭐할까요?',
    //     from: '그리움',
    //     gender: 'female',
    //     viewCount: 200,
    //     likeCount: 324,
    //     commentCount: 263,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '자존감이 낮아서..',
    //     from: '날떠나지마휴가',
    //     gender: 'male',
    //     viewCount: 170,
    //     likeCount: 423,
    //     commentCount: 201,
    //     created_at: "2017년 8월 2일"
    //   },
    //   {
    //     title: '헤어지려는데..',
    //     from: '새로운삶',
    //     gender: 'female',
    //     viewCount: 180,
    //     likeCount: 506,
    //     commentCount: 123,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '잔소리? 안하는게 좋겠죠??',
    //     from: '주량세병반',
    //     gender: 'male',
    //     viewCount: 50,
    //     likeCount: 164,
    //     commentCount: 84,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '대낮에 강남역 데이트 뭐할까요?',
    //     from: '그리움',
    //     gender: 'female',
    //     viewCount: 200,
    //     likeCount: 324,
    //     commentCount: 263,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '자존감이 낮아서..',
    //     from: '날떠나지마휴가',
    //     gender: 'male',
    //     viewCount: 170,
    //     likeCount: 423,
    //     commentCount: 201,
    //     created_at: "2017년 8월 2일"
    //   },
    //   {
    //     title: '헤어지려는데..',
    //     from: '새로운삶',
    //     gender: 'female',
    //     viewCount: 180,
    //     likeCount: 506,
    //     commentCount: 123,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '잔소리? 안하는게 좋겠죠??',
    //     from: '주량세병반',
    //     gender: 'male',
    //     viewCount: 50,
    //     likeCount: 164,
    //     commentCount: 84,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '대낮에 강남역 데이트 뭐할까요?',
    //     from: '그리움',
    //     gender: 'female',
    //     viewCount: 200,
    //     likeCount: 324,
    //     commentCount: 263,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '자존감이 낮아서..',
    //     from: '날떠나지마휴가',
    //     gender: 'male',
    //     viewCount: 170,
    //     likeCount: 423,
    //     commentCount: 201,
    //     created_at: "2017년 8월 2일"
    //   },
    //   {
    //     title: '헤어지려는데..',
    //     from: '새로운삶',
    //     gender: 'female',
    //     viewCount: 180,
    //     likeCount: 506,
    //     commentCount: 123,
    //     created_at: "2017년 8월 1일"
    //   },
    //   {
    //     title: '잔소리? 안하는게 좋겠죠??',
    //     from: '주량세병반',
    //     gender: 'male',
    //     viewCount: 50,
    //     likeCount: 164,
    //     commentCount: 84,
    //     created_at: "2017년 8월 1일"
    //   },
    ],
  }

  searchPost = () => {
    this.setState({searched: true});
    this.refreshSearchPosts();
  }

  getSearchPosts = () => {

    if (this.state.searchLoading == true) {
      console.log('서치 취소됨.');
      return false;
    }

    // 기존 페이지 + 1을 한 후, 해당 페이지에 대한 내용을 GET
    console.log('가저와야 할 서치페이지 : ', this.state.searchPage + 1);
    this.setState({searchLoading: true, searchPage: this.state.searchPage + 1,}, ()=>{
      let formdata = new FormData();
      formdata.append("token", this.props.user);
      formdata.append("query", this.state.searchText);
      formdata.append("page", this.state.searchPage);
      fetch('https://www.lunchting.com/app/get_search_page', {
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

          this.setState({searchPosts: [...this.state.searchPosts, ...resJSON.data], searchLoading: false})

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



    } );


  }

  refreshSearchPosts = () => {
    console.log(this.props.user);
    let formdata = new FormData();
    formdata.append("token", this.props.user);
    formdata.append("query", this.state.searchText);

    // 주소 변경 필요
    fetch('https://www.lunchting.com/app/refresh_search_posts', {
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

        this.setState({searchPosts: [...resJSON.data], searchPage: 1})

      } else {
        // 상태가 ok가 아닌 경우. fail.
        console.log(resJSON.msg);
      }
    })
    .catch((error) => {
      console.log('진짜 에러 발생')
      console.log(error);
    })

  }

  getPosts = () => {

    if (this.state.loading == true) {
      console.log('취소됨.');
      return false;
    }

    // 기존 페이지 + 1을 한 후, 해당 페이지에 대한 내용을 GET
    this.setState({loading: true, page: this.state.page + 1,}, ()=>{
      console.log('가저와야 할 페이지 : ', this.state.page);
      let formdata = new FormData();
      formdata.append("token", this.props.user);
      formdata.append("page", this.state.page);
      fetch('https://www.lunchting.com/app/get_page', {
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


          this.setState({posts: [...this.state.posts, ...resJSON.data], loading: false})

        } else {
          this.setState({loading: false});
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



    } );


  }

  refreshPosts = () => {
    console.log(this.props.user);
    let formdata = new FormData();
    formdata.append("token", this.props.user);

    // 주소 변경 필요
    fetch('https://www.lunchting.com/app/refresh_posts', {
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


        this.setState({posts: [...resJSON.data], page: 1})

      } else {
        // 상태가 ok가 아닌 경우. fail.
        console.log(resJSON.msg);
      }
    })
    .catch((error) => {
      console.log('진짜 에러 발생')
      console.log(error);
    })

  }

  goPost = (id) => {
    this.props.enrollRefreshPostsFunction(this.refreshPosts);
    console.log(id + '로 이동 ');
    this.props.navigation.navigate('post', {id: id});
  }

  writePost = () => {
    this.props.enrollRefreshPostsFunction(this.refreshPosts);
    this.props.navigation.navigate('newpost');
  }

  render() {
    // console.log(this.state.loading)

    if (this.state.searched == true && this.state.searchText != "") {
      return (
        <View style={{flex: 1}}>
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
          <View style={{width: DEVICE_WIDTH, height: 50, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingLeft: 10, paddingRight:10,}}>
            <View style={{width: '100%', height: "100%", borderWidth: 1, borderColor: '#a4a4a4', borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden', paddingRight: 10}}>
              <TextInput style={{width: (DEVICE_WIDTH-90), height: '100%', paddingLeft: 20, paddingRight: 20, fontSize: 14}}
                onSubmitEditing={this.searchPost}
                selectionColor="#a2a2a2"
                placeholderTextColor="#a2a2a2"
                returnKeyType="search"
                autoCapitalize={'none'}
                autoCorrect={false}
                underlineColorAndroid={"rgba(0,0,0,0)"}
                placeholder=" 검색어를 입력해주세요."
                onChangeText={(text)=>{this.setState({searchText: text})}}
                value={this.state.searchText}
                ref="searchBox"
              />
              <View style={{width: 60, height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Ionicons
                  name={'ios-search'}
                  size={20}
                  style={{ color: 'black' }}
                />
              </View>
            </View>
          </View>
          <FlatList
            ListFooterComponent={()=>{
              if (this.state.searchLoading == true) {
                return (
                  <View style={{width: DEVICE_WIDTH, height: 120, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" />
                  </View>
                );
              } else {
                return (
                  <View style={{width: DEVICE_WIDTH, height: 120, justifyContent: 'center', alignItems: 'center'}}>
                  </View>
                );
              }
            }}
            onEndReached={this.getSearchPosts}
            onEndReachedThreshold={0}
            onRefresh={this.refreshSearchPosts}
            refreshing={false}
            style={{flex: 1, width: DEVICE_WIDTH, backgroundColor: "white"}}
            data={this.state.searchPosts}
            ref="postList"
            ListEmptyComponent={()=>{
              return (
                <View style={{width: DEVICE_WIDTH, height: 200, justifyContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize:16}}>검색 결과가 없습니다.</Text>
                </View>
              );
            }}

            keyExtractor={(item, i) => (item.id)}
            renderItem={({item}) => { return (
              <View style={{width: DEVICE_WIDTH, height: 60, borderBottomWidth:1, borderColor: "#ebebeb"}}>
                <TouchableOpacity onPress={()=>{this.goPost(item.id)}} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={{width: '90%', height: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{height: 30, justifyContent: 'center', flexDirection: 'row'}}>
                      <View style={{height: 30, maxWidth: DEVICE_WIDTH * 0.5, justifyContent: 'center'}}>
                        <Text ellipsizeMode={"tail"} numberOfLines={1} >{item.title}  </Text>
                      </View>
                      <View style={{height: 30, justifyContent: 'center'}}>
                        {item.viewCount >= 100 ? (<Text style={{color: '#ff5955', fontSize: 10}}>HOT</Text>) : (<Text></Text>)}
                      </View>
                    </View>
                    <View style={{height: 30, justifyContent: 'center'}}>
                      <Text style={{fontSize: 10, color: '#a0a0a0'}}>{item.created_at}</Text>
                    </View>
                  </View>

                  <View style={{width: '90%', height: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{height: 30, justifyContent: 'center', flexDirection: 'row'}}>
                      <View style={{height: 30, justifyContent: 'center', flexDirection: 'row'}}>
                        <View style={{height: 30, justifyContent: 'center'}}>
                          {item.gender == 'f' ? (<Text style={{fontSize: 5, color: '#ff5955'}}>● </Text>) : (<Text style={{fontSize: 5, color: '#00a5b1'}}>● </Text>)}
                        </View>
                        <View style={{height: 30, justifyContent: 'center'}}>
                          <Text style={{color: '#a0a0a0'}}> {item.from}  </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{height: 30, justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                        {item.liked == false ? (
                        <Image style={{width: 14, height: 14, resizeMode: 'contain'}} source={LikeButton} />
                        ) : (
                        <Image style={{width: 14, height: 14, resizeMode: 'contain'}} source={LikedButton} />
                        )}
                      </View>
                      <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 12, color: '#fc5a5a'}}>{item.likeCount} </Text>
                      </View>
                      <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{width: 14, height: 14, resizeMode: 'contain'}} source={CommentButton} />
                      </View>
                      <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 12, color: '#00a5b1'}}>{item.commentCount} </Text>
                      </View>
                    </View>
                  </View>

                </TouchableOpacity>
              </View>
            ); }
            }
          />
          <TouchableOpacity onPress={this.writePost} style={{width: 50, height: 50, position: 'absolute', right: 20, bottom: 20,}}>
            <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={WriteButton} />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
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
        <View style={{width: DEVICE_WIDTH, height: 50, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingLeft: 10, paddingRight:10,}}>
          <View style={{width: '100%', height: "100%", borderWidth: 1, borderColor: '#a4a4a4', borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden', paddingRight: 10}}>
            <TextInput style={{width: (DEVICE_WIDTH-90), height: '100%', paddingLeft: 20, paddingRight: 20, fontSize: 14}}
              onSubmitEditing={this.searchPost}
              selectionColor="#a2a2a2"
              placeholderTextColor="#a2a2a2"
              returnKeyType="search"
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              placeholder=" 검색어를 입력해주세요."
              onChangeText={(text)=>{this.setState({searchText: text})}}
              value={this.state.searchText}
              ref="searchBox"
            />
            <View style={{width: 60, height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
              <Ionicons
                name={'ios-search'}
                size={20}
                style={{ color: 'black' }}
              />
            </View>
          </View>
        </View>
        <FlatList
          ListFooterComponent={()=>{
            if (this.state.loading == true) {
              return (
                <View style={{width: DEVICE_WIDTH, height: 120, justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" />
                </View>
              );
            } else {
              return (
                <View style={{width: DEVICE_WIDTH, height: 120, justifyContent: 'center', alignItems: 'center'}}>
                </View>
              );
            }
          }}
          onEndReached={this.getPosts}
          onEndReachedThreshold={0}
          onRefresh={this.refreshPosts}
          refreshing={false}
          style={{flex: 1, width: DEVICE_WIDTH, backgroundColor: "white"}}
          data={this.state.posts}
          ref="postList"
          ListEmptyComponent={()=>{
            return (
              <View style={{width: DEVICE_WIDTH, height: 200, justifyContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize:16}}>아직 게시물이 없습니다.</Text>
              </View>
            );
          }}

          keyExtractor={(item, i) => (item.id)}
          renderItem={({item}) => { return (
            <View style={{width: DEVICE_WIDTH, height: 60, borderBottomWidth:1, borderColor: "#ebebeb"}}>
              <TouchableOpacity onPress={()=>{this.goPost(item.id)}} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: '90%', height: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{height: 30, justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{height: 30, maxWidth: DEVICE_WIDTH * 0.5, justifyContent: 'center'}}>
                      <Text ellipsizeMode={"tail"} numberOfLines={1} >{item.title}  </Text>
                    </View>
                    <View style={{height: 30, justifyContent: 'center'}}>
                      {item.viewCount >= 100 ? (<Text style={{color: '#ff5955', fontSize: 10}}>HOT</Text>) : (<Text></Text>)}
                    </View>
                  </View>
                  <View style={{height: 30, justifyContent: 'center'}}>
                    <Text style={{fontSize: 10, color: '#a0a0a0'}}>{item.created_at}</Text>
                  </View>
                </View>

                <View style={{width: '90%', height: 30, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{height: 30, justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{height: 30, justifyContent: 'center', flexDirection: 'row'}}>
                      <View style={{height: 30, justifyContent: 'center'}}>
                        {item.gender == 'f' ? (<Text style={{fontSize: 5, color: '#ff5955'}}>● </Text>) : (<Text style={{fontSize: 5, color: '#00a5b1'}}>● </Text>)}
                      </View>
                      <View style={{height: 30, justifyContent: 'center'}}>
                        <Text style={{color: '#a0a0a0'}}> {item.from}  </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{height: 30, justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                      {item.liked == false ? (
                      <Image style={{width: 14, height: 14, resizeMode: 'contain'}} source={LikeButton} />
                      ) : (
                      <Image style={{width: 14, height: 14, resizeMode: 'contain'}} source={LikedButton} />
                      )}
                    </View>
                    <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 12, color: '#fc5a5a'}}>{item.likeCount} </Text>
                    </View>
                    <View style={{width: 20, height: 20, justifyContent: 'center', alignItems: 'center'}}>
                      <Image style={{width: 14, height: 14, resizeMode: 'contain'}} source={CommentButton} />
                    </View>
                    <View style={{height: 20, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 12, color: '#00a5b1'}}>{item.commentCount} </Text>
                    </View>
                  </View>
                </View>

              </TouchableOpacity>
            </View>
          ); }
          }
        />
        <TouchableOpacity onPress={this.writePost} style={{width: 50, height: 50, position: 'absolute', right: 20, bottom: 20,}}>
          <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={WriteButton} />
        </TouchableOpacity>
      </View>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    selectedDays: state.enroll.selectedDays,
    user: state.auth.user_token,
    chatDays: state.enroll.chatDays,
    enrollFinished: state.enroll.enrollFinished,

    // searchText: "",
    // searched: false,
    // searchPage: 0,
    // searchLoading: false,
    // page: 0,
    // loading: false,
    // searchPosts: [],
    // posts:
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedCommunityScreen  = connect(mapStateToProps, actions)(CommunityScreen);

export { connectedCommunityScreen };
