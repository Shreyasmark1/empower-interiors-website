import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FreshFinds, type DealsProduct } from "./fresh-finds";

const products: DealsProduct[] = [
  {
    image: "https://picsum.photos/seed/fresh-1/370/370",
    name: "Bamboo Planter",
    price: 349,
    originalPrice: 499,
  },
  {
    image: "https://picsum.photos/seed/fresh-2/370/370",
    name: "Linen Cushion Cover",
    price: 299,
    originalPrice: 399,
  },
  {
    image: "https://picsum.photos/seed/fresh-3/370/370",
    name: "Brass Table Lamp",
    price: 1199,
    originalPrice: 1799,
    discountPercent: 33,
  },
  {
    image: "https://picsum.photos/seed/fresh-4/370/370",
    name: "Ceramic Diffuser",
    price: 550,
    originalPrice: 750,
  },
  {
    image: "https://picsum.photos/seed/fresh-5/370/370",
    name: "Oak Wall Shelf",
    price: 899,
    originalPrice: 1200,
  },
];

const meta = {
  title: "Furnish/FreshFinds",
  component: FreshFinds,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
  args: {
    title: "Fresh Finds at Empower",
    products,
  },
} satisfies Meta<typeof FreshFinds>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
