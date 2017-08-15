import {
  GET_LUNCHTING_TOKEN_SUCCESS,
  GET_LUNCHTING_TOKEN_FAIL,
  EMAIL_CHANGED, PASSWORD_CHANGED,
  START_LOGIN, FINISH_LOGIN, SET_ERROR_MESSAGE,
  SIGN_NICKNAME_CHANGED, SIGN_PASSWORD_CHANGED, SIGN_PASSWORD_CHECK_CHANGED, SIGN_GENDER_CHANGED, SIGN_AGE_CHANGED,
  ENROLL_LOGOUT_FUNCTION,
} from '../actions/types';

const INITIAL_STATE = {
  user_token: null,
  email: '',
  password: '',
  error: '',
  loading: false,

  sign_nickname: '',
  sign_password: '',
  sign_password_check: '',
  sign_gender: null,
  sign_age: "26",
  sign_agree_all : false,
  sign_agree_privacy: false,
  sign_agree_service: false,
  sign_agree_location: false,
  logout: null,
};

export default function ( state = INITIAL_STATE, action ) {
  switch (action.type) {

    case GET_LUNCHTING_TOKEN_SUCCESS:
      return { ...state, user_token: action.payload }

    case GET_LUNCHTING_TOKEN_FAIL:
      console.log('토큰을 가져오는 데 실패했습니다. TOKEN을 다음과 같이 설정합니다. ', action.payload)
      return { ...state, user_token: action.payload }

    case EMAIL_CHANGED:
      // console.log('이메일 변경됨 : ', action.payload)
      return { ...state, email: action.payload }

    case PASSWORD_CHANGED:
      // console.log('패스워드 변경됨 : ', action.payload)
      return { ...state, password: action.payload }

    case START_LOGIN:
      return { ...state, loading: true, error: '' }
    case FINISH_LOGIN:
      return { ...state, loading: false }
    case SET_ERROR_MESSAGE:
      return { ...state, error: action.payload }
    case SIGN_NICKNAME_CHANGED:
      return { ...state, sign_nickname: action.payload }
    case SIGN_PASSWORD_CHANGED:
      return { ...state, sign_password: action.payload }
    case SIGN_PASSWORD_CHECK_CHANGED:
      return { ...state, sign_password_check: action.payload }
    case SIGN_GENDER_CHANGED:
      return { ...state, sign_gender: action.payload }
    case SIGN_AGE_CHANGED:
      return { ...state, sign_age: action.payload }

    case ENROLL_LOGOUT_FUNCTION:
      return { ...state, logout: action.payload }

    default:
      return state;

      // SIGN_NICKNAME_CHANGED, SIGN_PASSWORD_CHANGED, SIGN_PASSWORD_CHECK_CHANGED, SIGN_GENDER_CHANGED, SIGN_AGE_CHANGED, SIGN_TOGGLE_AGREE,


  }
}
// 여기서 생성된 state 는 auth : { ... } 이런 식으로 사용된다.
