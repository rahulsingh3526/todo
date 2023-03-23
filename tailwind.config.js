/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "p-red": "#E63946",
        "p-light": "#F1FAEE",
        "p-medium": "#A8DADC",
        "p-dark": "#457B9D",
        "p-extra": "#1D3557",
      },
    },
  },
  plugins: [],
};
