<script setup lang="ts">
import { useRoute } from "vue-router";
import HistoryNav from "./admin/components/historyNav.vue";
import Menu from "./admin/components/menu.vue";
import Navbar from './admin/components/navbar.vue'
import menuStore from "@/store/menuStore";
import { watch } from "vue";

const route = useRoute()
const menus = menuStore()
menus.init()

// onBeforeUpdate(() => {
//     menus.addHistoryMenus(route)
// })
watch(route, () => {
    menus.addHistoryMenus(route)
}, { immediate: true })
</script>


<template>
    <div>
        <div class="bg" v-if="!menus.close" @click.stop="menus.close = true"></div>
        <div class="grid  grid-cols-[auto_1fr] bg-gray-100 absolute top-0 left-0 bottom-0 right-0">
            <div class="menu w-60 px-2  bg-slate-200 h-screen md:block" :class="{ 'close': menus.close }">
                <section class="flex justify-center items-center mt-2 pr-4">
                    <p class="text-lg ml-4 text-gray-700 font-bold">xxx_vue前端脚手架</p>
                </section>
                <Menu />
            </div>
            <div class="flex-1 ">
                <div>
                    <Navbar />
                    <HistoryNav />
                </div>
                <div class="h-[1100px] overflow-y-auto home">
                    <router-view #default="{ Component }">
                        <Transition enter-active-class="animate__animated animate__fadeInUp">
                            <component :is="Component" />
                        </Transition>
                    </router-view>
                </div>
                <!-- <Transition enter-active-class="animate__animated animate__fadeInUp">
                <router-view class="bg-gray-100"></router-view>
            </Transition> -->
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.close {
    @apply w-[80px] m-0;

    section {
        p {
            @apply hidden
        }

        i {
            @apply m-0 p-0
        }

        span {
            @apply hidden
        }
    }
}

@media screen and (max-width: 768px) {
    .bg {
        @apply absolute bg-gray-100 top-0 bottom-0 left-0 right-0 z-10 opacity-60;
    }

    .menu {
        @apply absolute left-0 top-0 z-50;

        dl {
            @apply w-[60px];
        }
    }

    div {
        .home {
            @apply h-[570px]
        }
    }


}
</style>