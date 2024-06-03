/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/Home.js", "./src/pages/PetDetail.js", "./src/pages/SwipePets.js"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
}

