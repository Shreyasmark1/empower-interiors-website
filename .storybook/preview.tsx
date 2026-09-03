import type { Preview } from '@storybook/nextjs-vite'

import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'Furnish Page',
      values: [
        { name: 'Furnish Page', value: 'var(--bg-page)' },
        { name: 'Furnish Surface', value: 'var(--bg-surface)' },
        { name: 'Brand', value: 'var(--brand)' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'var(--bg-page)',
          color: 'var(--text-main)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'var(--font-roboto)',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview