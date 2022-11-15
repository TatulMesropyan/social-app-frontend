
import  {combineReducers}  from "@reduxjs/toolkit";
import {loginReducer as loginState} from "src/redux/reducers/loginReducer";
import {registrationReducer as registrationState} from "src/redux/reducers/registrationReducer";

const rootReducer = combineReducers({
	loginState,
	registrationState,
});
export default rootReducer;