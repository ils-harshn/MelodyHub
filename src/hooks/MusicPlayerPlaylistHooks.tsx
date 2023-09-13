import { createContext, useContext, useReducer } from "react";
import { SongType } from "../apis/src/response.types";
import { DATA_SHARING_FOR_PLAYLIST_TYPE } from "../apis/src/queryKeys";

type InitialStateType = {
  open?: boolean;
  currentSong?: SongType;
  pageNumber?: number;
  index?: number;
  type?: DATA_SHARING_FOR_PLAYLIST_TYPE;
  payload?: {};
};

type ToggleOpenAction = {
  type: "TOGGLE_OPEN";
  payload: {
    open: boolean;
  };
};

type SetCurrentSongAction = {
  type: "SET_CURRENT_SONG";
  payload: {
    currentSong: SongType;
  };
};

type SetCurrentSongWithPaginationAction = {
  type: "SET_CURRENT_SONG_WITH_PAGINATION";
  payload: {
    type: DATA_SHARING_FOR_PLAYLIST_TYPE;
    index: number;
    pageNumber: number;
    payload: {};
  };
};

type actionType =
  | ToggleOpenAction
  | SetCurrentSongAction
  | SetCurrentSongWithPaginationAction;

type MusicPlayerPlaylistProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  open: false,
  currentSong: undefined,
  pageNumber: undefined,
  index: undefined,
  type: undefined,
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
        pageNumber: undefined,
        index: undefined,
        type: undefined,
        payload: undefined,
        currentSong: action.payload.currentSong,
      };
    case "SET_CURRENT_SONG_WITH_PAGINATION":
      return {
        ...state,
        type: action.payload.type,
        index: action.payload.index,
        pageNumber: action.payload.pageNumber,
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
