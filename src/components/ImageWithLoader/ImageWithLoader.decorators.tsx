import { DecoratorFn } from "@storybook/react";
import { ComponentType } from "react";

export const ImageWithLoaderWrapper: DecoratorFn = (
  Story: ComponentType,
  context
) => {
  return (
    <div
      style={{
        width: "280px",
        height: "280px",
        padding: "20px",
      }}
    >
      <Story />
    </div>
  );
};
