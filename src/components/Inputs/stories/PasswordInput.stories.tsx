import { EyeClosed, EyeOpen } from "../../../assests/icons";
import { PasswordInput } from "../Inputs";
import { PasswordInputType } from "../Inputs.types";
import { Story } from "@storybook/react";

export default {
  title: "Components/Inputs/Password",
  component: PasswordInput,
};

const Template: Story<PasswordInputType> = (args) => (
  <PasswordInput {...args}></PasswordInput>
);

export const Password = Template.bind({});

Password.args = {
  width: "initial",
  placeholder: "Password",
  varient: "primary",
  passwordVisibility: false,
  IconWhenVisible: EyeOpen,
  IconWhenHidden: EyeClosed,
};

export const Primary = () => (
  <Password varient="primary" placeholder="Password" IconWhenHidden={EyeClosed} IconWhenVisible={EyeClosed} />
);
export const Secondary = () => (
  <Password varient="secondary" placeholder="Password" IconWhenHidden={EyeClosed} IconWhenVisible={EyeClosed} />
);
