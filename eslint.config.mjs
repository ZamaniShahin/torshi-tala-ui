import next from 'eslint-config-next';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...next,
  {
    ignores: ['out/**', '.next/**', 'node_modules/**', 'public/**', 'scripts/**', 'assets-src/**'],
  },
];

export default config;
