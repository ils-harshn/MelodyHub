import { DecoratorFn } from "@storybook/react";
import { ComponentType } from "react";

export const themeChanger: DecoratorFn = (Story: ComponentType, context) => {
  document.documentElement.dataset.theme = context.globals.theme;
  return <Story />;
};
