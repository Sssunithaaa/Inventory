/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        'bottle-green':'#006A4E',
        'eagle':'#004953',
        'earth':'#DADD98',
        'grey':'#444C38',
        'dgreen':'#043927',
        'sgreen':'#006241',
        'lavender':'#E2D1F9', 
        'teal':'#317773',
        'bluee':'#0D2436',
        'navy':'#001f3f'
      },
      fontFamily:{
        opensans:["'Open Sans'", 'sans-serif'],
        roboto:["'Roboto'", 'sans-serif'],
        nunitosans:["'Roboto'", 'sans-serif']
      }
    },
  },
  plugins: [
    //require('tailwindcss-animated')
  ],
}

