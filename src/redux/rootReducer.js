import { combineReducers } from "redux";
import googleAuthReducer from "../pages/Authentication/redux/googleAuthReducer";
import { root } from "postcss";
export const rootReducer = combineReducers({ authReducer: googleAuthReducer });