import { SelectInput } from "../Inputs";
import { SelectInputType } from "../Inputs.types";
import { Story } from "@storybook/react";

export default {
  title: "Components/Inputs/Selector",
  component: SelectInput,
};

const options = [
  { value: "violet", label: "Violet" },
  { value: "indigo", label: "Indigo" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "red", label: "Red" },
];

const Template: Story<SelectInputType> = (args) => (
  <SelectInput options={options} {...args}></SelectInput>
);

export const Variations = Template.bind({});

Variations.args = {
  size: "small",
};
