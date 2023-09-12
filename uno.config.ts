import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    extend: {
      textColor: {
        default: '#1F2937',
      },
      gridTemplateColumns: {
        'event-card': 'repeat(auto-fit, minmax(28rem, 1fr))',
      },
      gridTemplateRows: {
        'max-content': 'max-content',
      },
    },
    gridTemplateColumns: {
      'event-card': 'repeat(auto-fit, minmax(28rem, 1fr))',
    },
    gridTemplateRows: {
      'max-content': 'max-content',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      title: ['Paytone One', 'sans-serif'],
      menlo: [
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    colors: {
      neutral: {
        50: '#F9FAFB',
        300: '#F3F4F6',
        400: '#D9D9D9',
        500: '#9CA3AF',
        700: '#1F2937',
      },
      primary: {
        500: '#F0F',
        700: '#c844f5',
      },
      secondary: {
        500: '#00ffff',
        700: '#44C8F5',
      },
      tertiary: {
        500: '#ffff00',
      },
    },
  },
})
