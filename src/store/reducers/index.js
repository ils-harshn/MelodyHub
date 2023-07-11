import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./AuthReducers/loginReducer";
import uploadReducer from "./UploadReducers/fileUploadReducer";
import addAlbumReducer from "./MainReducers/addAlbumReducer";
import addArtistReducer from "./MainReducers/addArtistReducer";
import searchAlbumReducer from "./MainReducers/searchAlbumReducer";
import searchArtistReducer from "./MainReducers/searchArtistReducer";
import searchGenreReducer from "./MainReducers/searchGenreReducer";

const combinedReducers = combineReducers({
    loginReducer,
    uploadReducer,
    addAlbumReducer,
    addArtistReducer,
    searchAlbumReducer,
    searchArtistReducer,
    searchGenreReducer,
})


export default combinedReducers;