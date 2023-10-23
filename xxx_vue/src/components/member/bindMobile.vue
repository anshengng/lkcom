<script setup lang="ts">
const form = reactive<{ mobile?: string, captcha?: { key: string, value: number } }>({})
const captcha = form.captcha?.value

const isBind = ref(true)

</script>


<template>
    <div>
        <el-alert v-show="isBind" title="已经绑定手机号13333333333， 您可以在下方重新绑定" type="success" effect="light" show-icon closable></el-alert>
        <el-form :model="form" size="large" label-width="80px" :inline="false" class="mt-4">
            <el-form-item label="手机号">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="captcha">
                    <template #append>
                        <el-button type="danger" class="!bg-red-500 !text-white" >发送验证码</el-button>
                    </template>
                </el-input>

            </el-form-item>
            <el-form-item>
                <el-button type="primary">立即绑定</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>


<style lang="scss" scoped></style>