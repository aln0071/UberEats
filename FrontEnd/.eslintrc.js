module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['dist/*', 'node_modules/*'],
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-underscore-dangle': 0,
  },
};
