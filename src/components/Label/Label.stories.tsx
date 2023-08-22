import Label from "./Label";
import LabelType from "./Label.type";
import { Story } from "@storybook/react";

export default {
  title: "Components/Label",
  component: Label,
};

const Template: Story<LabelType> = (args) => <Label {...args}></Label>;

export const Variations = Template.bind({});

Variations.args = {
  varient: "primary",
  children: "Variations",
};

export const Primary = () => (
  <Label varient="primary">
    The state or condition of being wrong in conduct or judgement
  </Label>
);

export const Secondary = () => (
  <Label varient="secondary">
    The state or condition of being wrong in conduct or judgement
  </Label>
);
