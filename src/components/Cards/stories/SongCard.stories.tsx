import { Story } from "@storybook/react";
import SongCard from "../Cards";
import { SongCardType } from "../Cards.types";
import { SongCardWrapper } from "./SongCard.decorators";

export default {
  title: "Components/Cards/Song Card",
  component: SongCard,
  decorators: [SongCardWrapper],
};

const Template: Story<SongCardType> = (args) => <SongCard {...args}></SongCard>;

export const Variations = Template.bind({});

Variations.args = {
  data: {
    id: 400,
    album: {
      id: 239,
      code: "LAK",
      title: "Love Aaj Kal",
      year: 2009,
      thumbnail300x300:
        "https://drive.google.com/uc?id=1LNXKjq6kU3r460fJLh2wjAGIq2Et4lrB&export=download",
      thumbnail:
        "https://drive.google.com/uc?id=1MjslXO8Qd7m4nRI0IlgAP6nnRCpanVl1&export=download",
      uploaded_at: "2015-10-08T20:52:34+05:30",
    },
    artist_set: [
      {
        id: 16,
        name: "Mohit Chauhan",
        artists_thumbnail:
          "https://drive.google.com/uc?id=1udsn0VrjB2VRfXoEQXEBTLX9U06nB0th&export=download",
        artists_thumbnail300x300:
          "https://drive.google.com/uc?id=1ebbQ3oim_GpDrYrMm_A6b-ztlps5hkWD&export=download",
      },
    ],
    reaction: "neutral",
    genre: {
      id: 3,
      name: "Hindi",
    },
    title: "LAK - Dooriyan.mp3",
    url: "https://drive.google.com/uc?id=12p0SqwQ1QExVge5kXPRm65ysMe2OPzqp&export=download",
    original_name: "Dooriyan",
    views: 291,
    uploaded_at: "2021-04-11T01:55:12+05:30",
  },
};
