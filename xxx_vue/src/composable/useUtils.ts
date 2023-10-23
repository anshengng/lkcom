import router from '@/router'
import { RouteLocationRaw } from 'vue-router'

export default () => {
    /**
     * 限制点击频率
     * @param fn
     * @returns
     */
    function request(fn: (args?: any) => Promise<any>) {
        let isSend = false
        return (args?: any) => {
            if (isSend) return
            isSend = true
            return fn(args).finally(() => (isSend = false))
        }
    }

    /**
     * 根据路由访问页面
     * @param route 路由
     * @param target 跳转方式 _self当前页 _blank 新窗口
     */
    function open(url: RouteLocationRaw | string, target: '_blank' | '_self' = '_self') {
        if (typeof url != 'string') url = router.resolve(url).fullPath
        if (target == '_blank') window.open(url)
        else location.href = url
    }



    return {
        open,
        request,
    }
}
