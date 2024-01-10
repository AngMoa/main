/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./public/index.html",
        "./src/**/*.{js,jsx}",
        "./src/views/**/*.{js,jsx}",
        "./src/components/**/*.{js,jsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};
