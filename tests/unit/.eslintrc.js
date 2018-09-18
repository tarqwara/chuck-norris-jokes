module.exports = {
  env: {
    mocha: true
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off'
  },
};
