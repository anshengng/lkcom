<script setup lang="ts">
const activeName = ref('mobile')

</script>


<template>
    <div>
        <el-tabs type="card" v-model="activeName" class="ml-4 bg-white rounded-md pt-2 pl-5 h-[800px] tabs_title"
        @click.stop>
            <el-tab-pane label="绑定手机" name="mobile" class="pl-3">
                <bind-mobile class="pr-5"></bind-mobile>
            </el-tab-pane>
            <el-tab-pane label="绑定微信" name="wechat" class="pl-3">
                <bind-wechat></bind-wechat>
            </el-tab-pane>
            <el-tab-pane label="绑定qq" name="qq" class="pl-3">
                <bind-qq class="pr-5"></bind-qq>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>


<style lang="scss" scoped></style>