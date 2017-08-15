import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, Dimensions, Platform, StatusBar } from 'react-native';
import Title from '../assets/title_logo.png';
import { FontAwesome } from '@expo/vector-icons';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { CheckBox } from 'react-native-elements';
const DEVICE_WIDTH = Dimensions.get('window').width;

class SelectLocationScreen extends Component {

  checkboxToggle = () => {
    this.props.toggleLocationSave();
  }
  //

  static navigationOptions = ({navigation}) => {
    return {
      title: '장소 선택',
      tabBarLabel: 'Lunchting',
      header: <View style={{width: '100%', height:24, backgroundColor: '#ffffff'}}></View>,
      headerRight: (
       <TouchableOpacity style={{padding: 20}} onPress={()=>{navigation.navigate('seltime')}}>
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

  componentDidMount () {
    // 지도가 로드 다 되면 mapLoaded를 true로 세팅
    this.props.loadedMap();
  }

  onRegionChangeComplete = (region) => {
    this.props.updateMap(region);
  }

  // 사용자가 누른 곳에 핀 설정
  setPin = (e) => {
    // 클릭한 좌표
    let coor = e.nativeEvent.coordinate;
    console.log(coor);
    if (coor) {
      this.props.initializePin(coor);
    }
  }

  // 핀 드래그 시 핀과 범위 재설정
  onDragPin = (e) => {
    let coor = e.nativeEvent.coordinate;
    if (coor) {
      this.props.draggingPin(coor);
    }
  }

  renderPin = () => {
    if (this.props.pinStatus) {
      return (
      <View>
        <MapView.Circle strokeColor={"rgba(244, 105, 88,0.8)"}
          fillColor={"rgba(244, 105, 88,0.3)"} radius={350} center={this.props.pin}/>

        <MapView.Marker onDrag={ e => this.onDragPin(e) }
          draggable pinColor="rgb(244, 105, 88)"
          title="나의 근무지" description="도보 약 10분 기준이며 실제와 다를 수 있습니다."
          coordinate={this.props.pin}/>
      </View>
      );
    }
  }

  render() {
    console.log(this.props.region);
    if (!this.props.mapLoaded) {
      return (
        <View style={{flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
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
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('selday')}} style={{width: '20%', height: '100%', paddingLeft: DEVICE_WIDTH * 0.05, justifyContent: 'center'}}>
           <FontAwesome size={40} color={"#fc5a5a"} name="angle-left" />
         </TouchableOpacity>
         <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
           <Image style={{height: 40, resizeMode: 'contain'}} source={Title} />
         </View>
         <View style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
           <TouchableOpacity style={{width: '100%', height: '100%', paddingRight: DEVICE_WIDTH * 0.05, justifyContent: 'center', alignItems: 'flex-end'}} onPress={()=>{this.props.navigation.navigate('selfin')}}>
             <Text style={{color: '#fc5a5a', fontSize: 18}}>다음</Text>
           </TouchableOpacity>
         </View>
       </View>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          rotateEnabled={false} pitchEnabled={false}
          onPress={ e => this.setPin(e) }
          style={{ flex: 1 }}
          region={this.props.region}
          onRegionChangeComplete = {this.onRegionChangeComplete}
        >
        {this.renderPin()}
        </MapView>

        <View style={[styles.tipBox, {top:50}]}>
          <Text style={{fontSize: 17}}>런치팅이 진행될 요일의 근무지를 선택해주세요.</Text>
          <Text style={{color: 'rgb(244, 105, 88)', fontSize: 13}}>지도를 터치하여 핀을 설정합니다.(길게 눌러서 드래그 가능)</Text>
        </View>
        <View style={[styles.tipBox, {height: 80, paddingTop: 10}]}>
          <Text style={{fontSize: 13}}>근무지로부터 도보로 약 10분 이내 거리의 상대와 매칭됩니다.</Text>
          <CheckBox
            containerStyle={{width:'80%', height: 40, borderColor: "rgba(0,0,0,0)",
             justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0)'}}
            title='이 위치를 기본 근무지 위치로 설정하기'
            onPress={this.checkboxToggle}
            iconType='material'
            checkedIcon='done'
            uncheckedIcon='crop-din'
            checkedColor='#fc5a5a'
            checked={this.props.locationSaved}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tipBox: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: 'center',
    alignItems: 'center'

  }
});

//
const mapStateToProps = (state, ownProps) => {
  return {
    // 스토어에서 스테이트를 가져와 props로 받아 사용
    mapLoaded: state.enroll.mapLoaded,
    region: state.enroll.region,
    pinStatus: state.enroll.pinStatus,
    pin: state.enroll.pin,
    locationSaved: state.enroll.locationSaved

  };
};

// actions = { 액션1, 액션2, ... } 처럼 연결되고, this.props.액션명1 처럼 사용가능
const connectedSelectLocationScreen  = connect(mapStateToProps, actions)(SelectLocationScreen);

export { connectedSelectLocationScreen };
