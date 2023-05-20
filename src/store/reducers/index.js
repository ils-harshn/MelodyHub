import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import likedSongsReducers from "./likedSongsReducers";
import mostViewedSongsReducer from "./mostViewedSongsReducers";
import searchSongsReducer from "./searchSongReducer";

const combinedReducers = combineReducers({
    loginReducer,
    likedSongsReducers,
    mostViewedSongsReducer,
    searchSongsReducer,
})

export default combinedReducers;