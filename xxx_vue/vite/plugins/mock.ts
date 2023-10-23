import { viteMockServe } from 'vite-plugin-mock'

export function setupMockPlugin(isBuild: Boolean) {
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: !isBuild,
  })
}