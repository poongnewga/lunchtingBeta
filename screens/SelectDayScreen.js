import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, StatusBar, Image, Dimensions, Platform} from 'react-native';
import Title from '../assets/title_logo.png';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
const DEVICE_WIDTH = Dimensions.get('window').width;

class SelectDayScreen extends Component {

  state = {
    language: '',
    dayErrorMsg: '',
    timeError: false,
    timeErrorMsg: "",
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: '요일 선택',
      header: <View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>,
      tabBarLabel: 'Lunchting',
      headerRight: (
       <TouchableOpacity style={{padding: 20}} onPress={()=>{navigation.navigate('selloca')}}>
         <Text style={{fontSize: 16, color: "#f46958"}}>다음</Text>
       </TouchableOpacity>
     ),
      tabBarIcon: ({ tintColor, focused }) => (
      <FontAwesome
        name={'heart'}
        size={25}
        style={{ color: tintColor }}
      />)
    }
  }

  toggleMon = () => {
    this.setState({dayErrorMsg: ""});
    this.props.toggleDays('mon');
  }
  toggleTue = () => {
    this.setState({dayErrorMsg: ""});
    this.props.toggleDays('tue');
  }
  toggleWed = () => {
    this.setState({dayErrorMsg: ""});
    this.props.toggleDays('wed');
  }
  toggleThu = () => {
    this.setState({dayErrorMsg: ""});
    this.props.toggleDays('thu');
  }
  toggleFri = () => {
    this.setState({dayErrorMsg: ""});
    this.props.toggleDays('fri');
  }

  validateDayAndTime = () => {
    if (this.props.selectedDays.mon == false && this.props.selectedDays.tue == false && this.props.selectedDays.wed == false && this.props.selectedDays.thu == false && this.props.selectedDays.fri == false ) {
      this.setState({dayErrorMsg: "요일을 반드시 선택해주세요."});
      return false;
    }

    if (this.state.timeError == true) {
      this.setState({timeErrorMsg: "올바른 시간을 선택해주세요."});
      return false;
    }



      let st = moment(this.props.startTime, 'h:mm A');
      let et = moment(this.props.endTime, 'h:mm A');

      if (et.isBefore(st)) {
        return false;

      } else {
        let diffMin = et.diff(st, 'minutes');

        if (diffMin < 60) {
          return false;
        } else {
          console.log('유효한 시간 ');

            //
        }
      }





    this.props.navigation.navigate('selloca');
  }

  // 시간 계산
  checkboxToggle = () => {
    this.props.toggleTimeSave();
  }

  calculTime = () => {

    let st = moment(this.props.startTime, 'h:mm A');
    let et = moment(this.props.endTime, 'h:mm A');

    if (et.isBefore(st)) {

      return (
        <Text style={{color: '#f46958'}}>시작 시간은 종료 시간보다 이른 시간이어야 합니다.</Text>
      );
    } else {
      let diffMin = et.diff(st, 'minutes');

      if (diffMin < 60) {

        return (
          <Text style={{color: '#f46958'}}>점심시간은 최소 1시간 이상이어야 합니다.</Text>
        )
      } else {
        console.log('유효한 시간 ');

        return (
          <Text style={{color: '#f46958'}}>
            {/* {diffMin} */}
          </Text>
        )      }
    }
  }



  render() {
    return (
      <View style={[styles.container, {alignItems: 'center',}]}>
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
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('meet')}} style={{width: '20%', height: '100%', paddingLeft: DEVICE_WIDTH * 0.05, justifyContent: 'center'}}>
           <FontAwesome size={40} color={"#fc5a5a"} name="angle-left" />
         </TouchableOpacity>
         <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
           <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
         </View>
         <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
           <TouchableOpacity style={{width: '100%', height: '100%', paddingRight: DEVICE_WIDTH * 0.05, justifyContent: 'center', alignItems: 'flex-end'}} onPress={this.validateDayAndTime}>
             <Text style={{color: '#fc5a5a', fontSize: 18}}>다음</Text>
           </TouchableOpacity>
         </View>
       </View>

        <View style={{width: '100%', height: 80, backgroundColor: 'white', justifyContent: 'center', paddingLeft: '10%'}}>
          <Text style={{ fontSize: 18, color: '#fc5a5a'}}>Step 2.</Text>
          <Text style={{ fontSize: 18, color: '#4a4a4a'}}>희망하는 요일을 모두 선택해주세요.</Text>
        </View>

        <View style={{width: '100%', minHeight: 100, paddingTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
          {!this.props.selectedDays.mon ? (
            <TouchableOpacity onPress={this.toggleMon} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#9f9f9f', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#9f9f9f'}}>월</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#9f9f9f'}}>{moment().day(8).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.toggleMon} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}>월</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#fc5a5a'}}>{moment().day(8).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          )}

          {!this.props.selectedDays.tue ? (
            <TouchableOpacity onPress={this.toggleTue} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#9f9f9f', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#9f9f9f'}}>화</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#9f9f9f'}}>{moment().day(9).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.toggleTue} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}>화</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#fc5a5a'}}>{moment().day(9).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          )}

          {!this.props.selectedDays.wed ? (
            <TouchableOpacity onPress={this.toggleWed} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#9f9f9f', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#9f9f9f'}}>수</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#9f9f9f'}}>{moment().day(10).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.toggleWed} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}>수</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#fc5a5a'}}>{moment().day(10).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          )}

          {!this.props.selectedDays.thu ? (
            <TouchableOpacity onPress={this.toggleThu} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#9f9f9f', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#9f9f9f'}}>목</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#9f9f9f'}}>{moment().day(11).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.toggleThu} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}>목</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#fc5a5a'}}>{moment().day(11).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          )}

          {!this.props.selectedDays.fri ? (
            <TouchableOpacity onPress={this.toggleFri} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#9f9f9f', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#9f9f9f'}}>금</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#9f9f9f'}}>{moment().day(12).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.toggleFri} style={{width: 40, height: 70, marginLeft: 6, marginRight: 6}}>
              <View style={{width: 40, height: 35, borderWidth: 1, borderRadius: 6, borderColor: '#fc5a5a', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#fc5a5a'}}>금</Text>
              </View>
              <View style={{width: 40, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 12, color: '#fc5a5a'}}>{moment().day(12).format("MM/DD")}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{height: 20, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: '#fc5a5a'}}>{this.state.dayErrorMsg}</Text>
        </View>

        <View style={{width: '100%', height: 80, backgroundColor: 'white', justifyContent: 'center', paddingLeft: '10%'}}>
          <Text style={{ fontSize: 18, color: '#fc5a5a'}}>Step 3.</Text>
          <Text style={{ fontSize: 18, color: '#4a4a4a'}}>희망하는 점심시간을 선택해주세요.</Text>
        </View>

        {/* 시간 */}

        <View style={{width: '80%', height: 30, marginBottom: 10, justifyContent: 'center', alignItems: 'center',}}>
          {this.calculTime()}
        </View>


        <DatePicker
          style={{width: "80%", marginBottom: 20, }}
          date={this.props.startTime}
          mode="time"
          format="hh:mm A"
          confirmBtnText="확인"
          cancelBtnText="취소"
          showIcon={true}
          iconComponent={(
            <View style={{height: '100%', width: 50,
               position: 'absolute', left: 0,
               justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: '#4a4a4a'}}>시작</Text>
            </View>
          )}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 50,
              borderColor: "#9f9f9f",
              backgroundColor: 'white',
              borderRadius: 6
            }
          }}
          minuteInterval={10}
          onDateChange={(time) => {this.props.changeStartTime(time);}}
        />

        <DatePicker
          style={{width: "80%", marginBottom: 20}}
          date={this.props.endTime}
          mode="time"
          format="hh:mm A"
          confirmBtnText="확인"
          cancelBtnText="취소"
          showIcon={true}
          iconComponent={(
            <View style={{height: '100%', width: 50,
               position: 'absolute', left: 0,
               justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: '#4a4a4a'}}>종료</Text>
            </View>
          )}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 50,
              borderColor: "#9f9f9f",
              backgroundColor: 'white',
              borderRadius: 6
            }
          }}
          minuteInterval={10}
          onDateChange={(time) => {this.props.changeEndTime(time);}}
        />

        <CheckBox
          containerStyle={{width:'80%', height: 40, justifyContent: 'center', borderColor: '#e4e4e4'}}
          title='이 시간을 기본 점심 시간으로 설정하기'
          onPress={this.checkboxToggle}
          iconType='material'
          checkedIcon='done'
          uncheckedIcon='crop-din'
          checkedColor='#fc5a5a'
          checked={this.props.timeSaved}
        />

        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fc5a5a'}}>{this.state.timeErrorMsg}</Text>
        </View>




      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fafafa'
    // paddingTop: 5

  },
  header: {
    width: "80%",
    height: 40,
    justifyContent: "center"

  },
  daysContainer: {
    // marginBottom: 10,
    // marginTop: 10,
    width: "90%",
    height: "20%",
    // backgroundColor: "#ebebeb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  day: {
    flex: 1
  },
  dayBox: {
    width: 40,
    height: 35,
    borderWidth: 1,
    borderColor: '#9f9f9f',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayHead: {
    fontSize: 14,
    paddingBottom: 20
  },
  dayText: {
    fontSize: 12
  },
  selectContainer: {
    width: "80%",
    height: 60,
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 5,

  },
  selectHead: {
    flex: 3,
    flexDirection: 'row'
  },
  selectBox: {
    flex: 7,
    paddingTop:2
  }
});


const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    selectedDays: state.enroll.selectedDays,
    timeSaved: state.enroll.timeSaved,
    startTime: state.enroll.startTime,
    endTime: state.enroll.endTime,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedSelectDayScreen  = connect(mapStateToProps, actions)(SelectDayScreen);

export { connectedSelectDayScreen };
