import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CategorySeoSection } from "./category-seo";

const meta = {
  title: "Furnish/CategorySeoSection",
  component: CategorySeoSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof CategorySeoSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Seating",
    seo: {
      description:
        "Explore our full seating collection — sofas, chairs, benches and more, designed for real homes.",
      faqs: [
        {
          question: "How long does delivery take for seating?",
          answer:
            "Most seating orders ship within 2–4 business days and arrive in 7–10 business days.",
        },
        {
          question: "Do seating items come pre-assembled?",
          answer:
            "Most pieces arrive fully assembled; flat-pack items include a step-by-step guide.",
        },
      ],
    },
  },
};