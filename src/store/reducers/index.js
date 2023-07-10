import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./AuthReducers/loginReducer";
import uploadReducer from "./UploadReducers/fileUploadReducer";
import addAlbumReducer from "./MainReducers/addAlbumReducer";
import addArtistReducer from "./MainReducers/addArtistReducer";

const combinedReducers = combineReducers({
    loginReducer,
    uploadReducer,
    addAlbumReducer,
    addArtistReducer,
})


export default combinedReducers;