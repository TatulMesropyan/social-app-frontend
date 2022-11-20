
import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer as loginState } from "../redux/reducers/loginReducer";
import { registrationReducer as registrationState } from "../redux/reducers/registrationReducer";
import { profileReducer as profileState } from "../redux/reducers/profileReducer";

const rootReducer = combineReducers({
	loginState,
	profileState,
	registrationState,
});
export default rootReducer;