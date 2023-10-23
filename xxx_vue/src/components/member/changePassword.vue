<script setup lang="ts">
import ErrorStore from '@/store/userError'
import { updateUser } from '@/utils/user';

const form = reactive<{ password: string, password_confirmed: string }>({
    password: '',
    password_confirmed: ''
})
const updatePwd = async () => {
    await updateUser(form as any)
    ElMessage({
        type: 'success',
        message: '修改成功'
    })
}
</script>


<template>
    <el-form :model="form" label-width="80px" :inline="false">
        <el-form-item label="新密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input v-model="form.password_confirmed"></el-input>
        </el-form-item>
        <p class="lk-error" v-if="ErrorStore().errors.filed === 'password'">{{ ErrorStore().errors.message }}</p>
        <el-form-item>
            <el-button type="primary" @click="updatePwd">立即修改</el-button>
        </el-form-item>
    </el-form>
</template>


<style lang="scss" scoped></style>