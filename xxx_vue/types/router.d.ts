// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file. Make sure it's included in
// project's tsconfig.json "files"
import 'vue-router'
import { IMenu } from './menu'

// To ensure it is treated as a module, add at least one `export` statement
export { }

declare module 'vue-router' {
    interface RouteMeta {
        auth?: boolean  //是否需要验证登录
        guest?: boolean // 游客
        menu?: IMenu
        permission?: string // 权限
    }
}
