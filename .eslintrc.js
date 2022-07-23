module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "airbnb"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        // Indent with 4 spaces
        indent: ["error", 4],

        // Indent JSX with 4 spaces
        "react/jsx-indent": ["error", 4],

        // Indent props with 4 spaces
        "react/jsx-indent-props": ["error", 4],

        quotes: ["error", "double"],

        semi: ["error", "always"],

        "no-plusplus": [2, { allowForLoopAfterthoughts: true }],

        "object-curly-newline": "off",
    },
};
