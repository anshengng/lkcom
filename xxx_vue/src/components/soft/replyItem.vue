<script setup lang="ts">
import { CommentModel } from '#/model';
import userStore from '@/store/userStore';

const user = userStore()
const { comment, commenmaster } = defineProps<{ comment: Partial<CommentModel>, commenmaster: string }>()
// const showReply = ref(false)/
defineEmits(['del'])
</script>


<template>
    <div class="pl-10 bg-gray-100 m-1 rounded-md">
        <div class="flex gap-2 items-center pt-2 text-sm">
            <img class="w-6 rounded-full" :src="comment.user?.avator" alt="">
            <div class="flex items-center">
                <span class="hover:text-red-500 font-bold cursor-pointer">{{ comment.user?.nickname || comment.user?.name}}</span>
                <el-tag v-if="comment.user?.id === user.userInfo.id" class="ml-2" size="small">我</el-tag>
            </div>
            <p>回复<i class="fas fa-share text-red-500"></i></p>
            <span class="hover:text-red-500 font-bold cursor-pointer">{{ commenmaster }}</span>
        </div>
        <div class="min-h-[45px] text-sm p-2">
            {{ comment.content }}
        </div>
    </div>
</template>


<style lang="scss" scoped></style>