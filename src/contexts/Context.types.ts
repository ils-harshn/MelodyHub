export const themes = ["light", "dark"] as const;

export type ThemeTypes = (typeof themes)[number];

export type ThemeProviderType = {
  currentTheme: ThemeTypes;
  children: React.ReactNode;
};

export type ThemeContextValue = {
  theme: ThemeTypes;
  toggleTheme: (themeName: ThemeTypes) => void;
};
