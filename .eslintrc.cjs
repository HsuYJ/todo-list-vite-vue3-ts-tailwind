/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.ts', '.tsx'],
      },
    },
    'import/extensions': [
      '.js',
      '.mjs',
      '.ts',
      '.tsx',
    ],
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'func-call-spacing': 'off',
    'no-spaced-func': 'off',
    '@typescript-eslint/func-call-spacing': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'vue/attribute-hyphenation': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
  },
};
