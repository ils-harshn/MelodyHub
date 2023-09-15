import { createContext, useContext, useReducer } from "react";

type InitialStateType = {
  loading?: boolean;
};

type ToggleOpenAction = {
  type: "TOGGLE_LOADING";
  payload: {
    loading: boolean;
  };
};

type actionType = ToggleOpenAction;

type MusicPlayerLoadingProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  loading: false,
};

const MusicPlayerLoadingContext = createContext(initialState);
const DispatchContext = createContext<React.Dispatch<actionType> | null>(null);

function musicPlayerLoadingReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return {
        ...state,
        playing: action.payload.loading,
      };
    default:
      return state;
  }
}

export const MusicPlayerLoadingProvider: React.FC<
  MusicPlayerLoadingProviderType
> = ({ children }) => {
  const [state, dispatch] = useReducer(musicPlayerLoadingReducer, {
    loading: false,
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <MusicPlayerLoadingContext.Provider value={state}>
        {children}
      </MusicPlayerLoadingContext.Provider>
    </DispatchContext.Provider>
  );
};

export function useMusicPlayerLoadingData() {
  const state = useContext(MusicPlayerLoadingContext);
  return state;
}

export function useMusicPlayerLoadingDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Dispatch is null");
  }
  return dispatch;
}
