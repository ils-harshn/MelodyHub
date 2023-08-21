export type ThemeTypes = "light" | "dark";

export type ThemeProviderType = {
  currentTheme: ThemeTypes;
  children: React.ReactNode;
};

export type ThemeContextValue = {
  theme: ThemeTypes;
  toggleTheme: (themeName: ThemeTypes) => void;
};
