module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        dayBg: '#FDF6E3',        // cream/light beige
        dayPrimary: '#6B4226',   // coffee brown
        dayAccent: '#4A7C59',    // matcha green

        nightBg: '#0B1220',      // deep night blue
        nightPrimary: '#C5D3E0', // soft blueish white
        nightAccent: '#87a4ecff',  // muted purple/blue
      },
    },
  },
  plugins: [],
}