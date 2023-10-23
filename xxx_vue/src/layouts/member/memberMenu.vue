<script setup lang="ts">
import userStore from '@/store/userStore';
import memberStore from '@/store/memberStore';

const user = userStore()
const userInfo = computed(()=>user.userInfo)

const member = memberStore()

onMounted(async () => {
    await member.getMenus()
})

</script>


<template>
    <div>
        <div class="avator w-full h-[330px] bg-white rounded-2xl overflow-hidden">
            <div class="overflow-hidden" v-if="userInfo.avator">
                <img :src="userInfo.avator" alt="" class="object-cover cursor-pointer duration-200 hover:scale-110">
            </div>
            <!-- 昵称 -->
            <span class="text-gray-700 font-bold block text-2xl w-full text-center mt-2">{{ userInfo.nickname }}</span>
            <span class="text-black block text-lg w-full text-center mt-2">注册于{{ userInfo.createAt?.slice(0, 10) }}</span>
            <span class="text-black block text-md w-full text-center mt-2">ID:{{ userInfo.id }}</span>
        </div>
        <div class="menu w-full bg-white mt-6 rounded-2xl overflow-hidden flex flex-col" v-if="member.menus">
            <div v-for="menu in member.menus.children" :class="{ active: `/member/${menu.route}` === $route.path }"
                class="cursor-pointer">
                <router-link v-if="menu.route" :to="menu.route">{{ menu.title }}</router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.menu {
    div {
        @apply h-16 w-full  text-lg border-b-[1px];

    }
    div a {
        @apply w-full h-full flex justify-center items-center;
    }

    .active {
        @apply bg-gray-300;
    }
}
</style>