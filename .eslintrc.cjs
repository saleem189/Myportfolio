module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        // Vue-specific rules
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'warn',
        'vue/require-default-prop': 'off', // Allow optional props without defaults
        'vue/require-prop-types': 'warn',
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        // Disallow self‑closing on void HTML elements (e.g., <input/>)
        'vue/html-self-closing': ['error', {
            html: {
                void: 'never',
                normal: 'any',
                component: 'any'
            },
            svg: 'any',
            math: 'any'
        }],

        // General JavaScript rules
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'prefer-const': 'error',
        'no-var': 'error',

        // Code quality
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'all'],
        'no-throw-literal': 'error',
        'no-return-await': 'error',
    },
    overrides: [
        {
            files: ['**/__tests__/**/*.{j,t}s?(x)', '**/*.spec.{j,t}s?(x)', '**/*.test.{j,t}s?(x)'],
            rules: {
                'vue/one-component-per-file': 'off', // Allow multiple components in test files
            },
        },
    ],
    ignorePatterns: ['dist', 'node_modules', '*.config.js'],
}
