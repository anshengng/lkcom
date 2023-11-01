<script setup lang="ts">
import { PostModel } from '#/model';

const { post } = defineProps<{
    post: PostModel
}>()
</script>


<template>
        <el-card shadow="hover" :body-style="{ padding: '20px', cursor: 'pointer' }" class="mb-4">
            <div class="postitem flex flex-col min-h-[100px] max-h-[160px]">
                <div class="flex items-center justify-between">
                    <p class="duration-300 hover:text-red-500 font-bold">{{ post.title }}</p>
                    <div class="author font-bold flex items-center">
                        by:<p class="ml-1 hover:text-blue-600">{{ post.user.nickname || post.user.name }}</p>
                        <i class="fas fa-eye opacity-40 ml-4 text-sm">222</i>
                    </div>
                </div>
                <div class="flex justify-between h-[160px] py-4">
                    <!-- 贴子内容预览 -->
                    <div class=" md:w-[1000px] line-clamp-4 break-words pr-4 h-[100px]">
                        {{ post.content }}
                    </div>
                    <div class="w-[150px] overflow-hidden flex justify-center items-center">
                        <img class="object-cover" v-show="post.preview" :src="post?.preview" alt="">
                    </div>
                </div>
            </div>
        </el-card>
</template>


<style lang="scss" scoped>
@media screen and (max-width: 768px) {
    .postitem {
        @apply w-[350px];
    }
}
</style>