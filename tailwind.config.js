module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#003800',   // رنگ اصلی اپلیکیشن (نارنجی ملایم)
        dark: '#121212',      // رنگ پس‌زمینه برای حالت تاریک (خاکستری روشن)
        light: '#e4e5f1',      // رنگ پس‌زمینه برای حالت روشن (سفید خالص)
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
