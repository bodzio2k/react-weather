import type { Meta, StoryObj } from "@storybook/react-vite";
import CurrentLocationCard from "./CurrentLocationCard";

const meta = {
  component: CurrentLocationCard,
  title: "Card swiper",
  tags: ["autodocs"],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
} satisfies Meta<typeof CurrentLocationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Warsaw: Story = {
  args: {
    isCurrent: true,
    name: "Warsaw",
    temp: 1,
    feelsLike: -1,
    high: 0,
    low: -3,
  },
};

export const Bielsko: Story = {
  args: {
    isCurrent: false,
    name: "Bielsko-Biała",
    temp: 1,
    feelsLike: -1,
    high: 0,
    low: -3,
  },
};
