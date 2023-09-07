import { createContext, useContext, useReducer } from "react";
import { SongType } from "../apis/src/response.types";

type InitialStateType = {
  open?: boolean;
  addToSong?: SongType;
};

type actionType = {
  type: "TOGGLE";
  payload: InitialStateType;
};

type PlaylistComponentProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  open: false,
};

const PlaylistComponentContext = createContext(initialState);
const DispatchContext = createContext<React.Dispatch<actionType> | null>(null);

export const ActionTypes = {
  TOGGLE: "TOGGLE",
};

function PlaylistComponentReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case ActionTypes.TOGGLE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const PlaylistComponentProvider: React.FC<
  PlaylistComponentProviderType
> = ({ children }) => {
  const [state, dispatch] = useReducer(PlaylistComponentReducer, {
    open: false,
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <PlaylistComponentContext.Provider value={state}>
        {children}
      </PlaylistComponentContext.Provider>
    </DispatchContext.Provider>
  );
};

export function usePlaylistComponentData() {
  const state = useContext(PlaylistComponentContext);
  return state;
}

export function usePlaylistComponentDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Dispatch is null");
  }
  return dispatch;
}
