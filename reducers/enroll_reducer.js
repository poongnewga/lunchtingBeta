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
  VALID_TIME, INVALID_TIME,

  ENROLL_SOCKET,
  ENROLL_CHAT_DAYS,
  INIT_MON, INIT_TUE, INIT_WED, INIT_THU, INIT_FRI,

  ENROLL_PEOPLE,

  ENROLL_GENDER, ENROLL_CHATDAY_INFOS,
  ENROLL_FINISH, ENROLL_OK, ENROLL_MYPAGE,

  SET_FLAG,SET_PAGE_COUNT,
} from '../actions/types';

const INITIAL_STATE = {
  peopleCount: "4",
  selectedDays: {
    mon: true,
    tue: false,
    wed: true,
    thu: false,
    fri: false
  },
  mapLoaded: false,
  region: {
    latitude: 37.49784243525692,
    longitude: 127.0276218652725,
    latitudeDelta : 0.01173226770569613,
    longitudeDelta : 0.01000966896782529,
  },
  pinStatus: true,
  pin: { latitude: 37.49784243525692, longitude: 127.0276218652725, },
  locationSaved: false,

  timeSaved: false,
  startTime: '12:00 PM',
  endTime: '01:00 PM',
  isValidTime: true,

  webSocket: null,

  chatDays: { mon: null, tue: null, wed: null, thu: null, fri: null },
  chatDayInfos: { mon : null, tue: null, wed: null, thu: null, fri: null },

  messagesMon: [],
  messagesTue: [],
  messagesWed: [],
  messagesThu: [],
  messagesFri: [],
  gender: null,

  enrolledPeople: [],

  enrollFinished: false,

  flag : 1,
  pageCount: 0,

  mypage: {},
};

export default function ( state = INITIAL_STATE, action ) {
  switch (action.type) {
    case CHANGE_PEOPLE_COUNT:
      return { ...state, peopleCount: action.payload };

    case TOGGLE_MON:
      return { ...state, selectedDays: {...state.selectedDays, mon: !state.selectedDays.mon}};
    case TOGGLE_TUE:
      return { ...state, selectedDays: {...state.selectedDays, tue: !state.selectedDays.tue}};
    case TOGGLE_WED:
      return { ...state, selectedDays: {...state.selectedDays, wed: !state.selectedDays.wed}};
    case TOGGLE_THU:
    return { ...state, selectedDays: {...state.selectedDays, thu: !state.selectedDays.thu}};
    case TOGGLE_FRI:
      return { ...state, selectedDays: {...state.selectedDays, fri: !state.selectedDays.fri}};

    case LOADED_MAP:
      return { ...state, mapLoaded: true };
    case INITIALIZE_PIN:
      return { ...state, pinStatus: true, pin: {...action.payload} };
    case DRAGGIN_PIN:
      return { ...state, pin: {...action.payload} };
    case UPDATE_MAP:
      return { ...state, region: {...action.payload} };
    case TOGGLE_LOCATION_SAVE:
      return { ...state, locationSaved: !state.locationSaved };
    case TOGGLE_TIME_SAVE:
      return { ...state, timeSaved: !state.timeSaved };
    case CHANGE_START_TIME:
      return { ...state, startTime: action.payload };
    case CHANGE_END_TIME:
      return { ...state, endTime: action.payload };

    case ENROLL_SOCKET:
      return { ...state, webSocket: action.payload };
    case ENROLL_CHAT_DAYS:
      return { ...state, chatDays: action.payload };
    case INIT_MON:
      return { ...state, messagesMon: [...state.messagesMon, ...action.payload]};
    case INIT_TUE:
      return { ...state, messagesTue: [...state.messagesTue, ...action.payload]};
    case INIT_WED:
      return { ...state, messagesWed: [...state.messagesWed, ...action.payload]};
    case INIT_THU:
      return { ...state, messagesThu: [...state.messagesThu, ...action.payload]};
    case INIT_FRI:
      return { ...state, messagesFri: [...state.messagesFri, ...action.payload]};

    case ENROLL_GENDER:
      return { ...state, gender: action.payload };
    case ENROLL_CHATDAY_INFOS:
    //  console.log(action.payload);
    //  console.log('heehammmmmmmm');
      return { ...state, chatDayInfos: action.payload };

    case ENROLL_FINISH:
      if (state.timeSaved == true && state.locationSaved == true) {
        return { ...state, enrollFinished: true,
          peopleCount: "4",
          selectedDays: {
            mon: true,
            tue: false,
            wed: true,
            thu: false,
            fri: false
          },
         };
      }

      if (state.timeSaved == true && state.locationSaved == false) {
        return { ...state, enrollFinished: true,
          peopleCount: "4",
          selectedDays: {
            mon: true,
            tue: false,
            wed: true,
            thu: false,
            fri: false
          },
          mapLoaded: false,
          region: {
            latitude: 37.49784243525692,
            longitude: 127.0276218652725,
            latitudeDelta : 0.01173226770569613,
            longitudeDelta : 0.01000966896782529,
          },
          pinStatus: true,
          pin: { latitude: 37.49784243525692, longitude: 127.0276218652725, },
          locationSaved: false,

         };
      }

      if (state.timeSaved == false && state.locationSaved == true) {
        return { ...state, enrollFinished: true,
          peopleCount: "4",
          selectedDays: {
            mon: true,
            tue: false,
            wed: true,
            thu: false,
            fri: false
          },

          timeSaved: false,
          startTime: '12:00 PM',
          endTime: '01:00 PM',
          isValidTime: true,

         };
      }

      return { ...state, enrollFinished: true,
        peopleCount: "4",
        selectedDays: {
          mon: true,
          tue: false,
          wed: true,
          thu: false,
          fri: false
        },
        mapLoaded: false,
        region: {
          latitude: 37.49784243525692,
          longitude: 127.0276218652725,
          latitudeDelta : 0.01173226770569613,
          longitudeDelta : 0.01000966896782529,
        },
        pinStatus: true,
        pin: { latitude: 37.49784243525692, longitude: 127.0276218652725, },
        locationSaved: false,

        timeSaved: false,
        startTime: '12:00 PM',
        endTime: '01:00 PM',
        isValidTime: true,

       };

    case ENROLL_OK:
      return { ...state, enrollFinished: false };

    case ENROLL_PEOPLE:
      return { ...state, enrolledPeople: [...action.payload]}

    case SET_FLAG:
      return { ...state, flag : action.payload }
    case SET_PAGE_COUNT:
      // console.log('페이지카운트 : ', action.payload);
      return { ...state, pageCount: action.payload }

    case ENROLL_MYPAGE:
      return { ...state, mypage: action.payload }

    default:
      return state;

  }
}
