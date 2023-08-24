import { createContext } from "react";
import { TokenProviderType, TokenType } from "./Context.types";

export const TokenContext = createContext<TokenType | null>(null);

export const TokenProvider: React.FC<TokenProviderType> = ({
  children,
  currentToken,
}) => {
  return (
    <TokenContext.Provider value={currentToken}>
      {children}
    </TokenContext.Provider>
  );
};
