import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

import { connect } from 'react-redux';
import * as actions from '../actions';

class SelectTimeScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: '시간 선택',
      tabBarLabel: 'Lunchting',
      headerRight: (
       <TouchableOpacity style={{padding: 20}} onPress={()=>{navigation.navigate('selfin')}}>
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
      <View style={styles.container}>

        <View style={{width: '80%', height: 60, marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>희망하는 점심 시간을 선택해주세요.</Text>
        </View>

        <View style={{width: '80%', height: 40, marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
          {this.calculTime()}
        </View>


        <DatePicker
          style={{width: "80%", marginBottom: 30}}
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
              <Text style={{fontSize: 20}}>시작</Text>
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
              borderColor: "#ebebeb"
            }
          }}
          minuteInterval={10}
          onDateChange={(time) => {this.props.changeStartTime(time);}}
        />

        <DatePicker
          style={{width: "80%", marginBottom: 30}}
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
              <Text style={{fontSize: 20}}>종료</Text>
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
              borderColor: "#ebebeb"
            }
          }}
          minuteInterval={10}
          onDateChange={(time) => {this.props.changeEndTime(time);}}
        />

        <CheckBox
          containerStyle={{width:'80%', height: 40, justifyContent: 'center'}}
          title='이 시간을 기본 점심 시간으로 설정하기'
          onPress={this.checkboxToggle}
          iconType='material'
          checkedIcon='done'
          uncheckedIcon='crop-din'
          checkedColor='#2ef74d'
          checked={this.props.timeSaved}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    timeSaved: state.enroll.timeSaved,
    startTime: state.enroll.startTime,
    endTime: state.enroll.endTime,
  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedSelectTimeScreen  = connect(mapStateToProps, actions)(SelectTimeScreen);

export { connectedSelectTimeScreen };
