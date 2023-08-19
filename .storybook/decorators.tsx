import { DecoratorFn } from "@storybook/react";

export const themeChanger: DecoratorFn = (Story, context) => {
  document.documentElement.dataset.theme = context.globals.theme;
  return <Story />;
};
