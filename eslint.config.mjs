import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextVitals,
  {
    ignores: ['.claude/**', '.next/**', 'node_modules/**'],
  },
]

export default config
