import { DecoratorFn } from "@storybook/react";
import { ComponentType } from "react";

export const SongCardWrapper: DecoratorFn = (
  Story: ComponentType,
  context
) => {
  return (
    <div
      style={{
        maxWidth: "280px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
        <Story />
    </div>
  );
};
