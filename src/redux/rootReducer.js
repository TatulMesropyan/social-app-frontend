import { combineReducers } from '@reduxjs/toolkit';

import { loginReducer as loginState } from '../redux/reducers/loginReducer';
import { registrationReducer as registrationState } from '../redux/reducers/registrationReducer';
import { profileReducer as profileState } from '../redux/reducers/profileReducer';
import { changePasswordReducer as changePasswordState } from '../redux/reducers/changePasswordReducer';

const rootReducer = combineReducers({
  loginState,
  profileState,
  registrationState,
  changePasswordState
});
export default rootReducer;
