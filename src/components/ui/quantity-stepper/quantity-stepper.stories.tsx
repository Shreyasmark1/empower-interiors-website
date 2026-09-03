import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent, within, expect } from 'storybook/test'

import { QuantityStepper } from './quantity-stepper'
import { useState } from 'react'

const meta = {
  title: 'Furnish/Forms/QuantityStepper',
  component: QuantityStepper,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
  },
  args: {
    min: 1,
    max: 10,
    value: 2,
    onValueChange: () => {},
  },
} satisfies Meta<typeof QuantityStepper>

export default meta
type Story = StoryObj<typeof meta>

const Controlled = ({ initial = 2 }: { initial?: number }) => {
  const [value, setValue] = useState(initial)
  return <QuantityStepper value={value} onValueChange={setValue} />
}

export const Default: Story = {
  render: () => <Controlled />,
}

export const AtMinimum: Story = {
  name: 'At minimum (minus disabled)',
  render: () => <Controlled initial={1} />,
}

export const AtMaximum: Story = {
  name: 'At maximum (plus disabled)',
  render: () => <Controlled initial={10} />,
}

export const Interaction: Story = {
  render: () => <Controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('status')).toHaveTextContent('2')
    await userEvent.click(
      canvas.getByRole('button', { name: 'Increase quantity' })
    )
    await expect(canvas.getByRole('status')).toHaveTextContent('3')
    await userEvent.click(
      canvas.getByRole('button', { name: 'Decrease quantity' })
    )
    await expect(canvas.getByRole('status')).toHaveTextContent('2')
  },
}