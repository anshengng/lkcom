import vue from '@vitejs/plugin-vue';
import { Plugin } from 'vite';
import { setupMockPlugin } from './mock';
import { setupElementPlus } from './elementplus';
import { ImportMetaEnv } from '../../types/viteEnv';


export default function setupPlugins(isBuild: Boolean, env: ImportMetaEnv) {
    let plugins: Plugin[] = [vue()]

    env.VITE_MOCK_ENABLE ? plugins.push(setupMockPlugin(isBuild)) : ''

    setupElementPlus(plugins)
    return plugins;
}