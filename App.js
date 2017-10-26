import React from 'react';
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator  } from 'react-navigation';
import { connectedAuthScreen, connectedSignUpScreen, connectedCardScreen, CardSendScreen, MapScreen, DeckScreen, ReviewScreen, SettingsScreen,
connectedHomeScreen, connectedChatScreen, MeetScreen, connectedCommunityScreen, connectedMyPageScreen,
connectedSelectPeopleScreen, connectedSelectDayScreen, connectedSelectLocationScreen, connectedSelectTimeScreen, connectedSelectFinishScreen,
AgreementScreen, AnnouncementScreen, PersonalDataScreen, FAQScreen, InquiryScreen, connectedPostScreen, connectedNewPostScreen, connectedArticleScreen,
connectedChatRoomScreen, LocationAgreementScreen, EulaAgreementScreen } from './screens';
import { Provider } from 'react-redux';
import store from './store';
import registerForPushNotifications from './services/push_notifications';
import { Notifications } from 'expo';



export default class App extends React.Component {

  componentWillMount(){
    console.log('App이 시작됩니다.');
  }

  componentDidMount () {
    // 앱 시작 시 푸쉬 토큰을 확인함. 없다면 사용자에게 푸쉬 토큰 허용을 요청함. 거절시 false 리턴.
    registerForPushNotifications();
    // PUSH 알림 수신 시 처리 관리
    Notifications.addListener((notification) => {
      const { data, origin } = notification;

      console.log("DATA : ", data);
      console.log("ORIGIN : ", origin);

      if (origin === 'received') {
        Alert.alert(
          'New Push!',
          '크크크 ',
          [{ text : 'OK!'}]
        );
      }

      if (origin === 'selected') {
        console.log("선택됨!!");
        Alert.alert(
          'New Push!',
          data.withSome,
          [{ text : 'OK!'}]
        );
      }

    })
  }

  render() {

    const stackConfig = {
      // 스택 헤더 삭제 가능
      // headerMode: 'card',
      cardStyle: {
        // 카드 스택 화면 색 지정
        backgroundColor: 'white'
      },
      navigationOptions: {
        // iOS의 백 버튼 색 조절 가능
        headerTintColor: 'black',
        headerBackTitle: ' ',
        // 안드로이드에 추가 마진 + 헤더 배경 조절 가능
        headerStyle: {

          marginTop: Platform.OS === 'android' ? 0 : 0,
          // backgroundColor: '#f4f4f4'
          // 헤더 흰색 + 줄(그림자) 삭제
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          }
        },
        headerTitleStyle: {
          // 안드로이드에서 제목 가운데 정렬
          alignSelf: 'center',
          // backgroundColor: 'yellow'
        },
        headerBackTitleStyle: {
          color: 'black'
        }
      }
    };

    const tabConfig = {
      navigationOptions: { tabBarVisible: true },

      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      // true로 하지 않으면 로그인도 안했는데 접근한다. 반드시 true
      lazy: true,

      tabBarOptions: {
        activeTintColor: '#f46958',
        inactiveTintColor: '#b2b2b2',
        // 선택된 탭 강조 색
        // activeBackgroundColor: '#dbdbdb',
        // 탭 폰트 사이즈 조절 가능
        labelStyle: {
          fontSize: 13,
          paddingBottom: 5,
          paddingTop: 0,
          marginTop: 0
        },
        iconStyle: {
          paddingBottom: 0,
          marginBottom: 0
        },
        // 아이콘만 보이고 싶다면 레이블 끄기
        // showLabel: false,
        style: {
          // 탭 배경색 + 높이 지정 가능
          height: 60,
          paddingTop: 10,
          // backgroundColor: '#f4f4f4',
          backgroundColor: 'white',
          borderTopColor: "white"
        },
        tabStyle: {
        }
      },
    };

    const MainNavigator = TabNavigator({
      auth: { screen: StackNavigator({
        login: { screen : connectedAuthScreen },
        signup: { screen : connectedSignUpScreen },
        card: { screen : connectedCardScreen },
        cardsend: { screen : CardSendScreen },
        agreement: { screen: AgreementScreen },
        personaldata: { screen: PersonalDataScreen },
        locationagreement: { screen: LocationAgreementScreen },
        eulaagreement: { screen: EulaAgreementScreen }
      }, { ...stackConfig})},
      main: {
        screen: StackNavigator({
          main: {
            screen: TabNavigator({
              home: { screen: connectedHomeScreen },
              chat: { screen: connectedChatScreen },
              meet: { screen: connectedSelectPeopleScreen },
              community: { screen: connectedCommunityScreen },
              mypage: { screen: connectedMyPageScreen },
            },tabConfig)
          },
          // 세팅 관련
          settings: { screen: SettingsScreen },
          announce: { screen: AnnouncementScreen },
          // agreement: { screen: AgreementScreen },
          // personaldata: { screen: PersonalDataScreen },
          faq: { screen: FAQScreen },
          inquiry: { screen: InquiryScreen },
          // 신청 관련
          selday: { screen: connectedSelectDayScreen },
          selloca: { screen: connectedSelectLocationScreen },
          seltime: { screen: connectedSelectTimeScreen },
          selfin: { screen: connectedSelectFinishScreen },
          // 채팅 관련
          chatroom: { screen: connectedChatRoomScreen },
          post: { screen: connectedPostScreen },
          newpost: { screen: connectedNewPostScreen },
          article: { screen: connectedArticleScreen },

        }, { ...stackConfig })
      }
    },{...tabConfig, backBehavior: 'none',
         navigationOptions: { tabBarVisible: false }
       });


    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
