module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent' : 'off',
    'no-multiple-empty-lines' : 'off',
    'key-spacing' : 'off',
    'no-trailing-spaces' : 'off',
    'eol-last' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
