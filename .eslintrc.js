module.exports = {
    env: { 
        browser: true, 
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [
        {
            env: {
                jest: true,
                node: true,
            },
            files: ['**/*.ts'],
            parserOptions: {
                sourceType: 'script',
            },
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.json'],
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['**/*.js'],
    rules: {
        semi: ['error', 'always'],
        indent: ['error', 4, { 'SwitchCase': 1 }],
        'max-len': ['error', { code: 160 }],
        quotes: ['error', 'single', { avoidEscape: true }],
        eqeqeq: ['error', 'smart'],
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        'no-trailing-spaces': 'error',
        'eol-last': ['error', 'always'],
        '@typescript-eslint/no-explicit-any': 'off'
    }
};
