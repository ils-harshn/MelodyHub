import { createContext, useContext, useReducer } from "react";

type InitialStateType = {
  playing?: boolean;
};

type ToggleOpenAction = {
  type: "TOGGLE_PLAYING";
  payload: {
    playing: boolean;
  };
};

type actionType = ToggleOpenAction;

type MusicPlayerProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  playing: false,
};

const MusiPlayerContext = createContext(initialState);
const DispatchContext = createContext<React.Dispatch<actionType> | null>(null);

function musicPlayerReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case "TOGGLE_PLAYING":
      return {
        ...state,
        playing: action.payload.playing,
      };
    default:
      return state;
  }
}

export const MusicPlayerProvider: React.FC<MusicPlayerProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(musicPlayerReducer, { playing: false });

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
