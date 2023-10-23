/**
 * 根据视图（layouts,views）自动路由注册
*/
import { RouteRecordRaw } from 'vue-router';
// import { env } from "@/utils";

const layouts = import.meta.glob('../../layouts/*.vue', { eager: true })
const views = import.meta.glob('../../views/**/*.vue', { eager: true })
//获取layout的布局路由
const getRouteByModule = (file: string, module: { [key: string]: any }) => {
    const name = file.replace(/.+layouts\/|.+views\/|\.vue/gi, '')
    const route = {
        name: name?.replace('/', '-'),
        path: `/${name}`,
        component: module.default
    } as RouteRecordRaw
    
    return Object.assign(route, module.default.route ? module.default.route : route);
}

//获取子路由
const getChildrenRoutes = (layoutRoute: RouteRecordRaw): any => {
    const routes = [] as RouteRecordRaw[]
    Object.entries(views).forEach(([file, module]) => {
        if (file.includes(`../views/${layoutRoute.name as string}`)) {
            const route = getRouteByModule(file, module as any)
            routes.push(route)
        }
    })
    return routes;
}

function getRoutes() {
    const layoutRoutes = [] as RouteRecordRaw[]
    Object.entries(layouts).forEach(([file, module]) => {
        const route = getRouteByModule(file, module as any)
        route.children = getChildrenRoutes(route)
        layoutRoutes.push(route)
    })
    return layoutRoutes;
}

//判断环境变量中是否设置为自动注册
// const routes = env.VITE_AUTOLOAD ? getRoutes() : [] as RouteRecordRaw[]

export default getRoutes();

