import { DecoratorFn } from "@storybook/react";
import { ComponentType } from "react";

export const LoginFormWrapper: DecoratorFn = (
  Story: ComponentType,
  context
) => {
  return (
    <div style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
    }}>
      <Story />
    </div>
  );
};
