import { InputWithIcon } from "../Inputs";
import { InputWithIconType } from "../Inputs.types";
import { Story } from "@storybook/react";

export default {
  title: "Components/Inputs/Input With Icon",
  component: InputWithIcon,
};

const Template: Story<InputWithIconType> = (args) => (
  <InputWithIcon {...args}></InputWithIcon>
);

export const Text = Template.bind({});

Text.args = {
  width: "initial",
  placeholder: "Search...",
  varient: "primary",
};

export const Primary = () => (
  <InputWithIcon varient="primary" placeholder="Search..." />
);
export const Secondary = () => (
  <InputWithIcon varient="secondary" placeholder="Search..." />
);
