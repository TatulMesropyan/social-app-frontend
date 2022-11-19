
import  {combineReducers}  from "@reduxjs/toolkit";
import {loginReducer as loginState} from "../redux/reducers/loginReducer";
import {registrationReducer as registrationState} from "../redux/reducers/registrationReducer";

const rootReducer = combineReducers({
	loginState,
	registrationState,
});
export default rootReducer;