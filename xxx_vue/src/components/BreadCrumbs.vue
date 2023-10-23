<script setup lang="ts">
import menuStore from '@/store/menuStore'

const menus = menuStore()
const curRoute = menus.curRoute
// console.log(curRoute);

</script>


<template>
    <div>
        <el-breadcrumb separator="/" class="pb-5 pt-[1px]">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: r.path }" v-for="(r, index) in curRoute?.matched" :key="index">{{ r.meta.menu?.title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>


<style lang="scss" scoped></style>