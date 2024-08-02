/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C67C4E",
        secondary: "#EDD6C8",
        third: "#313131",
        fourth: "#E3E3E3",
        fifth: "#F9F2ED",
      },
      fontFamily: {
        sThin: ["Sora-Thin", "sans-serif"],
        sSemiBold: ["Sora-SemiBold", "sans-serif"],
        sRegular: ["Sora-Regular", "sans-serif"],
        sMedium: ["Sora-Medium", "sans-serif"],
        sLight: ["Sora-Light", "sans-serif"],
        sExtraLight: ["Sora-ExtraLight", "sans-serif"],
        sExtraBold: ["Sora-ExtraBold", "sans-serif"],
        sBold: ["Sora-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
