module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
         "semi": [
        "error",
        "always"
      ],
      "space-before-function-paren": 0,
      "arrow-parens": [
        "error",
        "as-needed"
      ],
      "generator-star-spacing": "off",
      "no-debugger": "error"
  }
}
