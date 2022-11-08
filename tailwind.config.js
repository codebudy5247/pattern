/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient_radial_1': 'radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%) ',
      }
    },
    colors: {
      color1: "#ffffff",
      dark_color1: "#261650",
      color2: "#F5F5F5",
      dark_color2: "#301B64",
      color3: "#6450FD",
      color4: "#7D97FF",

      warning: '#ff0000',
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent'
    }
  },
  plugins: [],
  darkMode: "class",
};
