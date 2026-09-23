import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RoomInspiration } from "./room-inspiration";

const meta = {
  title: "Furnish/RoomInspiration/RoomInspiration",
  component: RoomInspiration,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof RoomInspiration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomTitle: Story = {
  args: {
    title: "Get Inspired",
  },
};
