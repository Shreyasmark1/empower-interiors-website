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
    viewport: {
      viewports: {
        mobile375: {
          name: 'Mobile 375',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
        tablet768: {
          name: 'Tablet 768',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop1440: {
          name: 'Desktop 1440',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
    },
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