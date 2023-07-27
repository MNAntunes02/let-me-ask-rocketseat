/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'base-color': '#FFFFFF',
        'dark': '#29292E',
        'shadow': '#050206',
        'primary': '#835AFD',
        'primary-hover': '#6F4BD8',
        'secondary': '#E559F9',
        'danger': '#E73F5D',
        'danger-hover': '#D73754',
        'light': '#F8F8F8',
        'grey-dark': '#737380',
        'grey-medium': '#A8A8B3',
        'grey-light': '#DBDCDD',
      },
      backgroundColor:{
        'base-color': '#FFFFFF',
        'dark': '#29292E',
        'shadow': '#050206',
        'primary': '#835AFD',
        'primary-hover': '#6F4BD8',
        'secondary': '#E559F9',
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

