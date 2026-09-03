import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TextStrip } from "./text-strip";

const meta = {
  title: "Furnish/Promos/TextStrip",
  component: TextStrip,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    text: "Free shipping on orders over ₹999",
  },
} satisfies Meta<typeof TextStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAnnouncementImage: Story = {
  args: {
    text: "Monsoon Sale is live — Flat 20% off on all lighting",
    image: {
      src: "https://picsum.photos/seed/announce/1676/153",
      width: 1676,
      height: 153,
    },
  },
};

export const Long: Story = {
  args: {
    text: "Monsoon Sale is live — Flat 20% off on all lighting, valid until Sunday",
  },
};
