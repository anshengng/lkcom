import { App } from 'vue/dist/vue.js';
import { setupTailwincss } from './tailwindcss';
import _ from 'lodash'
import setupElementPlus from './elementui';
import setupPinia from './pinia';
import { setup } from './markdown';

export function setupPlugins(app: App) {
    // console.log(app);
    // setRegisterComponents(app);
    setup(app)
    setupTailwincss();
    setupElementPlus();
    setupPinia(app)
}



/**
 * 全局注册src/components中的组件
 */

// function setRegisterComponents(app: App) {
//     //import.meta.glob用于按模式匹配获取匹配文件的路径信息。加{ eager: true }会直接加载这些组件，后续代码可以直接用
//     //不加则返回的是一个异步加载函数，可以将这个异步加载函数赋值给变量，然后在需要的时候调用这个函数来加载模块
//     const components = import.meta.glob('../components/**/*.vue',{ eager: true });
//     // Object.keys(components).forEach((key) => {  
//     //     const name = key.split('/').pop()?.split('.').shift();
//     //     app.component(_.camelCase(name), components[key].default)
//     // })
//     Object.entries(components).forEach(([key, module])=> {
//         const name = key.split('/').pop()?.split('.').shift();
//         app.component(_.camelCase(name), (module as any).default)
//     })
// }