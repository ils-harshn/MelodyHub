import { DecoratorFn } from "@storybook/react";
import { ComponentType, useState, useEffect } from "react";
import React from "react";
import { ThemeTypes } from "../src/contexts/Context.types";
import Provider from "../src/Provider";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/ThemeContext";

export const themeChanger: DecoratorFn = (Story: ComponentType, context) => {
  const [theme, setTheme] = useState<ThemeTypes>(context.globals.theme);

  useEffect(() => {
    setTheme(context.globals.theme);
  }, [context.globals.theme, theme]);

  return (
    <>
    <ThemeProvider currentTheme={theme}>
      <Provider>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
    </>
  );
};
