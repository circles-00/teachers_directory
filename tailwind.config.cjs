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
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  plugins: [require("daisyui")],
}

module.exports = config
