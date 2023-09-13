import { createContext, useContext, useReducer } from "react";
import { SongType } from "../apis/src/response.types";

type InitialStateType = {
  open?: boolean;
  currentSong?: SongType;
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

type actionType = ToggleOpenAction | SetCurrentSongAction;

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
