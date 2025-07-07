/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  './src/**/*.{js,ts,jsx,tsx}',
  './node_modules/react-hook-form-datepicker/**/*.{js,ts,jsx,tsx}', // 👈 ADD THIS
], // ⬅️ scans your component files
  theme: {
    extend: {},
  },
  plugins: [],
};
