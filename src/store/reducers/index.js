import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./AuthReducers/loginReducer";
import uploadReducer from "./UploadReducers/fileUploadReducer";
import addAlbumReducer from "./MainReducers/addAlbumReducer";

const combinedReducers = combineReducers({
    loginReducer,
    uploadReducer,
    addAlbumReducer,
})

export default combinedReducers;