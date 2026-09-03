import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DealsCTA } from "./deals-cta";

const meta = {
  title: "Furnish/Deals/DealsCTA",
  component: DealsCTA,
  tags: ["autodocs"],
  argTypes: {
    heading: { control: "text" },
    scriptLine1: { control: "text" },
    scriptLine2: { control: "text" },
    ctaText: { control: "text" },
    ctaLink: { control: "text" },
  },
  args: {
    heading: "Explore More Deals",
    scriptLine1: "What the",
    scriptLine2: "fry deals",
    ctaText: "Shop Now",
    ctaLink: "/deals",
  },
} satisfies Meta<typeof DealsCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    heading: "Season End Sale",
    scriptLine1: "Extra",
    scriptLine2: "% off",
    ctaText: "Grab them",
    ctaLink: "/sale",
  },
};
