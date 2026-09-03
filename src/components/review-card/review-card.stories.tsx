import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ReviewCard } from './review-card'

const meta = {
  title: 'Demos/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  args: {
    review: {
      id: 'r0',
      reviewer: 'Reviewer',
      date: 'date',
      rating: 5,
      body: 'Review text.',
      verified: false,
    },
  },
} satisfies Meta<typeof ReviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const FiveStarVerified: Story = {
  name: '5★ Verified',
  render: () => (
    <div className="w-[320px]">
      <ReviewCard
        review={{
          id: 'r1',
          reviewer: 'Ananya S.',
          date: '2 weeks ago',
          rating: 5,
          body: 'The lounge chair is stunning in person — the plum-toned fabric ties the whole room together.',
          verified: true,
        }}
      />
    </div>
  ),
}

export const FourStar: Story = {
  name: '4★',
  render: () => (
    <div className="w-[320px]">
      <ReviewCard
review={{
            id: 'r2',
            reviewer: 'Rahul M.',
            date: '1 month ago',
            rating: 4,
            body: 'Great build quality and assembly was straightforward. Delivery was prompt.',
            verified: false,
          }}
      />
    </div>
  ),
}

export const ThreeStarShort: Story = {
  name: '3★ Short response',
  render: () => (
    <div className="w-[320px]">
      <ReviewCard
        review={{
          id: 'r3',
          reviewer: 'Divya K.',
          date: '3 months ago',
          rating: 3,
          body: 'Looks nice but the cushions feel firmer than expected.',
          verified: true,
        }}
      />
    </div>
  ),
}