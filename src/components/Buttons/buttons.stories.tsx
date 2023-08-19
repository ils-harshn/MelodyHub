import { Button } from "./buttons";
import { ButtonType } from "./buttons.types";
import { Story } from "@storybook/react";

export default {
  title: "Components/Buttons",
  component: Button,
};

const Template: Story<ButtonType> = (args) => <Button {...args}></Button>;

export const Variations = Template.bind({})

Variations.args = {
  varient: "primary",
  width: "fit",
  loading: false,
  disabled: false,
  children: "Variations",
  textcase: "upper-case",
}

export const Primary = () => <Button>Primary</Button>
export const Secondary = () => <Button varient="secondary">Secondary</Button>
export const Blue = () => <Button varient="blue">Blue</Button>

