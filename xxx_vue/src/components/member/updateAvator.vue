<script setup lang="ts">
import { ImageUpload } from '@/apis/upload';
import userStore from '@/store/userStore'

let imageUrl = ref<string>('')

const user = userStore()
const uploadRef = ref<HTMLDivElement>()

const emit = defineEmits(['update:modelValue'])
// @ts-ignore
const props = defineProps<{ modelValue: string }>()

const updateAvator = async (options: any) => {
    const form = new FormData()
    form.append('file', options.file)

    const res = await ImageUpload(form)
    emit('update:modelValue', res.data.url)
    // 在父组件中触发更新用户信息
    imageUrl.value = res.data.url
}
</script>

<template>
    <div>
        <img :src="user.userInfo.avator ?? '/images/login.jpg'" class="w-52 rounded-xl cursor-pointer">
    </div>
    <el-upload ref="uploadRef" :http-request="updateAvator" :show-file-list="false">
        <template #trigger>
            <el-button type="primary" class="m-4">修改</el-button>
        </template>
    </el-upload>
</template>


<style lang="scss" scoped></style>