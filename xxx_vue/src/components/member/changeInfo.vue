<script setup lang="ts">
import { UserModel } from '#/model';
import userStore from '@/store/userStore';
import { updateUser } from '@/utils/user'


const user = userStore()

const form = reactive<UserModel>(user.userInfo)

const submitInfo = async () => {
        await updateUser(form)
        ElMessage({
                type: 'success',
                message: '修改成功'
        })
}
</script>


<template>
        <div>
                <el-form :model="form" label-width="80px" :inline="false" size="large">
                        <el-form-item label="昵称">
                                <el-input v-model="form.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="真实姓名">
                                <el-input v-model="form.realname"></el-input>
                        </el-form-item>
                        <el-form-item label="地址">
                                <el-input v-model="form.address"></el-input>
                        </el-form-item>
                        <el-form-item label="个人网站">
                                <el-input v-model="form.website"></el-input>
                        </el-form-item>
                        <el-form-item label="微信号">
                                <el-input v-model="form.wechat"></el-input>
                        </el-form-item>
                        <el-form-item label="微博">
                                <el-input v-model="form.microblog"></el-input>
                        </el-form-item>
                        <el-form-item label="GitHub">
                                <el-input v-model="form.github"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ">
                                <el-input v-model="form.qq"></el-input>
                        </el-form-item>
                        <el-form-item>
                                <el-button type="primary" @click="submitInfo">提交</el-button>
                        </el-form-item>
                </el-form>
        </div>
</template>


<style lang="scss" scoped></style>