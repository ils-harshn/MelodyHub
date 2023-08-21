import { DecoratorFn } from "@storybook/react";
import { ComponentType, useState, useEffect } from "react";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import React from "react";

export const themeChanger: DecoratorFn = (Story: ComponentType, context) => {
  const [theme, setTheme] = useState(context.globals.theme);

  useEffect(() => {
    setTheme(context.globals.theme);
    document.documentElement.dataset.theme = context.globals.theme;
  }, [context.globals.theme]);

  return (
    <ThemeProvider currentTheme={theme}>
      <Story />
    </ThemeProvider>
  );
};
