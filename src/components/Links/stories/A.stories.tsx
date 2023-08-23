import { Story } from "@storybook/react";
import A from "../Links";
import { AType } from "../Links.types";
import { RouterProviderDecorator } from "./decorators";

export default {
  title: "Components/Links/A",
  component: A,
  decorators: [RouterProviderDecorator],
};

const Template: Story<AType> = (args) => <A {...args}></A>;

export const Variations = Template.bind({});

Variations.args = {
  size: "medium",
  children: "Uniform Resource Locator",
};
