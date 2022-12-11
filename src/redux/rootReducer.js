import { combineReducers } from '@reduxjs/toolkit';

import { loginReducer as loginState } from '../redux/reducers/loginReducer';
import { registrationReducer as registrationState } from '../redux/reducers/registrationReducer';
import { postsReducer as profileState } from '../redux/reducers/postsReducer';
import { changePasswordReducer as changePasswordState } from '../redux/reducers/changePasswordReducer';

const rootReducer = combineReducers({
  loginState,
  profileState,
  registrationState,
  changePasswordState
});
export default rootReducer;
