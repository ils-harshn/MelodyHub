import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";

const combinedReducers = combineReducers({
    loginReducer,
})

export default combinedReducers;