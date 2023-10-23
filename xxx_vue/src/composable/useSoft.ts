import { SoftModel } from "#/model";
import { add, find, getSoft, remove, update } from "@/apis/soft"
import router from "@/router";
import { ref } from "vue";


export async function useSoft() {

    let softList = ref<SoftModel[]>()
    let softForm = ref<Partial<SoftModel>>({})

    const get_soft = async (page: number) => {
        const res = await getSoft(page)
        softList.value = res.data as any
    }

    const findOne = async (id: number) => {
        const res = await find(id)
        softForm.value = res.data as any
    }

    const createSoft = async (data: SoftModel) => {
        await add(data)
        //清空
        // Object.keys(softForm.value).forEach((key) => {
        //     (softForm.value as { [key: string]: any })[key] = ''
        // }) //使用pinia是需要清空，因为是全局的
        router.push({ path: '/soft' })

    }
    const updateSoft = async (data: SoftModel) => {
        await ElMessageBox.confirm('确认修改？')
        await update(data)
        router.push({ path: '/soft' })
    }

    const removeSoft = async (id: number) => {
        await ElMessageBox.confirm('确认删除？')
        await remove(id)
        await get_soft(1)
    }

    return {
        get_soft,
        softList,
        softForm,
        findOne,
        createSoft,
        updateSoft,
        removeSoft
    }
}
