import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

class PersonalDataScreen extends Component {

  static navigationOptions = ({navigation}) => {

    return {
      title: '개인정보 취급 방침',
      headerRight: (
       <View></View>
      ),
    }
  }

  render() {
    return (
      <View style={{flex: 1, }}>
        <ScrollView>
          <View style={{width: WIDTH, backgroundColor: '#fafafa', alignItems: 'center', paddingTop: 15, paddingBottom: 15, }}>
            <View style={{width: WIDTH * 0.9, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#d2d2d2',padding: 8}}>
            <Text style={{fontSize: 12}}>{`
1. 개인정보의 처리 목적 <런치팅>(‘lunchting.com’이하 ‘런치팅’) 은(는) 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
- 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별.인증, 회원자격 유지.관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급.배송 등


2. 개인정보처리 위탁

① <런치팅>('런치팅')은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

② <런치팅>('lunchting.com'이하 '런치팅')은(는) 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.

③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.


3. 정보주체의 권리,의무 및 그 행사방법 이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.

① 정보주체는 <기관/회사명>(‘사이트URL’이하 ‘사이트명) 에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
1. 개인정보 열람요구
2. 오류 등이 있을 경우 정정 요구
3. 삭제요구
4. 처리정지 요구


4. 처리하는 개인정보의 항목 작성

① <런치팅>('lunchting.com'이하 '런치팅')은(는) 다음의 개인정보 항목을 처리하고 있습니다.

1<매칭최적화>
- 필수항목 : 이메일, 프로필 사진, 휴대전화번호, 로그인ID, 성별, 생년월일, 이름, 회사전화번호, 직책, 부서, 회사명, 직업, 기념일, 결혼여부, 취미, 신체정보, 학력, 종교, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록, 회사 위치, 식사 장소, 매칭 주기, 미팅 선호요일, 점심시간 등 매칭을 위해 필요한 정보
- 선택항목 : 추천인 닉네임


5. 개인정보의 파기<런치팅>('런치팅')은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.

-파기절차이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.-파기기한이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.


6. 개인정보의 안전성 확보 조치 <런치팅>('런치팅')은(는) 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.

1. 정기적인 자체 감사 실시
개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.


7. 개인정보 보호책임자 작성

① 런치팅(‘lunchting.com’이하 ‘런치팅) 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

▶ 개인정보 보호책임자
성명 :조동근
직책 :대표
직급 :대표
연락처 :010-5529-7795, whehdrms123@gmail.com,
※ 개인정보 보호 담당부서로 연결됩니다.

▶ 개인정보 보호 담당부서
부서명 : 개인정보 보호 담당
담당자 : 조동근
연락처 : 010-5529-7795
② 정보주체께서는 런치팅(‘lunchting.com’이하 ‘런치팅) 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 런치팅(‘lunchting.com’이하 ‘런치팅) 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.


8. 개인정보 처리방침 변경

①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

            `}</Text>
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
    width: "100%"
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

export {PersonalDataScreen};
