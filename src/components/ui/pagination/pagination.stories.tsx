import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Pagination } from "./pagination"

const meta = {
  title: "Furnish/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

function PaginationDemo({
  totalPages,
  initialPage = 1,
}: {
  totalPages: number
  initialPage?: number
}) {
  const [page, setPage] = useState(initialPage)
  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  )
}

export const Default: Story = {
  args: { currentPage: 1, totalPages: 16, onPageChange: () => {} },
  render: () => <PaginationDemo totalPages={16} initialPage={1} />,
}

export const MiddlePage: Story = {
  args: { currentPage: 8, totalPages: 16, onPageChange: () => {} },
  render: () => <PaginationDemo totalPages={16} initialPage={8} />,
}

export const LastPage: Story = {
  args: { currentPage: 16, totalPages: 16, onPageChange: () => {} },
  render: () => <PaginationDemo totalPages={16} initialPage={16} />,
}

export const SinglePage: Story = {
  args: { currentPage: 1, totalPages: 1, onPageChange: () => {} },
  render: () => <PaginationDemo totalPages={1} />,
}