<script setup lang="ts">
import postPage from './post/index.vue'

</script>

<template>
    <div class="bg-gray-100 md:flex justify-center md:overflow-hidden px-0 mx-0">
        <div class="post_ontainer md:w-[1650px] min-h-screen">
            <Notice></Notice>
            <div class="grid justify-center w-full md:grid-cols-[5fr,2fr]">
                <postPage></postPage>
                <MBoard class="hidden md:block"></MBoard>
            </div>
        </div>
    </div>

    <!-- <div class="bg-sky-200 flex flex-col justify-center items-center h-screen">
        <div class="w-52 h-52 rounded-full overflow-hidden -translate-y-7">
            <img class="w-full h-full object-cover" :src="user.userInfo.avator" alt="">
        </div>
        <div class="z-10">
            <router-link to="/admin/home">
                <button class="global-button  w-32 mr-4">后台管理</button>
            </router-link>
            <router-link to="/login" v-if="!Object.keys(user.userInfo).length">
                <button class="global-button w-32 !bg-cyan-400 hover:!bg-green-500"  >登录注册</button>
            </router-link>
        </div>
        <p class="mt-6 text-gray-600 text-sm">欢迎来到jizhu后台管理系统</p>
    </div> -->
</template>

<style lang="scss" scoped></style>