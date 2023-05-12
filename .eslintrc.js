module.exports = {
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "standard-with-typescript",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        project: ["./tsconfig.json"],
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "react/prop-types": 0,
        "no-console": "error",
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ["*.tsx", "*.ts"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/strict-boolean-expressions": "off",
            },
        },
    ],
    globals: {
        route: "readonly",
    },
    ignorePatterns: ["node_modules/*", "vendor/*"],
};
