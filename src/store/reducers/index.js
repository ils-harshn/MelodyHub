import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import likedSongsReducers from "./likedSongsReducers";
import mostViewedSongsReducer from "./mostViewedSongsReducers";

const combinedReducers = combineReducers({
    loginReducer,
    likedSongsReducers,
    mostViewedSongsReducer,
})

export default combinedReducers;