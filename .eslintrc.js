module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:prettier/recommended", "prettier", "eslint:recommended"],
  plugins: ["@typescript-eslint", "simple-import-sort"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "no-var": "error",
    semi: ["error", "always"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
