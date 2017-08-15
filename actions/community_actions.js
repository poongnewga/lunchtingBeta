import { AsyncStorage } from 'react-native';
import {
  SEARCH_TEXT_CHANGED,SET_POSTS_LOADING,
  ENROLL_REFRESH_POSTS_FUNCTION,
} from './types.js';


export const searchTextChanged = (text) => {
  return {
    type: SEARCH_TEXT_CHANGED,
    payload: text
  }
}

export const enrollRefreshPostsFunction = (f) => {
  return {
    type: ENROLL_REFRESH_POSTS_FUNCTION,
    payload: f,
  }
}

// export const setPostsLoading = () => {
//
//   return (dispatch) => {
//
//     dispatch({
//       type: SET_POSTS_LOADING,
//
//     });
//     return Promise.resolve();
//   }
// }

//
