import { combineReducers } from 'redux';
import auth from './auth_reducer';
import enroll from './enroll_reducer';
import community from './community_reducer';

export default combineReducers({
  auth: auth,
  enroll: enroll,
  community: community,
});
