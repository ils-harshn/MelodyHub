import { createContext, useContext, useReducer } from "react";

type InitialStateType = {
  index?: number;
};

type ToggleAction = {
  type: "TOGGLE";
  payload: {
    index: number;
  };
};

type actionType = ToggleAction;

type MusicPlayerRandomAndRepeatProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  index: 0,
};

const MusicPlayerRandomAndRepeatContext = createContext(initialState);
const DispatchContext = createContext<React.Dispatch<actionType> | null>(null);

function musicPlayerRandomAndRepeatReducer(
  state = initialState,
  action: actionType
) {
  switch (action.type) {
    case "TOGGLE":
      return {
        index: action.payload.index,
      };
    default:
      return initialState;
  }
}

export const MusicPlayerRandomAndRepeatProvider: React.FC<
  MusicPlayerRandomAndRepeatProviderType
> = ({ children }) => {
  const [state, dispatch] = useReducer(
    musicPlayerRandomAndRepeatReducer,
    initialState
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <MusicPlayerRandomAndRepeatContext.Provider value={state}>
        {children}
      </MusicPlayerRandomAndRepeatContext.Provider>
    </DispatchContext.Provider>
  );
};

export function useMusicPlayerRandomAndRepeatData() {
  const state = useContext(MusicPlayerRandomAndRepeatContext);
  return state;
}

export function useMusicPlayerRandomAndRepeatDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Dispatch is null");
  }
  return dispatch;
}
