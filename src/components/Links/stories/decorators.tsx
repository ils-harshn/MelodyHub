import { DecoratorFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { ComponentType } from "react";

export const RouterProviderDecorator: DecoratorFn = (
  Story: ComponentType,
  context
) => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Story />
    </MemoryRouter>
  );
};
