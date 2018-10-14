module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  env: { browser: true, },
  rules: {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "no-console": "error",
    "arrow-parens": 0
  },
  "plugins": ["react"]
}
