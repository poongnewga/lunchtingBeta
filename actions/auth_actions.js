import { AsyncStorage } from 'react-native';
import {
  GET_LUNCHTING_TOKEN_SUCCESS,
  GET_LUNCHTING_TOKEN_FAIL,
  EMAIL_CHANGED, PASSWORD_CHANGED,
  START_LOGIN, FINISH_LOGIN, SET_ERROR_MESSAGE,
  ENROLL_LOGOUT_FUNCTION,
  ENROLL_GENDER,SET_PAGE_COUNT,
  ENROLL_CHATDAY_INFOS, ENROLL_CHAT_DAYS,
  SIGN_NICKNAME_CHANGED, SIGN_PASSWORD_CHANGED, SIGN_PASSWORD_CHECK_CHANGED, SIGN_GENDER_CHANGED, SIGN_AGE_CHANGED,
} from './types.js';

import { NavigationActions } from 'react-navigation';
const navigateAction = NavigationActions.navigate({

  routeName: 'auth',

  params: {},

  action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
});

const resetAction = NavigationActions.reset({
  index: 0,
  key: null,
  actions: [
    NavigationActions.navigate({ routeName: 'auth'}),
    NavigationActions.navigate({ routeName: 'login'})
  ]
});

export const enrollLogoutFunction = (navigation) => {
  return {
    type: ENROLL_LOGOUT_FUNCTION,
    payload: navigation,
  };
}

export const logoutAndDeleteToken = (navigation) => {
  return async (dispatch) => {
    // let user_token = await AsyncStorage.removeItem('user_token');
    // console.log('로그아웃 시 리턴값 : ', user_token);
    // dispatch({ type: GET_LUNCHTING_TOKEN_FAIL, payload: null});
    // navigation.dispatch(navigateAction);
    navigation.navigate('login');
    // navigation.dispatch(resetAction);

  }
}

export const getLunchtingToken = (navigate) => {
  // async 로 인해 이 함수 내에 있는 비동기작업은 동기처럼 생각할 수 있다.
  return async (dispatch) => {
    // 디바이스 내에 토큰이 있는지(이미 로그인한 적이 있는 지) 확인하고 토큰을 로드
    let user_token = await AsyncStorage.removeItem('user_token');
    // await 로 인해 비동기를 동기처럼 작성가능.
    if (user_token) {
      // 토큰이 존재하므로 로그인이 성공적으로 이루어졌음을 의미. 토큰과 함께 액션 디스패치
      // 가져온 토큰을 리덕스 스테이트에 저장해서 유지한다.(로그인을 의미)
      console.log('로컬에서 토큰 획득 성공 : ', user_token);

      let reqOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // 토큰을 담아서 레일즈 서버에 요청
        body: JSON.stringify({ token: user_token })
      };
      let res = await fetch('https://www.lunchting.com/app/meetings', reqOptions);
      let resJSON = await res.json();
      console.log('debuggggggggggggg')
      console.log(resJSON);
      // let result = resJSON.pop();

      if (resJSON.status == "fail") {
        console.log('토큰 만료 : 다시 로그인해야 합니다.');
        dispatch({ type: GET_LUNCHTING_TOKEN_FAIL, payload: false});
        return
      }

      let result = resJSON.pop();

      // 수신이 정상적이면 먼저 성별 및 채팅방 정보 등록
      if (result.status == "ok") {
        // resJSON의 문자열로 된 오브젝트를 파싱해 다시 오브젝트로 변경
        for (var i in resJSON) {
          for (const key of Object.keys(resJSON[i])) {
            if (key=="lunchtime"||key=="center"||key=="pin_m"||key=="pin_f"||key=="company") {
              resJSON[i][key] = JSON.parse(resJSON[i][key]);
            }
          }
        }

        // 채팅방의 상세 정보를 리덕스에 등록하기 위해 데이터를 chatDayInfos로 가공
        var chatDayInfos = { mon : null, tue: null, wed: null, thu: null, fri: null };
        var chatDays = { mon : null, tue: null, wed: null, thu: null, fri: null };
        for (var i in resJSON) {
          switch (resJSON[i].day) {
            case "월":
              chatDayInfos.mon = resJSON[i];
              chatDays.mon = resJSON[i].id;
              break;
            case "화":
              chatDayInfos.tue = resJSON[i];
              chatDays.tue = resJSON[i].id;
              break;
            case "수":
              chatDayInfos.wed = resJSON[i];
              chatDays.wed = resJSON[i].id;
              break;
            case "목":
              chatDayInfos.thu = resJSON[i];
              chatDays.thu = resJSON[i].id;
              break;
            case "금":
              chatDayInfos.fri = resJSON[i];
              chatDays.fri = resJSON[i].id;
              break;
          }
        }

        let count = 0;
        for (const key of Object.keys(chatDays)) {
          if(chatDays[key] != null) {
            count++;
          }
        }

        dispatch({type:ENROLL_GENDER, payload: result.gender});
        dispatch({type:ENROLL_CHAT_DAYS, payload: chatDays});
        dispatch({type:ENROLL_CHATDAY_INFOS, payload: chatDayInfos});
        dispatch({type:SET_PAGE_COUNT, payload: count});
      } else {
        console.log()
      }


      if (user_token != null) {
        navigate('main');
      }
      dispatch({ type: GET_LUNCHTING_TOKEN_SUCCESS, payload: user_token });
    } else {
      // 기존에 저장된 토큰이 없으므로 사용자가 직접 로그인하여 토큰을 받아오게 한다.
      // token : null 상태로 토큰을 초기화
      console.log('토큰 체크 완료 -- token NOT exist');
      dispatch({ type: GET_LUNCHTING_TOKEN_FAIL, payload: false});

      // await AsyncStorage.setItem('user_token', token);
      // dispatch({ type: LUNCHTING_LOGIN_SUCCESS, payload: token });
    }
  }
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
}

