<script setup lang="ts">
import CenterNav from "../admin/components/centerNav.vue";
</script>

<template>
    <div class="h-20 flex justify-center">
        <div class="md:w-[1700px] h-full flex items-center">
            <div class="h-full md:flex hidden items-center">
                <i class="fab fa-bilibili text-red-500 text-5xl ml-4 mr-3"></i>
                <span class="text-2xl text-red-500 font-bold block">jizhu.com</span>
            </div>
            <div class="md:w-[1200px] h-full flex items-center mr-24">
                <div class="w-full flex">
                    <router-link to="/">首页</router-link>
                    <router-link to="">项目文档</router-link>
                    <router-link to="/post">话题讨论</router-link>
                    <router-link to="/soft"><i class="fab fa-chrome mr-1 hidden md:inline-block"></i>作品</router-link>
                </div>
            </div>
            <CenterNav></CenterNav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
div {
    div a {
        @apply text-xl font-bold text-gray-600 ml-5 pt-1 cursor-pointer;

        &:hover {
            @apply text-gray-400;
        }

        &:active {
            @apply text-gray-600;
        }
    }
}
</style>
