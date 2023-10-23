import { createRouter, createWebHistory } from "vue-router";
import { App } from "vue/dist/vue.js";
import { routes } from "./routes";
import autoload from "./autoload";
import guard from "./guard";
// import userStore from "@/store/userStore";

const router = createRouter(
    {
        history: createWebHistory(),
        routes: [...routes]
    }
)


export async function setupRouter(app: App) {
    // const user = userStore()
    // await user.getUserInfo() //使用await保证autoload中使用时已经获取到
    autoload(router) //使用router.addRoute,在autoload中过滤权限不足的route
    guard(router) // 路由守卫
    app.use(router);
} //注册路由

export default router