module.exports = {
    extends: [
        'react-app',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        "@typescript-eslint/no-explicit-any": "off"
      }
};