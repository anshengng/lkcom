<script setup lang="ts">
import { ref } from 'vue';


const activeName = ref('comment')
</script>


<template>
    <div class="notification">
        <el-tabs v-model="activeName" class="p-0" @click.stop>
            <el-tab-pane label="评论消息" name="comment" class="lists flex flex-col" >
                <span>评论</span>
            </el-tab-pane>
            <el-tab-pane label="系统消息" name="site">系统</el-tab-pane>
        </el-tabs>
    </div>
</template>


<style lang="scss" scoped>
.notification {
    @apply absolute top-10 -left-20 w-52 border-2 rounded-md shadow-md px-5 pb-2 z-50
}
.lists {
    @apply m-0;
    span {
        @apply block truncate border-b w-full;
        &:hover{
            @apply bg-slate-200
        }
    }
}
</style>