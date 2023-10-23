import { ConfigEnv, loadEnv } from 'vite'
import alias from './vite/alias'
import { parseEnv } from './vite/util'
import setupPlugins from './vite/plugins'
import { visualizer } from 'rollup-plugin-visualizer'
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias
//   }
// })


//command: 'build' | 'serve';
//mode:string ’development'、'production'等，表示当前的环境
export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))// 获取配置文件
  // console.log(parseEnv(env));

  return {
    plugins: [...setupPlugins(isBuild, env), visualizer()],
    resolve: {
      alias
    },
    //依赖模块打包
    build: {
      rollupOptions: {
        emptyOutDir: true, // 清空文件夹
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
    //开发环境设置
    server: {
      proxy: {
        '/api': {
          //将/api访问转换为target
          target: env.VITE_APP_URL,
          //跨域请求携带cookie
          changeOrigin: true,
          //url 重写删除`/api`
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
        '/public': {
          //将/api访问转换为target
          target: env.VITE_APP_URL,
          //跨域请求携带cookie
          changeOrigin: true,
        },
      },
    },
  }
}