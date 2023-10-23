<script setup lang="ts">
import menuStore from "@/store/menuStore";
const menus = menuStore()
menus.init()
const historyMenus = menus.historyMenus

</script>


<template>
    <div class="pl-5 pb-2 bg-white grid gap-2 grid-flow-col justify-start" v-show="historyMenus.length">
        <router-link :to="menu.route!" v-for="menu in historyMenus" :key="menu.title"
            class="text-sm border-2 hover:shadow-md rounded-md p-2" :class="{ active: $route.path === menu.route }">
            {{ menu.title }}
            <i class="hover:text-red-500 fas fa-delete-left" @click.prevent="menus.removeHistoryMenus(menu)"></i>
        </router-link>
    </div>
</template>


<style lang="scss" scoped>
.active {
    @apply bg-sky-100
}
</style>