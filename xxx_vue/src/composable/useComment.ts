import { CommentModel } from "#/model"
import { http } from "@/plugins/axios"

export default (sid: number) => {
    let commentList = ref<CommentModel[]>()

    let model = ref<Partial<CommentModel>>({})

    const findAll = async () => {
        const res = await http.request<CommentModel[]>({
            url: `/comment/${sid}`
        })
        commentList.value = res.data
    }

    const add = async () => {
        try {
            await http.request({
                url: `/comment/${sid}`,
                method: 'post',
                data: model.value
            })
            model.value.content = ''
            await findAll()
        } catch (e) {
            // 弹出错误信息
        }
    }

    const remove = async (id: number) => {
        await ElMessageBox.confirm('确定删除吗？')
        await http.request({
            url: `/comment/${sid}/${id}`,
            method: 'delete'
        })
        await findAll()
    }


    return {
        commentList,
        model,
        findAll,
        add,
        remove
    }
}