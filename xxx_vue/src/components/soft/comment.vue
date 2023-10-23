<script setup lang="ts">
import useComment from '@/composable/useComment';

const props = defineProps<{ sid: number }>()
const { findAll, commentList, model, add, remove } = useComment(props.sid)

await findAll()

//评论回复
const reply = async (val: Record<string, any>) => {
    model.value.commentId = val.id
    model.value.content = val.replyValue
    await add()
}
</script>


<template>
    <div class="min-h-[100px] flex justify-center">
        <div v-if="commentList?.length" class="w-full ">
            <div v-for="comment in  commentList" :key="comment.id">
                <comment-item :comment="comment" @del="(id: number) => remove(id)" @reply="reply"></comment-item>
            </div>
        </div>
        <div v-else>暂没有评论，快来发表你的意见吧！！！</div>
    </div>
    <markdown v-model="model.content" :height="300"></markdown>
    <el-button type="primary" size="large" class="w-32 my-2" @click="add">确认提交</el-button>
</template>


<style lang="scss" scoped></style>