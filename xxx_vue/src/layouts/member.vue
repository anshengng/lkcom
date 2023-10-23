<script setup lang="ts">
import userStore from '@/store/userStore';
import MemberMenu from './member/memberMenu.vue';
const user = userStore()
await user.getUserInfo()
</script>


<template>
    <div class="w-screen flex flex-col justify-center">
        <div class="bg-slate-100 main w-full flex justify-center pt-8">
            <MemberMenu class="w-[200px] h-[900px]"></MemberMenu>
            <router-view class="w-[1430px] rounded-md ml-10"></router-view>
        </div>
    </div>
</template>


<style scoped lang="scss">
.main {
    height: calc(100vh - 80px);
}
</style>