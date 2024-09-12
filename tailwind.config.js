/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-1": "0.6px 1px 5px -2px #ccc",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(115deg, #0d0d0d 35%, #1a1a1a 85%)",
        "custom-gradient-2":
          "linear-gradient(50deg, transparent 80%, rgb(251, 249, 248  , .4) 95%)",
      },
    },
  },
  plugins: [],
};
