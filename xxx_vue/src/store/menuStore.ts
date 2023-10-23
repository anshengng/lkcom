import { IMenu } from 'types/menu';
import { MenuEnum } from './../enums/MenuEnum';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { defineStore } from "pinia";
import router from '@/router'
import utils from '@/utils';

export default defineStore('Menu', {
    state: () => ({
        menus: [] as IMenu[],
        historyMenus: [] as IMenu[],
        close: false,
        curRoute: null as RouteLocationNormalized | null,
    }),
    actions: {
        init() {
            this.getMenus()
            this.historyMenus = this.getHistoryMenus()
        },

        getHistoryMenus() {
            const routes = [] as RouteRecordRaw[]
            router.getRoutes().map(route => routes.push(...route.children)) // 获取所有的子路由用于过滤
            let hisMenus: IMenu[] = utils.store.get(MenuEnum.HISTORY_MENUS) ? utils.store.get(MenuEnum.HISTORY_MENUS).historyMenus : []
            //由于已经将无权限的路由过滤了，所以这里只需要判断路由表中是否也有（更改用户权限会导致某些路由不可用，所以此时也要对旧的历史菜单进行过滤）
            hisMenus = hisMenus.filter(menu => {
                return routes.some(route => route.meta?.menu?.title === menu.title)
            })

            return hisMenus
        },

        toggleState() {
            this.close = !this.close
        },

        getMenus() {
            this.menus = router
                .getRoutes()
                .filter(route => route.meta.menu && route.children.length) //筛选可展示的路由且有可展示的子路由
                .map(route => {
                    let menu: IMenu = route.meta?.menu as IMenu
                    menu.children = route.children.filter(route => route.meta?.menu)
                        .map(route => {
                            route.meta?.menu && (route.meta.menu.route = route.path)
                            return route.meta?.menu as IMenu
                        })
                    menu.route = route.path
                    return menu; //筛选children
                }) as IMenu[]
        },
        //添加历史菜单
        addHistoryMenus(route: RouteLocationNormalized) {

            if (!route.meta.menu || (route.matched[0].path === route.matched[1].path)) return; //父级路由不加（如/admin）,只添加二级路由(子标签) 如/admin/user 当/admin/user/pay就不添加
            this.curRoute = route
            const menu: IMenu = { ...route.meta.menu, route: route.path }
            const isHas = this.historyMenus.some(menu => menu.route === route.path)
            if (!isHas) this.historyMenus.push(menu)
            if (this.historyMenus.length > 10) this.historyMenus.pop()
            //添加后将新的继续保存在本地
            utils.store.set(MenuEnum.HISTORY_MENUS, { historyMenus: this.historyMenus })

        },

        //移除历史菜单
        removeHistoryMenus(menu: IMenu) {
            const index = this.historyMenus.findIndex((item) => item === menu)
            this.historyMenus.splice(index, 1)
            utils.store.set(MenuEnum.HISTORY_MENUS, { historyMenus: this.historyMenus })
        }
    }
})


