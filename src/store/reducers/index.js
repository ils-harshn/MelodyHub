import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./AuthReducers/loginReducer";

const combinedReducers = combineReducers({
    loginReducer,
})

export default combinedReducers;