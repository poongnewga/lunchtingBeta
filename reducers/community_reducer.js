import {
  SEARCH_TEXT_CHANGED, SET_POSTS_LOADING,
  ENROLL_REFRESH_POSTS_FUNCTION,

} from '../actions/types';

const INITIAL_STATE = {
  searchText: "",
  searched: false,
  searchPage: 0,
  searchLoading: false,
  page: 0,
  loading: false,
  searchPosts: [],
  posts: [],
  refreshPostsFunction: null,
};

export default function ( state = INITIAL_STATE, action ) {
  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return { ...state, searchText: action.payload }
    case SET_POSTS_LOADING:
      return { ...state, loading: true }
    case ENROLL_REFRESH_POSTS_FUNCTION:
      return { ...state, refreshPostsFunction: action.payload }
    //
    // case ENROLL_OK:
    //   return { ...state, enrollFinished: false };


    default:
      return state;

  }
}
