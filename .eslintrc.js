module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: `./tsconfig.json`,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'sonarjs'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
