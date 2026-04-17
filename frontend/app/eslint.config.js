import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
	{ ignores: ['dist', 'node_modules'] },

	{
		files: ['**/*.{ts,tsx,js,jsx}'],

		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parser: tseslint.parser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},

		plugins: {
			react,
			'react-hooks': reactHooks,
			prettier,
			'@typescript-eslint': tseslint.plugin,
			'simple-import-sort': simpleImportSort,
		},

		rules: {
			...js.configs.recommended.rules,
			...tseslint.configs.recommended[0].rules,
			...reactHooks.configs.recommended.rules,
			...eslintConfigPrettier.rules,

			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/jsx-uses-vars': 'warn',

			// импорт-сортировка
			'import/order': 'off',
			'simple-import-sort/imports': 'warn',
			'simple-import-sort/exports': 'warn',

			// приятные предупреждения вместо ошибок
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'off',

			// prettier — только предупреждения
			'prettier/prettier': [
				'warn',
				{
					endOfLine: 'auto',
				},
			],
		},

		settings: {
			react: { version: 'detect' },
		},
	},
]
