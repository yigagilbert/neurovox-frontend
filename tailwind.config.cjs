export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          brand: {
            50: "#e0f7ff",
            100: "#bfeaff",
            200: "#8dd7ff",
            300: "#5bc3ff",
            400: "#29afff",
            500: "#0096e6",
            600: "#0075b4",
            700: "#005382",
            800: "#00324f",
            900: "#00141f",
          },
          accent: {
            500: "#ffbe3b",
          },
        },
        fontFamily: {
          sans: ["Inter", "ui-sans-serif", "system-ui"],
        },
        boxShadow: {
          card: "0 4px 14px rgba(0,0,0,0.08)",
        },
      },
    },
    plugins: [require("@tailwindcss/forms")],
  };