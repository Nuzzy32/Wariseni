/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./assets/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fffaf6",
          100: "#f7efe7",
          200: "#eadbcf",
          300: "#ddc0aa",
        },
        clay: {
          50: "#fff4ef",
          100: "#ffe0d1",
          200: "#f8b792",
          300: "#f28f61",
          500: "#de6a32",
          600: "#c45320",
          700: "#9f4016",
          800: "#6f2a12",
        },
        cocoa: {
          700: "#4f2c1d",
          800: "#352018",
          900: "#1d120e",
        },
        ink: "#211714",
        muted: "#7c655b",
        mist: "#f5eee8",
        gold: "#b98a50",
        success: "#1f8a63",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Cormorant Garamond"', "serif"],
        alt: ['"Manrope"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 12px 30px rgba(74, 40, 24, 0.08)",
        card: "0 18px 48px rgba(78, 43, 28, 0.12)",
        float: "0 26px 60px rgba(68, 38, 26, 0.18)",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, 14px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        drift: "drift 8s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
