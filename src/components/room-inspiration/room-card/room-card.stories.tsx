import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RoomCard } from "./room-card";

const meta = {
  title: "Furnish/RoomInspiration/RoomCard",
  component: RoomCard,
  tags: ["autodocs"],
  argTypes: {
    card: { table: { disable: true } },
  },
  args: {
    card: {
      image: "https://picsum.photos/seed/room-card/600/750",
      title: "Warm Minimalist Living",
      subtitle: "Shop the Look",
      href: "/collections/living",
    },
  },
} satisfies Meta<typeof RoomCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithItemCount: Story = {
  args: {
    card: {
      image: "https://picsum.photos/seed/room-card-count/600/750",
      title: "Urban Office Nook",
      subtitle: "18 Products",
      href: "/collections/office",
    },
  },
};
