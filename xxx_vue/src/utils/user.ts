import { login, loginRef, register, update } from "@/apis/user";
import utils from "@/utils";
import { LoginEnum } from "@/enums/LoginEnum";
import userStore from "@/store/userStore";
import router from "@/router";
import ErrorStore from '@/store/userError'
import { UserModel } from "#/model";


export async function userLogin(values: loginRef) {
    try {
        const { data: { token } } = await login(values)
        //使用工具store提供的函数设置token以及过期时间
        utils.store.set(LoginEnum.TOKEN_KEY, { token })
        const route_path = utils.store.get(LoginEnum.REDIRECT_ROUTE_PATH) || '/'
        router.push(route_path)
        ErrorStore().clearError()
    } catch (error) {
        //对应操作
    }
    
}

export async function userLogout() {
    const user = userStore()
    utils.store.remove(LoginEnum.TOKEN_KEY)
    //清空pinia 的userinfo
    user.userInfo = {}
    user.token = ''
    router.push('/')
}

export async function userRgister(values:any) {
    try {
        await register(values)
        router.push({path: 'login'})
        ErrorStore().clearError()
    } catch (error) {
        //对应操作
    }
}
export async function updateUser(data:UserModel){
    const user = userStore()
    await update(data)
    await user.getUserInfo()
}
