import router from "@/router";
import { IMenu } from "types/menu";
import { ref } from "vue";
/**
 * 使用  import menuService from '@/composable/MenuService'
         menuService.init()
 */
class Menu {
    public menus = ref<IMenu[]>([])
    public historyMenus = ref<IMenu[]>([])
    
    
    public init() {
        this.menus.value = this.getMenus()
    }

    //获取所有菜单
    private getMenus() {
        return router.getRoutes()
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
    }
}


export default new Menu();