import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import likedSongsReducers from "./likedSongsReducers";
import mostViewedSongsReducer from "./mostViewedSongsReducers";
import searchSongsReducer from "./searchSongReducer";
import MusicPlayerReducer from "./MusicPlayerReducer";
import registerReducer from "./registerReducer";
import verifyOTPReducer from "./verifyOTPReducer";

const combinedReducers = combineReducers({
    loginReducer,
    likedSongsReducers,
    mostViewedSongsReducer,
    searchSongsReducer,
    MusicPlayerReducer,
    registerReducer,
    verifyOTPReducer,
})

export default combinedReducers;