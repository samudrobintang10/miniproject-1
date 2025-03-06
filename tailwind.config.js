const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#FF8A00",
        "primary-purple": "#8000FF",
        "primary-grey": "#E9E9E9",
        "primary-black": "#303030",
        "primary-white": "#FFFFFF",
        "primary-light-orange": "#FFA674",
        "primary-music-jazz": "#FF3D00",
        "primary-blue": "#0066FF",
        "primary-red": "#E7073E",
        "primary-pink": "#F8E6FF",
        "primary-green": "#248A00",
        "secondary-blue": "#74BCFF",
        "secondary-grey": "#DCDCDC",
        "secondary-purple": "#C78EFF",
        "secondary-red": "#8A1E00",
        "secondary-brown": "#8A5F00",
        "tertiary-grey": "#AAAEBD",
        "tertiary-blue": "#1F81E2",
        "tertiary-yellow": "#7A8A00",
        "quarternary-grey": "#EEEEFF",
        "quinary-grey": "#63676F",
        "senary-grey": "#E1E1E1",
        "broken-white": "#FAFAFA",
      },
      fontFamily: {
        monserrat: ["Montserrat"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
});
