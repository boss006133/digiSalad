module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'spaced-comment': 'off',
    'no-undef': 'off',
    'no-var': 'off',
    'prefer-const': 'off',
    'vue/attributes-order': 'off',
    'no-lonely-if': 'off',
    'one-var': 'off',
    eqeqeq: 'off',
    'unicorn/prefer-includes': 'off',
    'no-prototype-builtins': 'off',
    'no-throw-literal': 'off',
    'no-useless-escape': 'off',
    'no-unused-expressions': 'off',
    camelcase: 'off',
  },
}
