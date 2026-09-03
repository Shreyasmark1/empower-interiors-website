import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SearchInput } from './search-input'

const meta = {
  title: 'Furnish/Forms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Search furniture, lighting…',
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: 'w-[320px]' },
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-[320px] flex-col gap-2">
      <label className="text-sm font-medium" htmlFor="sb-search">
        Search
      </label>
      <SearchInput id="sb-search" {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, className: 'w-[320px]' },
}