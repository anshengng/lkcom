import { getCaptcha } from "@/apis/user"
import {ref} from "vue";


export function useCaptcha() {
    let captcha = ref<Record<string,any>>({})

    const get_captcha = async () => {
        const res  = await getCaptcha()
        captcha.value = res.data as any
    }

    return {
        get_captcha,
        captcha
    }
}
