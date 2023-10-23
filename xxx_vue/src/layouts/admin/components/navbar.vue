<script setup lang="ts">
import menuStore from '@/store/menuStore';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import CenterNav from './centerNav.vue';

const menus = menuStore()
menus.init() // 记得初始化


</script>


<template>
    <div class="pt-2 px-8 h-[60px] flex justify-between items-center bg-white">
        <div class="flex items-start pt-2">
            <i @click="menus.toggleState" :class="menus.close ? 'fas fa-caret-right' : 'fas fa-caret-left'"
                class="mr-3 cursor-pointer"></i>
            <BreadCrumbs />
        </div>
        <CenterNav></CenterNav>
    </div>
</template>


<style lang="scss" scoped>

</style>