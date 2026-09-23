import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DealsGrid, type DealsProduct } from "./deals-grid";

const products: DealsProduct[] = [
  {
    image: "https://picsum.photos/seed/deal-1/370/370",
    name: "Linen Armchair",
    price: 1299,
    originalPrice: 1899,
  },
  {
    image: "https://picsum.photos/seed/deal-2/370/370",
    name: "Walnut Coffee Table",
    price: 899,
    originalPrice: 1599,
    discountPercent: 44,
  },
  {
    image: "https://picsum.photos/seed/deal-3/370/370",
    name: "Pendant Lamp",
    price: 345,
    originalPrice: 1499,
    discountPercent: 77,
  },
  {
    image: "https://picsum.photos/seed/deal-4/370/370",
    name: "Accent Stool",
    price: 640,
    originalPrice: 1099,
  },
  {
    image: "https://picsum.photos/seed/deal-5/370/370",
    name: "Ceramic Vase Set",
    price: 460,
    originalPrice: 560,
  },
];

const meta = {
  title: "Furnish/Deals/DealsGrid",
  component: DealsGrid,
  tags: ["autodocs"],
  args: {
    sectionTitle: "Hot Deals",
    products,
    cta: {},
  },
} satisfies Meta<typeof DealsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const EmptyState: Story = {
  name: "EmptyState (0 products, only CTA)",
  args: {
    products: [],
  },
};
