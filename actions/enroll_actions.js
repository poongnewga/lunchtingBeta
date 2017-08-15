import { AsyncStorage } from 'react-native';
import {
  CHANGE_PEOPLE_COUNT,
  TOGGLE_MON, TOGGLE_TUE, TOGGLE_WED, TOGGLE_THU, TOGGLE_FRI,
  LOADED_MAP,
  INITIALIZE_PIN,
  DRAGGIN_PIN,
  UPDATE_MAP,
  TOGGLE_LOCATION_SAVE,
  TOGGLE_TIME_SAVE,
  CHANGE_START_TIME,
  CHANGE_END_TIME,
  VALID_TIME,
  INVALID_TIME,

  ENROLL_SOCKET,
  ENROLL_CHAT_DAYS,
  INIT_MON, INIT_TUE, INIT_WED, INIT_THU, INIT_FRI,
  ENROLL_PEOPLE,
  ENROLL_FINISH, ENROLL_OK,
  SET_FLAG,SET_PAGE_COUNT,ENROLL_MYPAGE,
} from './types.js';

export const changePeopleCount = (peopleCount) => {
  return {
    type: CHANGE_PEOPLE_COUNT,
    payload: peopleCount
  }
};

export const toggleDays = (day) => {
  switch (day) {
    case 'mon':
      return { type: TOGGLE_MON };
    case 'tue':
      return { type: TOGGLE_TUE };
    case 'wed':
      return { type: TOGGLE_WED };
    case 'thu':
      return { type: TOGGLE_THU };
    case 'fri':
      return { type: TOGGLE_FRI };
  }
};

export const loadedMap = () => {
  return {
    type: LOADED_MAP,
  }
};

export const initializePin = (coordinate) => {
  return {
    type: INITIALIZE_PIN,
    payload: coordinate
  }
};

export const draggingPin = (coordinate) => {
  return {
    type: DRAGGIN_PIN,
    payload: coordinate
  }
};

export const updateMap = (region) => {
  return {
    type: UPDATE_MAP,
    payload: region
  }
};

export const toggleLocationSave = () => {
  return {
    type: TOGGLE_LOCATION_SAVE,
  }
};

// 시간 등록 관련

export const toggleTimeSave = () => {
  return {
    type: TOGGLE_TIME_SAVE,
  }
};

export const changeStartTime = (time) => {
  return {
    type: CHANGE_START_TIME,
    payload: time
  }
};

export const changeEndTime = (time) => {
  return {
    type: CHANGE_END_TIME,
    payload: time
  }
};


export const enrollSocket = (ws) => {
  return {
    type: ENROLL_SOCKET,
    payload: ws
  }
};

export const enrollChatDays = (chatDays) => {
  return {
    type: ENROLL_CHAT_DAYS,
    payload: chatDays
  }
};

export const initializeMessages = (day, messages) => {
  switch (day) {
    case "mon":
      return {
        type: INIT_MON,
        payload: messages
      }
    case "tue":
      return {
        type: INIT_TUE,
        payload: messages
      }
    case "wed":
      return {
        type: INIT_WED,
        payload: messages
      }
    case "thu":
      return {
        type: INIT_THU,
        payload: messages
      }
    case "fri":
      return {
        type: INIT_FRI,
        payload: messages
      }
  }
};

export const enrollFinish = () => {
  return {
    type: ENROLL_FINISH
  }
}

export const enrollOk = () => {
  return {
    type: ENROLL_OK
  }
}

export const enrollPeople = (n1, n2, n3) => {
  console.log('닉네임1: ',n1);
  console.log('닉네임2: ',n2);
  console.log('닉네임3: ',n3);
  let people = [];
  people.push(n1);
  people.push(n2);
  people.push(n3);
  console.log(people);
  return {
    type: ENROLL_PEOPLE,
    payload: people
  }
}

export const setFlag = (flag) => {
  return {
    type: SET_FLAG,
    payload: flag
  }
}

export const setPageCount = (chatDays) => {

  let count = 0;
  for (const key of Object.keys(chatDays)) {
    if(chatDays[key] != null) {
      count++;
    }
  }

  return {
    type: SET_PAGE_COUNT,
    payload: count,
  }
}





//
// refreshChat
export const getMypage = (token) => {

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

    let res = await fetch('https://lunchlunch-whehdrms.c9users.io/app/mypage', reqOptions);
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
