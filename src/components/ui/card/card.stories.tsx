import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Furnish/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>
          A short description of the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-[22px] text-foreground">
          Body text for the card. Cards use rounded-md, Level 1 shadow and a
          surface background.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="accent">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-[280px]">
      <div className="aspect-[4/5] w-full bg-plum-5" />
      <CardContent className="flex flex-col gap-2.5">
        <Badge variant="category">Seating</Badge>
        <CardTitle>Arcadia Lounge Chair</CardTitle>
        <p className="text-lg leading-[26px] font-medium text-foreground">
          ₹18,499
        </p>
        <Button variant="accent">Add to Cart</Button>
      </CardContent>
    </Card>
  ),
}

export const SmallPadding: Story = {
  render: () => (
    <Card data-size="sm" className="w-[320px]">
      <CardTitle>Compact card</CardTitle>
      <CardContent>
        <p className="text-sm leading-[22px] text-foreground">
          sm spacing (12px) for dense surfaces.
        </p>
      </CardContent>
    </Card>
  ),
}