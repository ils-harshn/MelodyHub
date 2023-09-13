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
    | "RECENT_SONGS_INFINITE_QUERY"
    | "GET_ALBUM_SONGS_INFINITE_QUERY"
    | "GET_ARTIST_SONGS_INFINITE_QUERY"
    | "GET_PLAYLIST_SONGS_INFINITE_QUERY";
  queryPayload?:
    | FilterSongsPayloadType
    | OnlyPagePayloadType
    | GetAlbumSongsPayload
    | GetArtistSongsPayload
    | GetPlaylistSongsPayloadType;
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
  };
};

type PlayRecentSongsAction = {
  type: "RECENT_SONGS_INFINITE_QUERY";
  payload: {
    queryPayload: OnlyPagePayloadType;
  };
};

type PlayAlbumSongsAction = {
  type: "GET_ALBUM_SONGS_INFINITE_QUERY";
  payload: {
    queryPayload: GetAlbumSongsPayload;
  };
};

type PlayAritstSongsAction = {
  type: "GET_ARTIST_SONGS_INFINITE_QUERY";
  payload: {
    queryPayload: GetArtistSongsPayload;
  };
};

type PlayPlaylistSongsAction = {
  type: "GET_PLAYLIST_SONGS_INFINITE_QUERY";
  payload: {
    queryPayload: GetPlaylistSongsPayloadType;
  };
};

type SetCurrentSongAction = {
  type: "SET_CURRENT_SONG";
  payload: {
    currentSong: SongType;
  };
};

type actionType =
  | ToggleOpenAction
  | SetCurrentSongAction
  | PlayFilteredSongsAction
  | PlayRecentSongsAction
  | PlayAlbumSongsAction
  | PlayAritstSongsAction
  | PlayPlaylistSongsAction;

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
    case "RECENT_SONGS_INFINITE_QUERY":
      return {
        ...state,
        currentSong: undefined,
        queryKey: action.type,
        queryPayload: action.payload.queryPayload,
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
