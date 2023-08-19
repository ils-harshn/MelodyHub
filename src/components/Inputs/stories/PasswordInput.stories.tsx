import { PasswordInput } from "../Inputs";
import { InputType } from "../Inputs.types";
import { Story } from "@storybook/react";

export default {
  title: "Components/Inputs/Password",
  component: PasswordInput,
};

const Template: Story<InputType> = (args) => (
  <PasswordInput {...args}></PasswordInput>
);

export const Password = Template.bind({});

Password.args = {
  width: "initial",
  placeholder: "Password",
  varient: "primary",
};

export const Primary = () => (
  <Password varient="primary" placeholder="Password" />
);
export const Secondary = () => (
  <Password varient="secondary" placeholder="Password" />
);
