module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "prettier",
        "airbnb-typescript",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        quotes: "off",
        "@typescript-eslint/quotes": [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
            },
        ],
        indent: "off",
        "@typescript-eslint/indent": ["off"],
        semi: "off",
        "@typescript-eslint/semi": ["error"],
        "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    },
};
