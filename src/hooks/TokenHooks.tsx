import { createContext, useContext, useReducer } from "react";
import { clearStorage } from "../utils/helpers/tokenkeeper";

export type TokenType = string;

export type UserDataType = {
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  date_joined: string;
  is_active: boolean;
  token: TokenType;
};

type InitialStateType = UserDataType;

type SetTokenAction = {
  type: "SET_ACTION";
  payload: InitialStateType;
};

type RemoveTokenAction = {
  type: "REMOVE_TOKEN";
};

type actionType = SetTokenAction | RemoveTokenAction;

type TokenProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  email: "",
  first_name: "",
  last_name: "",
  is_active: false,
  is_admin: false,
  date_joined: "",
  token: "",
};

const TokenContext = createContext(initialState);
const DispatchContext = createContext<React.Dispatch<actionType> | null>(null);

function tokenReducer(state = initialState, action: actionType) {
  switch (action.type) {
    case "SET_ACTION":
      return {
        ...state,
        ...action.payload,
      };
    case "REMOVE_TOKEN":
      clearStorage();
      return initialState;
    default:
      return state;
  }
}

export const TokenProvider: React.FC<TokenProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(tokenReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TokenContext.Provider value={state}>{children}</TokenContext.Provider>
    </DispatchContext.Provider>
  );
};

export function useToken() {
  const state = useContext(TokenContext);
  return state;
}

export function useTokenDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Dispatch is null");
  }
  return dispatch;
}
