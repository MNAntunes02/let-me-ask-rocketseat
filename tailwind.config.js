/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'base': '#FFFFFF',
        'dark': '#29292E',
        'shadow': '#050206',
        'primary': '#835AFD',
        'danger': '#E73F5D',
        'light': '#F8F8F8',
        'grey-dark': '#737380',
        'grey-medium': '#A8A8B3',
        'grey-light': '#DBDCDD',
      },
      backgroundColor:{
        'base': '#FFFFFF',
        'dark': '#29292E',
        'shadow': '#050206',
        'primary': '#835AFD',
        'danger': '#E73F5D',
        'light': '#F8F8F8',
        'grey-dark': '#737380',
        'grey-medium': '#A8A8B3',
        'grey-light': '#DBDCDD',
      },
    },
  },
  plugins: [],
}

