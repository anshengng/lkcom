<script setup lang="ts">
import { useSoft } from '@/composable/useSoft';

const route = useRoute()
const { findOne, softForm } = await useSoft()

await findOne(+route.query.id!)
const activeName = ref('softInfo')

</script>


<template>
        <div class="flex items-center flex-col min-h-screen  bg-gray-100 p-5">
                <section class="bg-white h-14 flex justify-between items-center px-2 text-xl font-bold opacity-70">
                        <h1>{{ softForm.title }}</h1>
                        <el-button type="primary" @click="">下载软件</el-button>
                </section>
                <el-tabs v-model="activeName" type="card" tab-position="top" @tab-click="" class="bg-white mt-2">
                        <el-tab-pane label="软件信息" name="softInfo">
                                <section class="w-full">
                                        <v-md-preview class="overflow-auto" :text="softForm.content"></v-md-preview>
                                        <!-- <MarkdownPreview :text="(softForm.content as string)"></MarkdownPreview> -->
                                </section>
                        </el-tab-pane>
                        <el-tab-pane label="评论区" name="comment">
                                <section class="w-full">
                                        <comment :sid="+$route.query.id!"></comment>
                                </section>
                        </el-tab-pane>
                </el-tabs>
        </div>
</template>


<style lang="scss" scoped>
div {
        section {
                @apply w-[1400px];
        }
}
</style>