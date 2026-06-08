import { defineConfig } from 'eslint/config'
import nextPlugin from '@next/eslint-plugin-next'
import eslintNextConfig from '@rocketseat/eslint-config/next.js'
import reactPlugin from 'eslint-plugin-react'
import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// Obter o caminho do diretório do pacote Rocketseat para resolver dependências legadas e aninhadas
const rocketseatDir = path.dirname(
  fileURLToPath(import.meta.resolve('@rocketseat/eslint-config/package.json')),
)

const compat = new FlatCompat({
  baseDirectory: rocketseatDir,
  resolvePluginsRelativeTo: rocketseatDir,
})

const eslintConfig = defineConfig([
  // Aplica as configurações da Rocketseat traduzidas para o formato Flat Config
  ...compat.config(eslintNextConfig),

  // Aplica as configurações do Next.js (Core Web Vitals)
  {
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      'react/prefer-read-only-props': 'error',
    },
  },

  // Você pode adicionar suas regras customizadas ou ignorar pastas aqui
  {
    ignores: ['node_modules/', '.next/', 'dist/'],
  },
])

export default eslintConfig
