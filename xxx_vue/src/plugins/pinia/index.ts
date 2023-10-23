import { App } from 'vue/dist/vue.js';
import { createPinia } from 'pinia';

export default function setupPinia(app: App) {
    const pinia = createPinia()
    app.use(pinia);
}