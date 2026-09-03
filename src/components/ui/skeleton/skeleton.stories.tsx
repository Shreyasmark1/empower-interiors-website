import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Skeleton } from './skeleton'
import { SkeletonCard } from '@/components/skeleton-card'

const meta = {
  title: 'Furnish/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-3">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  ),
}

export const ProductCardLoading: Story = {
  render: () => (
    <div className="w-[280px]">
      <SkeletonCard />
    </div>
  ),
}

export const ListRows: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-2.5">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-11/12" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  ),
}