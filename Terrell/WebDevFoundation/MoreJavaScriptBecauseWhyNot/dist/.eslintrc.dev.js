"use strict";

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  "extends": ['standard'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "semi": ["error", "always"],
    "eol-last": "off"
  }
};