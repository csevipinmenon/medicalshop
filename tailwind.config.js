/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eefdf6",
          100: "#d4f9e7",
          200: "#aaf0d0",
          300: "#73e0b3",
          400: "#3cc990",
          500: "#17a876",
          600: "#0d8862",
          700: "#0d6c50",
          800: "#0e5642",
          900: "#0d4737",
        },
        ink: "#0f2a24",
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
