import { createContext, useContext, useReducer } from "react";
import { SongType } from "../apis/src/response.types";
import {
  FilterSongsPayloadType,
  GetAlbumSongsPayload,
  GetArtistSongsPayload,
  GetPlaylistSongsPayloadType,
  OnlyPagePayloadType,
} from "../apis/src/payload.types";

type InitialStateType = {
  open?: boolean;
  currentSong?: SongType;
  queryKey?:
    | "FILTERED_SONGS_INFINITE_QUERY"
    | "GET_ALBUM_SONGS_INFINITE_QUERY"
    | "GET_ARTIST_SONGS_INFINITE_QUERY"
    | "GET_PLAYLIST_SONGS_INFINITE_QUERY"
    | "SET_SINGLE_SONG_ACTION";
  queryPayload?:
    | FilterSongsPayloadType
    | OnlyPagePayloadType
    | GetAlbumSongsPayload
    | GetArtistSongsPayload
    | GetPlaylistSongsPayloadType;
  index?: number;
  pageNumber?: number;
};

type ToggleOpenAction = {
  type: "TOGGLE_OPEN";
  payload: {
    open: boolean;
  };
};

type PlayFilteredSongsAction = {
  type: "FILTERED_SONGS_INFINITE_QUERY";
  payload: {
    queryPayload: FilterSongsPayloadType;
    index: number;
    pageNumber: number;
    currentSong: SongType;
  };
};

type PlayAlbumSongsAction = {
  type: "GET_ALBUM_SONGS_INFINITE_QUERY";
  payload: {
    queryPayload: GetAlbumSongsPayload;
    index: number;
    pageNumber: number;
    currentSong: SongType;
  };
};

type PlayAritstSongsAction = {
  type: "GET_ARTIST_SONGS_INFINITE_QUERY";
  payload: {
    queryPayload: GetArtistSongsPayload;
    index: number;
    pageNumber: number;
    currentSong: SongType;
  };
};

type PlayPlaylistSongsAction = {
  type: "GET_PLAYLIST_SONGS_INFINITE_QUERY";
  payload: {
    queryPayload: GetPlaylistSongsPayloadType;
    index: number;
    pageNumber: number;
    currentSong: SongType;
  };
};

type SetCurrentSongAction = {
  type: "SET_CURRENT_SONG";
  payload: {
    currentSong: SongType;
  };
};

type SetIndexAndPageNumberAction = {
  type: "CHANGE_SONG_INDEX_WITH_PAGENUMBER";
  payload: {
    index: number;
    pageNumber: number;
  };
};

type SetSingleSongAction = {
  type: "SET_SINGLE_SONG_ACTION";
  payload: {
    currentSong: SongType;
  };
};

type actionType =
  | ToggleOpenAction
  | SetCurrentSongAction
  | PlayFilteredSongsAction
  | PlayAlbumSongsAction
  | PlayAritstSongsAction
  | PlayPlaylistSongsAction
  | SetIndexAndPageNumberAction
  | SetSingleSongAction;

type MusicPlayerPlaylistProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  open: false,
};

const MusicPlayerPlaylistContext = createContext(initialState);
const DispatchContext = createContext<React.Dispatch<actionType> | null>(null);

function musicPlayerPlaylistReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return {
        ...state,
        open: action.payload.open,
      };
    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSong: action.payload.currentSong,
      };
    case "FILTERED_SONGS_INFINITE_QUERY":
    case "GET_ALBUM_SONGS_INFINITE_QUERY":
    case "GET_ARTIST_SONGS_INFINITE_QUERY":
    case "GET_PLAYLIST_SONGS_INFINITE_QUERY":
      return {
        ...state,
        currentSong: action.payload.currentSong,
        index: action.payload.index,
        pageNumber: action.payload.pageNumber,
        queryKey: action.type,
        queryPayload: action.payload.queryPayload,
      };
    case "CHANGE_SONG_INDEX_WITH_PAGENUMBER":
      return {
        ...state,
        index: action.payload.index,
        pageNumber: action.payload.pageNumber,
      };
    case "SET_SINGLE_SONG_ACTION":
      return {
        ...state,
        currentSong: action.payload.currentSong,
        queryKey: action.type,
        queryPayload: undefined,
        index: undefined,
        pageNumber: undefined,
      };
    default:
      return state;
  }
}

export const MusicPlayerPlaylistProvider: React.FC<
  MusicPlayerPlaylistProviderType
> = ({ children }) => {
  const [state, dispatch] = useReducer(
    musicPlayerPlaylistReducer,
    initialState
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <MusicPlayerPlaylistContext.Provider value={state}>
        {children}
      </MusicPlayerPlaylistContext.Provider>
    </DispatchContext.Provider>
  );
};

export function useMusicPlayerPlaylistData() {
  const state = useContext(MusicPlayerPlaylistContext);
  return state;
}

export function useMusicPlayerPlaylistDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Dispatch is null");
  }
  return dispatch;
}
