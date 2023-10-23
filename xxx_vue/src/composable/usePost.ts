import { PostModel,CommentModel } from "#/model"
import { http } from "@/plugins/axios"
import router from "@/router"


export default function usePost() {

    let postList = ref<PostModel[]>()
    let model = ref<Partial<PostModel>>({}) //更新或者添加时的输入
    let commentModel = ref<Partial<CommentModel>>({})//评论model
    
    const findAll = async () => {
        const res = await http.request<PostModel[]>({
            url: `post`
        })
        postList.value = res.data
    }

    const findOne = async (pid: number) => {
        const res = await http.request<PostModel>({
            url: `post/${pid}`
        })
        model.value = res.data
    }

    const updatePost = async (id: number) => {
        const res = await http.request<PostModel>({
            url: `/post/${id}`,
            method: 'patch',
            data: model.value
        })
        router.push('/post')
        return res;
    }

    const addPost = async () => {
        const res = await http.request<PostModel>({
            url: `/post`,
            method: 'post',
            data: model.value
        })
        router.push('/post')
        return res;
    }

    const addComment = async (pid: number) => {
        const res = await http.request<PostModel>({
            url: `/post/comment/${pid}`,
            method: 'post',
            data: commentModel.value
        })
        
        return res;
    }

    return {
        postList,
        model,
        findAll,
        findOne,
        updatePost,
        addPost,
        addComment,
        commentModel
    }
}