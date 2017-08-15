import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import FinLogo from '../assets/signup_fin.png';
import { FontAwesome } from '@expo/vector-icons';
import { TouchButton } from '../components';


import { NavigationActions } from 'react-navigation';
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'login'})
  ]
});

class CardSendScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '가입 요청 완료',
      headerRight: (
       <View></View>
      ),
    }
  }

  goLogin = () => {
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.card}>
      <ScrollView>
        <View style={{width: DEVICE_WIDTH, alignItems: 'center'}}>
        <View style={{width: DEVICE_WIDTH * 0.9, minHeight: DEVICE_WIDTH * 0.9, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2', alignItems: 'center'}}>
          <View style={{width: DEVICE_WIDTH * 0.5, height: DEVICE_WIDTH * 0.5, marginTop: 20}}>
            <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={FinLogo}/>
          </View>
          <View style={{marginTop: 20, width: '80%'}}>
            <Text style={{color: '#303030', fontSize: 22, lineHeight: 25, marginBottom: 5}}>가입 요청이 완료되었습니다.</Text>
            <Text style={{color: '#303030', fontSize: 22, lineHeight: 25, marginBottom: 5}}>명함 속 주소로 인증 메일이</Text>
            <Text style={{color: '#303030', fontSize: 22, lineHeight: 25}}>곧 발송됩니다.</Text>
          </View>

        </View>

        <View style={{width: '90%', marginTop: 20}}>
          <Text style={{color: '#303030', fontSize: 18, marginBottom: 5}}>수작업으로 진행되므로 최대 30분의 시간이</Text>
          <Text style={{marginBottom: 5}}>
            <Text style={{color: '#303030', fontSize: 18, marginBottom: 5}}>소요됩니다. 메일의 </Text>
            <Text style={{color: '#fc5a5a', fontSize: 18, marginBottom: 5}}>'인증하기' </Text>
            <Text style={{color: '#303030', fontSize: 18, marginBottom: 5}}>링크를 클릭해</Text>
          </Text>
          <Text style={{color: '#303030', fontSize: 18}}>주세요.</Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={{color: '#767676', fontSize: 12}}>* 메일을 받지 못한 경우 스팸메일함을 확인해주세요.</Text>
        </View>

        {/* <View style={{marginBottom: 20}}>
          <Text style={styles.header}>가입 요청이 완료되었습니다.</Text>
          <Text style={styles.header}>명함 속 메일 주소로</Text>
          <Text style={styles.header}>인증 메일이 곧 발송됩니다!</Text>
        </View>


        <View style={{marginBottom: 20}}>
          <FontAwesome name="envelope" size={150} color="#f46958" />
        </View>


        <View style={styles.bcard}>
          <Text style={{fontSize: 16}}>수작업으로 진행되므로</Text>
            <Text style={{fontSize: 16}}> 최대 30분의 시간이 소요됩니다.</Text>
          <Text style={{fontSize: 16}}>메일의 '인증하기' 링크를 클릭해주세요.</Text>
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 14}}>메일을 받지 못하신 경우 스팸메일함을 확인해주세요.</Text>
        </View> */}

        <TouchButton onPress={this.goLogin}
          style={{marginBottom: 10, marginTop: 20}} btnWidth={"90%"} btnHeight={30} btnColor={"#f46958"}>
          <Text style={{color: 'white', fontSize: 14}}>로그인</Text>
        </TouchButton>
        </View>  
      </ScrollView>
      </View>
    )
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // backgroundColor: "#ebebeb",
    backgroundColor: "#fafafa",
    width: "100%",
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
  header: {
    fontSize: 26
  },

  bcard: {
    marginTop: 20,
    width: DEVICE_WIDTH * 0.8,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ebebeb",
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export { CardSendScreen };
