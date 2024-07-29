<script setup lang="ts">
import { CommentModel } from "#/model";
import userStore from "@/store/userStore";
import dayjs from "dayjs";

const user = userStore();
const { comment, postmaster } = defineProps<{ comment: CommentModel; postmaster?: number }>();
const showReply = ref(false);
const emits = defineEmits(["del", "reply"]);

//评论回复
const replyContent = ref("");
const reply = async () => {
    await ElMessageBox.confirm("请再次确认");
    emits("reply", { replyValue: replyContent.value, id: comment.id });
    replyContent.value = "";
    showReply.value = false;
};
</script>

<template>
    <div>
        <el-card
            shadow="hover"
            :body-style="{ padding: '20px' }"
            class="cursor-pointer"
            @click="showReply = !showReply"
        >
            <template #header>
                <div class="flex justify-between">
                    <div class="flex gap-2">
                        <img
                            :src="comment.user.avator"
                            class="w-10 rounded-full"
                        />
                        <div class="flex flex-col">
                            <div class="flex items-center">
                                <span class="text-sm hover:text-red-500 cursor-pointer">{{
                                    comment.user.nickname || comment.user?.name
                                }}</span>
                                <el-tag
                                    v-if="comment.user.id === user.userInfo.id"
                                    class="ml-2"
                                    size="small"
                                    >我</el-tag
                                >
                                <el-tag
                                    v-if="comment.user.id === postmaster"
                                    class="ml-2"
                                    size="small"
                                    >楼主</el-tag
                                >
                            </div>
                            <div class="space-x-2 text-sm">
                                <i class="fas fa-clock text-gray-500"></i>
                                <span>{{ dayjs(comment.createAt).format("YY-MM-DD H:mm") }}</span>
                            </div>
                        </div>
                    </div>
                    <i
                        v-if="comment.user.id === user.userInfo.id"
                        class="fas fa-delete-left cursor-pointer hover:text-red-400"
                        @click.stop="$emit('del', comment.id)"
                    ></i>
                </div>
            </template>
            {{ comment.content }}
        </el-card>
        <div
            class="flex gap-2 m-1"
            v-if="showReply"
        >
            <el-input
                placeholder="请输入回复内容"
                v-model="replyContent"
            ></el-input>
            <el-button
                plain
                type="primary"
                size="default"
                @click="reply"
                >回复</el-button
            >
        </div>
        <replyItem
            v-for="reply in comment.replys"
            :comment="reply"
            :commenmaster="comment.user.nickname || comment.user.name!"
        ></replyItem>
    </div>
</template>

<style lang="scss" scoped></style>
