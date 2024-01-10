/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./public/index.html",
        "./src/**/*.{tsx,js,ts}",
        "./src/views/**/*.{tsx,js,ts}",
        "./src/components/**/*.{tsx,js,ts}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};
