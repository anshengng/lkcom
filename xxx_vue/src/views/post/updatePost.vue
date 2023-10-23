<script setup lang="ts">
import usePost from '@/composable/usePost';
const route = useRoute()
const { model, findOne, updatePost, addPost } = usePost()


if (route.query.id) {
        await findOne(+route.query.id)
}
</script>


<template>
        <div class="w-screen flex justify-center h-screen pt-5">
                <div class="w-[1650px]">
                        <el-form :model="model" label-width="100px" :inline="false" size="large">
                                <el-form-item label="请输入标题">
                                        <el-input v-model="model.title"></el-input>
                                </el-form-item>
                                <el-form-item label="请输入内容">
                                        <Markdown v-model="model.content" class="w-full"></Markdown>
                                </el-form-item>
                                <el-form-item label="请选择封面">
                                        <UploadImage v-model="model.preview"></UploadImage>
                                </el-form-item>
                                <el-form-item>
                                        <el-button type="primary" @click="updatePost(+$route.query.id)"
                                                v-if="$route.query.id">确定修改</el-button>
                                        <el-button type="primary" @click="addPost()" v-else>发布</el-button>
                                </el-form-item>
                        </el-form>
                </div>

        </div>
</template>


<style lang="scss" scoped></style>