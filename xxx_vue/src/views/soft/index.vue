<script setup lang="ts">
import { useSoft } from '@/composable/useSoft'
const { get_soft, softList, removeSoft } = await useSoft()

await get_soft(1)

const removeHandler = (e: number) => {
    removeSoft(e)
}

</script>


<template>
    <div>
        <div class="flex justify-end">
            <el-button type="primary" size="default" class="mb-4" @click="$router.push('/soft/update')">上传软件</el-button>
        </div>
        <SoftItem :showButton="true" :softList="softList" @remove:soft="removeHandler"></SoftItem>
    </div>
</template>


<style lang="scss" scoped></style>