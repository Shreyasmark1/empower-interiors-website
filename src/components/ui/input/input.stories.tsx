import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { userEvent, within, expect } from 'storybook/test'

import { Input } from './input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Furnish/Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean', name: 'Invalid state' },
  },
  args: {
    placeholder: 'Placeholder text',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-[280px] flex-col gap-2">
      <Label htmlFor="sb-email">Email</Label>
      <Input id="sb-email" {...args} />
    </div>
  ),
}

export const Focused: Story = {
  args: { defaultValue: 'Selected text' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await userEvent.click(input)
    await expect(input).toHaveFocus()
  },
}

export const Error: Story = {
  render: (args) => (
    <div className="flex w-[280px] flex-col gap-2">
      <Label htmlFor="sb-email-error" className="text-destructive">
        Invalid field
      </Label>
      <Input id="sb-email-error" aria-invalid {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled' },
}

export const WithValue: Story = {
  render: (args) => (
    <div className="flex w-[280px] flex-col gap-2">
      <Label htmlFor="sb-name">Full name</Label>
      <Input id="sb-name" defaultValue="Ananya Sharma" {...args} />
    </div>
  ),
}

export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await userEvent.type(input, 'hello')
    await expect(input).toHaveValue('hello')
  },
}