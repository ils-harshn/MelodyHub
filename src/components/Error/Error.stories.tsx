import Error from "./Error";
import ErrorType from "./Error.type";
import { Story } from "@storybook/react";

export default {
  title: "Components/Error",
  component: Error,
};

const Template: Story<ErrorType> = (args) => <Error {...args}></Error>;

export const Variations = Template.bind({});

Variations.args = {
  varient: "primary",
  children: "Variations",
};

export const Primary = () => (
  <Error varient="primary">
    The state or condition of being wrong in conduct or judgement
  </Error>
);

export const Secondary = () => (
  <Error varient="secondary">
    The state or condition of being wrong in conduct or judgement
  </Error>
);
