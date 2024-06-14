/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // "./public/index.html",
        // "./src/**/*.{js,jsx}",
        // "./src/views/**/*.{js,jsx}",
        // "./src/components/**/*.{js,jsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};
