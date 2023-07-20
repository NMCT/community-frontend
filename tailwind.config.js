const FormKitVariants = require('@formkit/themes/tailwindcss')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
      './default.js',
  ],
  theme: {
    extend: {},
  },
    plugins: [
        FormKitVariants
        ]
}

