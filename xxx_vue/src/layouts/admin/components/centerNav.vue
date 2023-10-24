<script setup lang="ts">
import utils from '@/utils'
import Notification from '@/components/Notification.vue';
import userStore from '@/store/userStore';

let isFullScreen = false
const user = userStore()

const userInfo = computed(() => user.userInfo)
let showMessage = ref<boolean>(false)
const token = computed(() => user.token)

document.documentElement.addEventListener('click', () => {
    showMessage.value = false
})
//使用esc退出全屏时记得改变isFullScreen的值(无法使用TypeError: Permissions check failed)
// document.documentElement.addEventListener('fullscreenchange', (e) => {
//     clickFull()
// })

const clickFull = () => {
    if (!isFullScreen) {
        isFullScreen = true
        document.documentElement.requestFullscreen()
    } else {
        isFullScreen = false
        document.exitFullscreen()
    }
}

const showMsg = () => {
    showMessage.value = !showMessage.value
}
</script>


<template>
    <div class="h-full flex justify-center items-center relative cursor-pointer">
        <div class="flex flex-col items-center mr-7 message">
            <i class="fas fa-message text-gray-500 text-2xl pt-1" @click.stop="showMsg">
                <span class="hidden">通知</span>
            </i>
            <Notification v-show="showMessage" />
        </div>
        <div class="text-2xl mr-7 text-gray-500 message">
            <i class="fab fa-delicious" @click="clickFull">
                <span class="hidden">全屏</span>
            </i>
        </div>
        <div class="group h-full flex items-center" v-if="token">
            <div class="flex justify-center items-center min-w-[100px]">
                <img :src="userInfo.avator" class="w-10 h-10 rounded-full object-cover">
                <span class="ml-4 text-lg md:block hidden">{{ userInfo.nickname || userInfo.name }}</span>
            </div>
            <div class="hidden group-hover:block absolute top-16 border-2 shadow-md rounded-xl bg-white z-10">
                <div class="my-2">
                    <a class="border-b py-2 px-3 hover:bg-slate-400 cursor-pointer" href="/member">个人中心</a>
                </div>
                <div class="my-2">
                    <a class="border-b py-2 px-3 hover:bg-slate-400 cursor-pointer">个人空间</a>
                </div>
                <div class="my-2">
                    <a class="px-3 py-2 hover:bg-slate-400 cursor-pointer" @click="utils.user.userLogout">退出登录</a>
                </div>
            </div>
        </div>
        <div v-else>
            <button class="w-10 h-6 bg-gray-300 text-xs rounded-md " @click="$router.push('/login')">登录</button>
            <button class="w-10 h-6 bg-gray-300 ml-1 text-xs rounded-md" @click="$router.push('/register')">注册</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.message {
    @apply relative;

    i {
        &:hover {
            span {
                @apply block absolute w-12 text-lg top-10 -left-1 bg-white;
            }
        }
    }
}
</style>