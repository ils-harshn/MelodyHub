import { createContext, useContext, useReducer } from "react";
import { FilterOptionType } from "../apis/src/payload.types";

type InitialStateType = {
  text: string;
  option: FilterOptionType;
};

type actionType = {
  type: "TOGGLE";
  payload: InitialStateType;
};

type SearchBoxProviderType = {
  children: React.ReactNode;
};

const initialState: InitialStateType = {
  text: "",
  option: "original_name",
};

const SearchBoxContext = createContext(initialState);
const DispatchContext = createContext<React.Dispatch<actionType> | null>(null);

export const ActionTypes = {
  TOGGLE: "TOGGLE",
};

function searchBoxReducer(state = initialState, action: actionType) {
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

export const SearchBoxProvider: React.FC<SearchBoxProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(searchBoxReducer, {
    text: "",
    option: "original_name",
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <SearchBoxContext.Provider value={state}>
        {children}
      </SearchBoxContext.Provider>
    </DispatchContext.Provider>
  );
};

export function useSearchBoxData() {
  const state = useContext(SearchBoxContext);
  return state;
}

export function useSearchBoxDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Dispatch is null");
  }
  return dispatch;
}
