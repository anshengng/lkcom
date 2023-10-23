import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupPlugins } from './plugins'
import '@/styles/global.scss'
import 'animate.css' //animate切换动画
import '@toast-ui/editor/dist/toastui-editor.css'

async function bootstrap() {
    const app = createApp(App)

    setupPlugins(app) // 自动更新 需要注意这俩的顺序，如果有使用pinia
    setupRouter(app) // 注册路由
    
    await router.isReady() //路由准备好在挂载
    app.mount('#app')
}

bootstrap()