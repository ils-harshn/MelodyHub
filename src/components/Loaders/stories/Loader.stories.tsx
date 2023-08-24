import { Story } from "@storybook/react";
import { Loader } from "../Loaders";
import { LoaderType } from "../Loaders.types";

export default {
  title: "Components/Loaders/Circular",
  component: Loader,
};

const Template: Story<LoaderType> = (args) => <Loader {...args} />;

export const Variations = Template.bind({})

Variations.args = {
  size: "medium",
  varient: "primary",
}

export const Primary = () => <Loader size="large" varient="primary"/>
export const Secondary = () => <Loader size="large" varient="secondary"/>
