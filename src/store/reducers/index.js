import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import likedSongsReducers from "./likedSongsReducers";
import mostViewedSongsReducer from "./mostViewedSongsReducers";
import searchSongsReducer from "./searchSongReducer";
import MusicPlayerReducer from "./MusicPlayerReducer";
import registerReducer from "./registerReducer";
import verifyOTPReducer from "./verifyOTPReducer";
import createPlaylistReducer from "./createPlaylistReducer";
import recentSongsReducers from "./recentSongsReducers";
import deletePlaylistReducer from "./deletePlaylistReducer";
import musicPlayerPlaylistReducer from "./musicPlayerPlaylistReducer";

const combinedReducers = combineReducers({
    loginReducer,
    likedSongsReducers,
    mostViewedSongsReducer,
    searchSongsReducer,
    MusicPlayerReducer,
    registerReducer,
    verifyOTPReducer,
    createPlaylistReducer,
    recentSongsReducers,
    deletePlaylistReducer,
    musicPlayerPlaylistReducer,
})

export default combinedReducers;