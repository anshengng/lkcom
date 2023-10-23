<script setup lang="ts">
import { useSoft } from '@/composable/useSoft';

const route = useRoute()
const { softForm, findOne, updateSoft, createSoft } = await useSoft()

// 获取数据

if (route.query.id) {
        await findOne(+route.query.id)
}

</script>


<template>
        <div>
                <el-card shadow="always" :body-style="{ padding: '20px' }">
                        <template #header>
                                <div>
                                        <span class="font-bold" v-if="$route.query.id">软件更新</span>
                                        <span class="font-bold" v-else>软件创建</span>
                                </div>
                        </template>
                        <el-form :model="softForm" label-width="80px" :inline="false" size="large">
                                <el-form-item label="软件标题">
                                        <el-input v-model="softForm.title"></el-input>
                                </el-form-item>
                                <el-form-item label="软件描述">
                                        <el-input v-model="softForm!.description"></el-input>
                                </el-form-item>
                                <el-form-item label="软件封面">
                                        <UploadImage v-model="softForm.preview"></UploadImage>
                                </el-form-item>
                                <el-form-item label="使用说明">
                                        <Markdown v-model="softForm.content" class="w-full" :height="400"></Markdown>
                                </el-form-item>
                                <el-form-item>
                                        <el-button plain type="success"
                                                @click="$route.query.id ? updateSoft(softForm as any) : createSoft(softForm as any)"
                                                class="w-32">提交</el-button>
                                </el-form-item>
                        </el-form>
                </el-card>


        </div>
</template>


<style lang="scss" scoped></style>