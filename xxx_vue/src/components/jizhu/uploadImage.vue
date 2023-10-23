<script setup lang="ts">
import { ImageUpload } from '@/apis/upload';

const uploadRef = ref<HTMLDivElement>()

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{ modelValue: string | undefined }>()

const upload = async (options: any) => {
    const form = new FormData()
    form.append('file', options.file)

    const res = await ImageUpload(form)
    emit('update:modelValue', res.data.url)
    // 在父组件中触发更新用户信息
}
</script>

<template>
    <div>
        <el-upload ref="uploadRef" :http-request="upload" :show-file-list="false">
            <template #trigger>
                <!-- <el-button plain type="primary" class="my-4 w-32">修改</el-button> -->
                <div class="w-32 h-32 overflow-hidden">
                    <img :src="props.modelValue ?? '/images/upload.png'"
                        class="w-full h-full object-cover rounded-xl cursor-pointer" title="点击修改">
                </div>
            </template>
        </el-upload>
    </div>
</template>


<style lang="scss" scoped></style>