module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
        "plugin:@next/next/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs", "tailwind.config.js"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: [],
    rules: {
        // "react-refresh/only-export-components": [
        //     "warn",
        //     { allowConstantExport: true },
        // ],
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
    },
};
