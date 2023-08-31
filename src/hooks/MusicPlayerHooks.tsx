import { createContext, useContext, useReducer } from "react";

type InitialStateType = {
  open?: boolean;
  playing?: boolean;
  data?: {
    id: number;
    album_image_id: string;
  };
};

type actionType = {
  type: "TOGGLE";
  payload: InitialStateType;
};

type MusicPlayerProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  open: false,
  playing: false,
};

const MusiPlayerContext = createContext(initialState);
const DispatchContext = createContext<React.Dispatch<actionType> | null>(null);

export const ActionTypes = {
  TOGGLE: "TOGGLE",
};

function musicPlayerReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case ActionTypes.TOGGLE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

export const MusicPlayerProvider: React.FC<MusicPlayerProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(musicPlayerReducer, {/* Initialize the state */});

  return (
    <DispatchContext.Provider value={dispatch}>
      <MusiPlayerContext.Provider value={state}>
        {children}
      </MusiPlayerContext.Provider>
    </DispatchContext.Provider>
  );
};

export function useMusicPlayerData() {
  const state = useContext(MusiPlayerContext);
  return state;
}

export function useMusicPlayerDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Dispatch is null");
  }
  return dispatch;
}
