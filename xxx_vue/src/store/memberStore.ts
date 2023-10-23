import { IMenu, Menu } from 'types/menu';
import router from "@/router";
import { defineStore } from "pinia";

export default defineStore('memberMenu', {
    state: () => ({
        menus: {} as IMenu
    }),
    actions: {
        // 获取菜单
        async getMenus() {
            this.menus = router.getRoutes()
            .filter(route => route.path === '/member')
            .reduce((menu,route) => {
                    menu.children = route.children.filter(route => route.meta?.menu)
                        .map(route => {
                            route.meta?.menu && (route.meta.menu.route = route.path) //赋值
                            return route.meta?.menu as Menu
                        })  //筛选chidren
                    menu.route = route.path
                    return menu; 
            },{} as IMenu)
        }
    }
})