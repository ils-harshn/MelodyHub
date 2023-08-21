import { DecoratorFn } from "@storybook/react";
import { ComponentType, useState, useEffect } from "react";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import React from "react";
import { ThemeTypes } from "../src/contexts/Context.types";

export const themeChanger: DecoratorFn = (Story: ComponentType, context) => {
  const [theme, setTheme] = useState<ThemeTypes>(context.globals.theme);

  useEffect(() => {
    setTheme(context.globals.theme);
  }, [context.globals.theme, theme]);

  return (
    <ThemeProvider currentTheme={theme}>
      <Story />
    </ThemeProvider>
  );
};
