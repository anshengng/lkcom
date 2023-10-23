/**
 * 用于存取token
 * 
 */


interface IData {
    data: any
    [key: string]: any
}

export default {
    set(key: string, data: any, expire?: number) {
        const cache: IData = { ...data, expire }
        if (expire) {
            expire = new Date().getTime() + expire * 1000
        }
        localStorage.setItem(key, JSON.stringify(cache))
    },

    get(key: string) {
        const item = localStorage.getItem(key)
        if (item) {
            const cache = JSON.parse(item)
            if (cache.expire && cache.expire < new Date().getTime()) {
                localStorage.removeItem(key);
                return null;
            }
            return cache[key];
        }
        return null;
    },

    remove(key: string) {
        localStorage.removeItem(key)
    }
}