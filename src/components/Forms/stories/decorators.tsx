import { DecoratorFn } from "@storybook/react";
import { ComponentType } from "react";
import BaseQueryProvider from "../../../apis";

export const LoginFormWrapper: DecoratorFn = (
  Story: ComponentType,
  context
) => {
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <BaseQueryProvider>
        <Story />
      </BaseQueryProvider>
    </div>
  );
};
