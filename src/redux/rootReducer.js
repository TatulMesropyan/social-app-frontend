
import  {combineReducers}  from "@reduxjs/toolkit";
import {loginReducer} from "./reducers/loginReducers";

const rootReducer = combineReducers({
	loginReducer,
});
export default rootReducer;