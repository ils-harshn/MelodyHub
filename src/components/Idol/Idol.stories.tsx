import Idol from "./Idol";
import IdolType from "./Idol.type";
import { Story } from "@storybook/react";

export default {
    title: "Components/Idol",
    Component: Idol,
}

const Template: Story<IdolType> = (args) => <Idol {...args}></Idol>;

export const Variations = Template.bind({})

Variations.args = {
  size: "large",
}

export const Small = () => <Idol></Idol>