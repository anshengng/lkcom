<script setup lang="ts">
const form = reactive<{ qq?: string, captcha?: { key: string, value: number } }>({})
const captcha = form.captcha?.value

</script>


<template>
    <div>
        <el-form :model="form" size="large" label-width="80px" :inline="false" >
            <el-form-item label="qq号">
                <el-input v-model="form.qq"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <div class="flex">
                    <el-input v-model="captcha" class="!w-[1150px]"></el-input>
                    <el-button type="danger" class="ml-5">发送验证码</el-button>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">立即绑定</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>


<style lang="scss" scoped></style>