<script setup lang="ts">
import { updateUser } from '@/utils/user';

const activeName = ref('info')
const avator = ref('')

const updateAdvator = async () => {
    await updateUser({avator:avator.value})
}
</script>


<template>
    <div>
        <el-tabs type="card" v-model="activeName" class="ml-4 bg-white rounded-md pt-2 pl-5 h-[800px] tabs_title"
            @click.stop>
            <el-tab-pane label="基本信息" name="info" class="pl-3 pr-3">
                <ChangeInfo></ChangeInfo>
            </el-tab-pane>
            <el-tab-pane label="用户头像" name="avator" class="pl-3">
                <UpdateAvator v-model="avator" @update:model-value="updateAdvator"></UpdateAvator>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="cpassword" class="pl-3 pr-3">
                <ChangePassword></ChangePassword>
            </el-tab-pane>
            <el-tab-pane label="注销账户" name="logoff" class="pl-3">
                <Logoff></Logoff>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<style  scoped></style>