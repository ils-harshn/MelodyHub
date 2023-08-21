import { useState, createContext } from "react";
import {
  ThemeContextValue,
  ThemeProviderType,
  ThemeTypes,
} from "./Context.types";
import React from "react";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<ThemeProviderType> = ({
  children,
  currentTheme,
}) => {
  const [theme, setTheme] = useState<ThemeTypes>(currentTheme);

  const toggleTheme = (themeName: ThemeTypes) => {
    setTheme(themeName);
  };

  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
