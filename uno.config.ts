import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      title: ['Paytone One', 'sans-serif'],
    },
    colors: {
      neutral: {
        300: '#F3F4F6',
        700: '#1F2937',
      },
      primary: {
        500: '#F0F',
      },
      secondary: {
        500: '#00ffff',
      },
      tertiary: {
        500: '#ffff00',
      },
    },
  },
})
