import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        darkBlue: '#1e3a8a',
        lightBlue: '#3b82f6',
        deepBlue: '#0a2540',
        accentPink: '#ff4081',
      },
    },
  },
  plugins: [],
} satisfies Config

