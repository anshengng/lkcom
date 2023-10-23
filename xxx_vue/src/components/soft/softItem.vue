<script setup lang="ts">
import { SoftModel } from '#/model';
import useUtils from '@/composable/useUtils'

const { open } = useUtils()
const props = defineProps<{
    softList: SoftModel[] | undefined,
    showButton?: boolean
}>()

defineEmits(['remove:soft'])
</script>


<template>
    <div class="grid grid-cols-4 gap-4">
        <el-card v-for="item in props.softList" :key="item.id" shadow="hover"
            :body-style="{ padding: '20px', cursor: 'pointer' }">
            <div class="flex justify-center border-b-2 pb-5 h-[300px] overflow-hidden">
                <img :src="item.preview" alt="" class="aspect-video object-cover hover:scale-110 duration-500" @click="open({
                    path: '/softDetail',
                    query: {
                        id: item.id
                    }
                })">
            </div>
            <div class="description h-[100px]">
                <p class="p-2 text-xl text-gray-500 font-bold">{{ item.title }}</p>
                <p class="line-clamp-2 p-1">{{ item.description }}</p>
            </div>
            <div v-show="props.showButton">
                <el-button type="success" plain size="default"
                    @click="$router.push({ path: '/soft/update', query: { id: item.id } })">编辑</el-button>
                <el-button type="primary" plain size="default" @click="$emit('remove:soft', item.id)">删除</el-button>
            </div>
        </el-card>

    </div>
</template>


<style lang="scss" scoped></style>