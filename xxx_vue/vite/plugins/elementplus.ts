import { Plugin } from "vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
//yarn add -D unplugin-vue-components unplugin-auto-import
//yarn add -D webpack
export function setupElementPlus(plugins: Plugin[]) {
  plugins.push(
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],//为true时在项目根目录自动创建
      dts: 'types/auto-imports.d.ts',//主动注册vue和veu-router生成的类型声明文件
    }),
    Components({
      resolvers: [ElementPlusResolver(),VueUseComponentsResolver()],
      dirs: ['src/components'],//自动加载的组件目录，默认为['src/components']
      directoryAsNamespace: false, // 包含目录防止同名的冲突 比如markdown/editor.vue和wangEditor/editor.vue
      dts: 'types/components.d.ts',//生成的全局注册类型声明文件的地址
    }),
  )
}