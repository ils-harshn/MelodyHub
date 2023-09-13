import { createContext, useContext, useReducer } from "react";

type InitialStateType = {
  open?: boolean;
};

type ToggleOpenAction = {
  type: "TOGGLE_OPEN";
  payload: {
    open: boolean;
  };
};

type actionType = ToggleOpenAction;

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
    default:
      return state;
  }
}

export const MusicPlayerPlaylistProvider: React.FC<MusicPlayerPlaylistProviderType> = ({
  children,
}) => {
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
