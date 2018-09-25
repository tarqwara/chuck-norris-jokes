module.exports = {
  plugins: [
    'cypress',
    'chai-friendly',
  ],
  env: {
    mocha: true,
    'cypress/globals': true,
  },
  rules: {
    strict: 'off',
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
  },
};