export const doingLogin = (nickname, password, navigate, push_token) => {
  return async (dispatch) => {

    dispatch({ type: START_LOGIN });

    let requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, password, push_token })
    };

    let res = await fetch('https://www.lunchting.com/app/login', requestOptions);
    let resJSON = await res.json();

    if (resJSON.status === "OK") {
      // 토큰을 원격으로 받는 것에 성공. 저장 필요.
      console.log('원격에서 받은 토큰 : ',resJSON.token);
      dispatch({ type: GET_LUNCHTING_TOKEN_SUCCESS, payload: resJSON.token });
      await AsyncStorage.setItem('user_token', resJSON.token);

      getMypage2(resJSON.token);

      let reqOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // 토큰을 담아서 레일즈 서버에 요청
        body: JSON.stringify({ token: resJSON.token })
      };
      let response = await fetch('https://www.lunchting.com/app/meetings', reqOptions);
      let responseJSON = await response.json();
      let result2 = responseJSON.pop();

      // 수신이 정상적이면 먼저 성별 및 채팅방 정보 등록
      if (result2.status == "ok") {
        // resJSON의 문자열로 된 오브젝트를 파싱해 다시 오브젝트로 변경
        for (var i in responseJSON) {
          for (const key of Object.keys(responseJSON[i])) {
            if (key=="lunchtime"||key=="center"||key=="pin_m"||key=="pin_f"||key=="company") {
              responseJSON[i][key] = JSON.parse(responseJSON[i][key]);
            }
          }
        }

        // 채팅방의 상세 정보를 리덕스에 등록하기 위해 데이터를 chatDayInfos로 가공
        var chatDayInfos2 = { mon : null, tue: null, wed: null, thu: null, fri: null };
        var chatDays2 = { mon : null, tue: null, wed: null, thu: null, fri: null };
        for (var i in responseJSON) {
          switch (responseJSON[i].day) {
            case "월":
              chatDayInfos2.mon = responseJSON[i];
              chatDays2.mon = responseJSON[i].id;
              break;
            case "화":
              chatDayInfos2.tue = responseJSON[i];
              chatDays2.tue = responseJSON[i].id;
              break;
            case "수":
              chatDayInfos2.wed = responseJSON[i];
              chatDays2.wed = responseJSON[i].id;
              break;
            case "목":
              chatDayInfos2.thu = responseJSON[i];
              chatDays2.thu = responseJSON[i].id;
              break;
            case "금":
              chatDayInfos2.fri = responseJSON[i];
              chatDays2.fri = responseJSON[i].id;
              break;
          }
        }

        let count2 = 0;
        for (const key of Object.keys(chatDays2)) {
          if(chatDays2[key] != null) {
            count2++;
          }
        }

        dispatch({type:ENROLL_GENDER, payload: result2.gender});
        dispatch({type:ENROLL_CHAT_DAYS, payload: chatDays2});
        dispatch({type:ENROLL_CHATDAY_INFOS, payload: chatDayInfos2});
        dispatch({type:SET_PAGE_COUNT, payload: count2});
      }



      navigate('main');
      dispatch({ type: FINISH_LOGIN });

    } else {
      dispatch({ type: SET_ERROR_MESSAGE, payload: resJSON.msg })
      dispatch({ type: FINISH_LOGIN });
    }

    // fetch('http://lunch.heeham.com/login', requestOptions)
    // .then((res) => res.json())
    // .then((resJSON) => {
      // if (resJSON.status === "OK") {
      //   console.warn(resJSON.token);
      //   // 토큰을 원격으로 받는 것에 성공. 저장 필요.
      //   await AsyncStorage.setItem('user_token', token);
      //   dispatch({ type: LUNCHTING_LOGIN_SUCCESS, payload: token });
      //   navigate('main');
      //   dispatch({ type: FINISH_LOGIN });
      //
      // } else {
      //   dispatch({ type: SET_ERROR_MESSAGE, payload: resJSON.msg })
      //   dispatch({ type: FINISH_LOGIN });
      // }
    // })
    // .catch((error) => {
    //   dispatch({ type: FINISH_LOGIN });
    //   console.error(error);
    // })



  }
}

