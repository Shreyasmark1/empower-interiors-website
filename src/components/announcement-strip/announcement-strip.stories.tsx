import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Container } from "@/components/ui/container";

import { AnnouncementStrip } from "./announcement-strip";

const meta = {
  title: "Furnish/Promos/AnnouncementStrip",
  component: AnnouncementStrip,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
  },
  args: {
    src: "https://picsum.photos/seed/announce/1676/153",
    width: 1676,
    height: 153,
  },
} satisfies Meta<typeof AnnouncementStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullWidth: Story = {};

export const InContainer: Story = {
  render: (args) => (
    <Container>
      <AnnouncementStrip {...args} />
    </Container>
  ),
};

export const NoDimensions: Story = {
  args: {
    width: undefined,
    height: undefined,
  },
};
