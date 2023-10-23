import { RouteRecordRaw } from "vue-router";

/**
 * 根据模块自动注册
 * ./module
 */
export default function autoloadModuleRoute(): RouteRecordRaw[] {
    const modules = import.meta.glob('../module/**.ts', { eager: true })
    const routes = [] as RouteRecordRaw[]
    // console.log(modules);

    Object.keys(modules).forEach(key => {
        routes.push((modules[key] as any).default)
    })
    return routes;
}
