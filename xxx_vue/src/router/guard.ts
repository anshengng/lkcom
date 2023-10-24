import { LoginEnum } from "@/enums/LoginEnum";
import user from "@/store/userStore";
import utils from "@/utils";
import { NavigationGuardNext, RouteLocationNormalized, RouteMeta, Router } from "vue-router";

class guard {
    constructor(private router: Router) {

    }
    public run() {
        this.router.beforeEach(this.beforeEach.bind(this))
    }

    private async beforeEach(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
        if (to.path === '/login' ||to.path === '/register') {
            next()
            return;
        }
        const isLogin = this.isLogin(to);
        const isGuest = this.isGuest(to);
        if (!isLogin || !isGuest) {
            next({ path: isLogin ? '/home' : '/login' }); // 如果未登录或者不允许游客访问，跳转到相应页面
            return;
        }
        const userStore = user() //pinia_userStore
        if (this.token()) {
            if (!to.path.startsWith('/member')) {
                await userStore.getUserInfo()
            }
        } //加载前获取用户数据
        //历史菜单
        next()
    }

    private token() {
        //获取token,在store.get()中判断是否过期
        return utils.store.get(LoginEnum.TOKEN_KEY)
    }
    private isGuest(route: RouteLocationNormalized) {
        let meta: RouteMeta = route.meta
        const token = this.token()

        return Boolean(!meta.guest || token); //如果在route.meta设置了guest:true就代表需要权限，就需要验证token
    }

    private isLogin(route: RouteLocationNormalized): boolean {
        let meta: RouteMeta = route.meta
        const token = this.token()

        const loginState = Boolean(!meta.auth || token);
        //增加判断拦截时的路由，让登录后返回被拦截的页面，而不是首页
        if (route.path !== '/login') {
            utils.store.set(LoginEnum.REDIRECT_ROUTE_PATH, { path: route.path })
        }

        return loginState;
    }
}


export default (router: Router) => { new guard(router).run() }