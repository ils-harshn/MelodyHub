import { useState, createContext, useEffect } from "react";
import {
  ThemeContextValue,
  ThemeProviderType,
  ThemeTypes,
} from "./Context.types";

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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Use It Only When Using Story Book
  useEffect(() => {
    setTheme(currentTheme)
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
