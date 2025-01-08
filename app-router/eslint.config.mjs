import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// __dirname과 __filename 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat 인스턴스 생성
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  'plugin:prettier/recommended', // Prettier 관련 규칙 추가
  {
    plugins: ['prettier'], // Prettier 플러그인 적용
    rules: {
      // TypeScript 관련 규칙
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // 선언되지 않은 변수 에러 규칙 추가
      'no-undef': 'error',

      // Prettier 설정
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          useTabs: true,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 80,
          bracketSpacing: true,
          arrowParens: 'avoid',
        },
      ],
    },
  },
];
