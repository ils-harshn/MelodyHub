import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./AuthReducers/loginReducer";
import uploadReducer from "./UploadReducers/fileUploadReducer";

const combinedReducers = combineReducers({
    loginReducer,
    uploadReducer,
})

export default combinedReducers;