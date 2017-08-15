import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';

import { TouchButton } from '../components';
import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'main'})
  ]
});

class SelectFinishScreen extends Component {

  state = {
    address: '주소를 찾는 중입니다...',
    enrollLoading: false,
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: '신청 항목 확인',
      tabBarLabel: 'Lunchting',

      headerRight:(<View></View>),
      tabBarIcon: ({ tintColor, focused }) => (
      <FontAwesome
        name={'heart'}
        size={25}
        style={{ color: tintColor }}
      />)
    }
  }

  getLocation = async () => {

    let requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    let res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.pin.latitude + ',' + this.props.pin.longitude + '&language=ko', requestOptions);
    let resJSON = await res.json();
    console.log(resJSON.results[0].formatted_address);
    let address = resJSON.results[0].formatted_address;

    console.log(address.split(' ').slice(1, this.length).join(" "));
    address = address.split(' ').slice(1, this.length).join(" ");

    this.setState({address});
    console.log('hihihihihi');
    console.log(this.props.pin.latitude);
    console.log(this.props.pin.longitude);

  }

  componentDidMount () {
    this.getLocation();
  }

  goHome = () => {
    // TODO 여기서 데이터도 적합한 데이터인지 검증한다.
    // TODO 여기서 레일즈 서버로 신청 데이터를 날리고 처리되면 홈으로 돌아간다.


    this.setState({enrollLoading: true}, () => {

      let formdata = new FormData();
      formdata.append("token", this.props.user);
      formdata.append("enrolledPeople", JSON.stringify(this.props.enrolledPeople));
      formdata.append("peopleCount", this.props.peopleCount.toString());
      formdata.append("location", JSON.stringify(this.props.pin));
      // formdata.append("startTime", moment(this.props.startTime, 'HH:mm A').format("HH:mm A"));
      // formdata.append("endTime", moment(this.props.endTime, 'HH:mm A').format("HH:mm A"));
      let lunchtime = {start: moment(this.props.startTime, 'HH:mm A').format("HH:mm A"),
        finish: moment(this.props.endTime, 'HH:mm A').format("HH:mm A")
      };
      formdata.append("lunchtime", JSON.stringify(lunchtime));
      formdata.append("week", moment().day(8).format("YYYYMMDD"));
      formdata.append("day", JSON.stringify(this.props.selectedDays));
      formdata.append("timeSaved", this.props.timeSaved);
      formdata.append("locationSaved", this.props.locationSaved);
      // JSON.stringify(lunchtime)

      fetch('http://www.lunchting.com/app/enroll_group', {
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
          this.setState({enrollLoading: false});

          this.props.enrollFinish();
          this.props.navigation.dispatch(resetAction);
        } else {
          console.log(resJSON.msg);
          this.setState({enrollLoading: false});
        }
      })
      .catch((error) => {
        this.setState({enrollLoading: false});
        console.log('진짜 에러 발생')
        console.log(error);
      })

    })

    // this.setState({enrollLoading: true});
    // setTimeout(()=>{
    //   this.setState({enrollLoading: false});
    //   this.props.enrollFinish();
    //   this.props.navigation.dispatch(resetAction);
    // }, 3000);







    // this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={[styles.sectionHeader, {marginTop: 15}]}>
          <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.sectionHeaderText}>인원</Text>
          </View>
          <View style={{flex:6, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: '#5c5c5c'}}>
              {this.props.peopleCount} 명
            </Text>
          </View>
          <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('meet')}} style={{width: 45, height: 25, borderRadius: 10, borderColor: '#fc5a5a', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#fc5a5a'}}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={[styles.sectionHeader4, {marginBottom: 15}]}>

          <View style={[styles.sectionHeader3, {height: 75}]}>
            <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.sectionHeaderText}>요일</Text>
            </View>
            <View style={{flex:6, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{flex:1, width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>

                {this.props.selectedDays.mon ? (
                  <View style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, paddingBottom: 9, color: '#5c5c5c'}}>월</Text>
                    <View style={{borderTopWidth: 1, borderColor: '#d2d2d2', maxWidth: 40, minWidth: 30, flex: 1, height: 4}}></View>
                    <Text style={{fontSize: 12, color: '#5c5c5c'}}>{moment().day(8).format("MM.DD")}</Text>

                  </View>
                ) : (
                  <Text></Text>
                )}
                {this.props.selectedDays.tue ? (
                  <View style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, paddingBottom: 9, color: '#5c5c5c'}}>화</Text>
                    <View style={{borderTopWidth: 1, borderColor: '#d2d2d2', maxWidth: 40, minWidth: 30, flex: 1, height: 4}}></View>
                    <Text style={{fontSize: 12, color: '#5c5c5c'}}>{moment().day(9).format("MM.DD")}</Text>

                  </View>
                ) : (
                  <Text></Text>
                )}
                {this.props.selectedDays.wed ? (
                  <View style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, paddingBottom: 9, color: '#5c5c5c'}}>수</Text>
                    <View style={{borderTopWidth: 1, borderColor: '#d2d2d2', maxWidth: 40, minWidth: 30, flex: 1, height: 4}}></View>
                    <Text style={{fontSize: 12, color: '#5c5c5c'}}>{moment().day(10).format("MM.DD")}</Text>

                  </View>
                ) : (
                  <Text></Text>
                )}
                {this.props.selectedDays.thu ? (
                  <View style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, paddingBottom: 9, color: '#5c5c5c'}}>목</Text>
                    <View style={{borderTopWidth: 1, borderColor: '#d2d2d2', maxWidth: 40, minWidth: 30, flex: 1, height: 4}}></View>
                    <Text style={{fontSize: 12, color: '#5c5c5c'}}>{moment().day(11).format("MM.DD")}</Text>

                  </View>
                ) : (
                  <Text></Text>
                )}
                {this.props.selectedDays.fri ? (
                  <View style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, paddingBottom: 9, color: '#5c5c5c'}}>금</Text>
                    <View style={{borderTopWidth: 1, borderColor: '#d2d2d2', maxWidth: 40, minWidth: 30, flex: 1, height: 4}}></View>
                    <Text style={{fontSize: 12, color: '#5c5c5c'}}>{moment().day(12).format("MM.DD")}</Text>

                  </View>
                ) : (
                  <Text></Text>
                )}



              </View>
            </View>
            <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('selday')}} style={{width: 45, height: 25, borderRadius: 10, borderColor: '#fc5a5a', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fc5a5a'}}>수정</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionHeader3}>
            <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.sectionHeaderText}>시간</Text>
            </View>
            <View style={{flex:6, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, color: '#5c5c5c'}}>
                {this.props.startTime} - {this.props.endTime}
              </Text>
            </View>
            <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
              {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate('seltime')}} style={{width: 45, height: 25, borderRadius: 10, borderColor: '#fc5a5a', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fc5a5a'}}>수정</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>



        <View style={styles.sectionHeader2}>
          <View style={{width: '100%', height: 20, marginBottom: 5, paddingLeft: '5%', justifyContent: 'center'}}>
            <Text style={styles.sectionHeaderText}>위치</Text>
          </View>

          <View style={styles.mapBox}>
            <MapView
              provider={MapView.PROVIDER_GOOGLE}
              rotateEnabled={false} pitchEnabled={false} scrollEnabled={false} zoomEnabled={false}
              cacheEnabled={true}
              style={{ flex: 1 }}
              initialRegion={{...this.props.pin, latitudeDelta: 0.00706749106070248, longitudeDelta: 0.00554010272026062}}
              litemode={true}
              >
                <View>
                  <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"}
                    fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.props.pin}/>

                  <MapView.Marker
                    pinColor="rgb(244, 105, 88)"
                    coordinate={this.props.pin}/>
                </View>
            </MapView>
          </View>

          <View style={{width: '100%', height: 25, flexDirection: 'row'}}>
            <View style={{width: '75%', height: '100%', paddingLeft: '5%', justifyContent: 'center'}}>
              <Text numberOfLines={2} ellipsizeMode={"tail"}>
                {this.state.address}
              </Text>
            </View>
            <View style={{width: '25%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('selloca')}} style={{width: 45, height: 25, borderRadius: 10, borderColor: '#fc5a5a', borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fc5a5a'}}>수정</Text>
              </TouchableOpacity>
            </View>
          </View>




              </View>
        <View>
          {/* <View style={styles.mapBox}>
            <MapView
              provider={MapView.PROVIDER_GOOGLE}
              rotateEnabled={false} pitchEnabled={false} scrollEnabled={false} zoomEnabled={false}
              cacheEnabled={true}
              style={{ flex: 1 }}
              initialRegion={{...this.props.pin, latitudeDelta: 0.00706749106070248, longitudeDelta: 0.00554010272026062}}
              litemode={true}
            >
              <View>
                <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"}
                  fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.props.pin}/>

                <MapView.Marker
                  pinColor="rgb(244, 105, 88)"
                  coordinate={this.props.pin}/>
              </View>
            </MapView>
          </View> */}





        </View>


        {this.state.enrollLoading == false ? (
          <TouchButton onPress={this.goHome}
            style={{marginBottom: 10}} btnWidth={"90%"} btnHeight={30} btnColor={"#f46958"}>
            <Text style={{color: 'white', fontSize: 14}}>신청하기</Text>
          </TouchButton>
        ) : (
          <View style={{width: '90%', height: 30, backgroundColor: '#f46958', borderRadius: 6, justifyContent: 'center', alignItems : 'center'}}>
            <ActivityIndicator size="small" color={"white"} />
          </View>
        )}

      </View>
    )
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa'

  },
  sectionHeader: {
    width: "90%",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: "#d2d2d2",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  sectionHeader3: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionHeader4: {
    width: "90%",
    alignItems: 'center',
    borderColor: "#d2d2d2",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingTop: 5,
    paddingBottom: 5,
  },
  sectionHeader2: {
    width: "90%",
    alignItems: 'center',
    marginBottom: 15,
    borderColor: "#d2d2d2",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white'
  },

  sectionHeaderText: {
    fontSize: 18,
    color: '#949494'
  },

  mapBox: {
    width: '90%',
    height: DEVICE_WIDTH * 0.5,
    backgroundColor: "#ebebeb",
    alignSelf: 'center',
    marginBottom: 15
  },
});

//
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
    enrolledPeople: state.enroll.enrolledPeople,
    user: state.auth.user_token,
    timeSaved: state.enroll.timeSaved,
    locationSaved: state.enroll.locationSaved,

  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedSelectFinishScreen  = connect(mapStateToProps, actions)(SelectFinishScreen);

export { connectedSelectFinishScreen };
