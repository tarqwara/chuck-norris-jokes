module.exports = {
  env: {
    mocha: true
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: [
    'chai-friendly',
  ],
  rules: {
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    'import/no-extraneous-dependencies': 'off'
  },
};