// SIGN_NICKNAME_CHANGED, SIGN_PASSWORD_CHANGED, SIGN_PASSWORD_CHECK_CHANGED, SIGN_GENDER_CHANGED, SIGN_AGE_CHANGED, SIGN_TOGGLE_AGREE,


export const signNicknameChanged = (text) => {
  return {
    type: SIGN_NICKNAME_CHANGED,
    payload: text
  };
}
export const signPasswordChanged = (text) => {
  return {
    type: SIGN_PASSWORD_CHANGED,
    payload: text
  };
}
export const signPasswordCheckChanged = (text) => {
  return {
    type: SIGN_PASSWORD_CHECK_CHANGED,
    payload: text
  };
}
export const signGenderChanged = (gender) => {
  return {
    type: SIGN_GENDER_CHANGED,
    payload: gender
  };
}
export const signAgeChanged = (age) => {
  return {
    type: SIGN_AGE_CHANGED,
    payload: age
  };
}

// refreshChat
export const refreshChat = (token) => {

  return async (dispatch) => {

    let reqOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // 토큰을 담아서 레일즈 서버에 요청
      body: JSON.stringify({ token: token })
    };

    let res = await fetch('https://www.lunchting.com/app/meetings', reqOptions);
    let resJSON = await res.json();

    console.log(resJSON);


    if (resJSON.status == "fail") {
      console.log('토큰 만료 : 다시 로그인해야 합니다.');
      dispatch({ type: GET_LUNCHTING_TOKEN_FAIL, payload: false});
      return
    }

    let result = resJSON.pop();

    // 수신이 정상적이면 먼저 성별 및 채팅방 정보 등록
    if (result.status == "ok") {
      // resJSON의 문자열로 된 오브젝트를 파싱해 다시 오브젝트로 변경
      for (var i in resJSON) {
        for (const key of Object.keys(resJSON[i])) {
          if (key=="lunchtime"||key=="center"||key=="pin_m"||key=="pin_f"||key=="company") {
            resJSON[i][key] = JSON.parse(resJSON[i][key]);
          }
        }
      }

      // 채팅방의 상세 정보를 리덕스에 등록하기 위해 데이터를 chatDayInfos로 가공
      var chatDayInfos = { mon : null, tue: null, wed: null, thu: null, fri: null };
      var chatDays = { mon : null, tue: null, wed: null, thu: null, fri: null };
      for (var i in resJSON) {
        switch (resJSON[i].day) {
          case "월":
            chatDayInfos.mon = resJSON[i];
            chatDays.mon = resJSON[i].id;
            break;
          case "화":
            chatDayInfos.tue = resJSON[i];
            chatDays.tue = resJSON[i].id;
            break;
          case "수":
            chatDayInfos.wed = resJSON[i];
            chatDays.wed = resJSON[i].id;
            break;
          case "목":
            chatDayInfos.thu = resJSON[i];
            chatDays.thu = resJSON[i].id;
            break;
          case "금":
            chatDayInfos.fri = resJSON[i];
            chatDays.fri = resJSON[i].id;
            break;
        }
      }

      let count3 = 0;
      for (const key of Object.keys(chatDays)) {
        if(chatDays[key] != null) {
          count3++;
        }
      }

      dispatch({type:ENROLL_GENDER, payload: result.gender});
      dispatch({type:ENROLL_CHAT_DAYS, payload: chatDays});
      dispatch({type:ENROLL_CHATDAY_INFOS, payload: chatDayInfos});
      dispatch({type:SET_PAGE_COUNT, payload: count3});
    } else {
      console.log()
    }
  }
};

export const getMypage2 = (token) => {

  return async (dispatch) => {

    let reqOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // 토큰을 담아서 레일즈 서버에 요청
      body: JSON.stringify({ token: token })
    };

    let res = await fetch('https://www.lunchting.com/app/mypage', reqOptions);
    let resJSON = await res.json();

    // console.log(resJSON);


    if (resJSON.status == "fail") {
      console.log('토큰 만료 : 다시 로그인해야 합니다.');
      dispatch({ type: GET_LUNCHTING_TOKEN_FAIL, payload: false});
      return
    }

    // 수신이 정상적이면 먼저 성별 및 채팅방 정보 등록
    if (resJSON.status == "ok") {
      // resJSON의 문자열로 된 오브젝트를 파싱해 다시 오브젝트로 변경
      for (var i in resJSON["oldmeets"]) {
        for (const key of Object.keys(resJSON["oldmeets"][i])) {
          if (key=="lunchtime"||key=="center"||key=="pin_m"||key=="pin_f"||key=="company") {
            resJSON["oldmeets"][i][key] = JSON.parse(resJSON["oldmeets"][i][key]);
          }
        }
      }
      for (var i in resJSON["waits"]) {
        for (const key of Object.keys(resJSON["waits"][i])) {
          if (key=="lunchtime"||key=="location"||key=="day") {
            resJSON["waits"][i][key] = JSON.parse(resJSON["waits"][i][key]);
          }
        }
      }

      console.log(resJSON);


      dispatch({type:ENROLL_MYPAGE, payload: resJSON});

    } else {
      console.log()
    }
  }
};
