import { ThemeTypes, themes } from "../../contexts/Context.types";

export const getThemeFromStorage = (): ThemeTypes => {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme && themes.includes(storedTheme as ThemeTypes)) {
    return storedTheme as ThemeTypes;
  } else {
    return "light";
  }
};

export const setThemeToStorage = (theme: ThemeTypes) => {
  localStorage.setItem("theme", theme);
};
