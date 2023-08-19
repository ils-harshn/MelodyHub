import { TextInput } from "../Inputs";
import { InputType } from "../Inputs.types";
import { Story } from "@storybook/react";

export default {
  title: "Components/Inputs/Text",
  component: TextInput,
};

const Template: Story<InputType> = (args) => <TextInput {...args}></TextInput>;

export const Text = Template.bind({});

Text.args = {
  width: "initial",
  placeholder: "Email address or username",
  varient: "primary",
};

export const Primary = () => (
  <TextInput varient="primary" placeholder="Email address or username" />
);
export const Secondary = () => (
  <TextInput varient="secondary" placeholder="Email address or username" />
);
