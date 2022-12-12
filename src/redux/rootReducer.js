import { combineReducers } from '@reduxjs/toolkit';

import { loginReducer as loginState } from '../redux/reducers/loginReducer';
import { registrationReducer as registrationState } from '../redux/reducers/registrationReducer';
import { postsReducer as postsState } from '../redux/reducers/postsReducer';
import { changePasswordReducer as changePasswordState } from '../redux/reducers/changePasswordReducer';

const rootReducer = combineReducers({
  loginState,
  postsState,
  registrationState,
  changePasswordState
});
export default rootReducer;
