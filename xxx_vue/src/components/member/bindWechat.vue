<script setup lang="ts">
let isBind = ref<boolean>(true)
</script>


<template>
    <div>
        <el-button type="success" size="large" v-if="!isBind">绑定微信</el-button>
        <template v-else>
            <el-alert title="微信已经绑定,点击下方按钮更改" type="success" effect="light" show-icon closable></el-alert>
            <el-button type="danger" size="large" class="m-2" @click="isBind = !isBind">解绑微信</el-button>
        </template>
    </div>
</template>


<style lang="scss" scoped></style>