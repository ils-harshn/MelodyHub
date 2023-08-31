import { PlayPauseButton } from "../buttons";
import { PlayPauseButtonType } from "../buttons.types";
import { Story } from "@storybook/react";

export default {
  title: "Components/Buttons/Play or Pause",
  component: PlayPauseButton,
};

const Template: Story<PlayPauseButtonType> = (args) => (
  <PlayPauseButton {...args}></PlayPauseButton>
);

export const Variations = Template.bind({});

Variations.args = {
  playing: false,
};
