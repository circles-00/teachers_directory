/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '769px'
      },
      colors: {
        primary: '#00AB55',
        primaryTransparent: {
          16: 'rgba(0, 171, 85, 0.16)',
          28: 'rgba(0, 171, 85, 0.28)',
        },
        colorText: '#212B36'
      },
    },
  },
  plugins: [],
}

module.exports = config
