<script setup lang="ts">
import usePost from '@/composable/usePost';
import router from '@/router';
import userStore from '@/store/userStore';
import dayjs from 'dayjs';

const { model, commentModel, findOne, addComment } = usePost()
const route = useRoute()
const user = userStore()

if (route.query.id) {
        await findOne(+route.query.id)
} else {
        await ElMessage({
                message: '网络错误',
                type: 'warning'
        })
        router.push('/')
}

const reply = async (val: Record<string, any>) => {
        commentModel.value.commentId = val.id
        commentModel.value.content = val.replyValue
        await addComment(model.value.id!)
}
</script>


<template>
        <div class="flex items-center flex-col min-h-screen  bg-gray-100 p-5">
                <section class="bg-white min-h-[250px] rounded-2xl flex flex-col justify-between px-2">
                        <h1 class="my-6 mx-5 text-4xl font-bold">{{ model?.title }}</h1>
                        <div class="flex justify-between">
                                <div class="flex gap-2 ml-5">
                                        <img :src="model?.user?.avator" class="w-10 rounded-full">
                                        <div class="flex flex-col">
                                                <div class="flex items-center">
                                                        <div class="flex items-center">
                                                                <span class="text-sm hover:text-red-500 cursor-pointer">{{
                                                                        model?.user?.nickname || model?.user?.name }}</span>
                                                                <el-tag class="ml-2" size="small">楼主</el-tag>
                                                        </div>
                                                </div>
                                                <div class="space-x-2 text-sm">
                                                        <i class="fas fa-clock text-gray-500"></i>
                                                        <span>{{ dayjs(model?.user?.createAt!).format('YY-MM-DD H:mm') }}</span>
                                                </div>
                                        </div>
                                </div>
                                <div v-show="model.userId === user.userInfo.id">
                                        <el-button type="success" size="default"
                                                @click="$router.push({ path: '/post/update', query: { id: $route.query.id } })"
                                                plain>修改</el-button>
                                        <el-button type="danger" size="default" @click="" plain>删除</el-button>
                                </div>
                        </div>
                        <div class="min-h-[125px] w-full p-5">
                                <p>{{ model?.content }}</p>
                        </div>
                        <div class="p-2 gap-3 flex items-center justify-center cursor-pointer">
                                <i class="fas fa-thumbs-up text-3xl text-slate-400 "></i>
                                <p>点赞/鼓励一下</p>
                        </div>
                </section>
                <section class="rounded-2xl p-2 gap-2 flex flex-col justify-between px-2 mt-10 bg-white min-h-[200px]">
                        <CommentItem v-for="comment in model?.comment" :key="comment.id" :comment="comment"
                                :postmaster="model?.id" @reply="reply"></CommentItem>
                        <Markdown class="mt-4" v-model="commentModel.content"></Markdown>
                        <el-button type="primary" @click="addComment(model.id!)" class="w-52 m-2">发表评论</el-button>
                </section>
        </div>
</template>


<style lang="scss" scoped>
div {
        section {
                @apply w-[1400px];
        }
}
</style>