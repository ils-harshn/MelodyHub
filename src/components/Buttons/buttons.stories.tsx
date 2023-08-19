import { Button } from "./buttons";
import { ButtonType } from "./buttons.types";
import { Story } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
};

const Template: Story<ButtonType> = (args) => <Button {...args}></Button>;

export const Primary = Template.bind({});

Primary.args = {
  varient: "primary",
  width: "fit",
  children: "Primary",
};
