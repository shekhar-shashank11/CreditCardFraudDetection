/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
       gradient: {
           '0%': { backgroundPosition: '0% 50%' },
           '50%': { backgroundPosition: '100% 50%' },
           '100%': { backgroundPosition: '0% 50%' },
         },
       },
      colors: {
        'gradient-start': '#FF0080',
        'gradient-end': '#FF8C00',
        'gradient-middle': '#FF0080',
        'gradient-light': '#FF8C00',
        'gradient-dark': '#FF0080', 
        'gradient-border': '#FF8C00',
      },
         
      animation: {
        shine: 'shine 10s linear infinite',
        gradient: 'gradient 8s linear infinite'
      },
    },
  },
  plugins: [],
};

