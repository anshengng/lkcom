<script setup lang="ts">

</script>


<template>
    <div
        class="w-16 h-16 rounded-full flex justify-center items-center border-2 border-gray-400 cursor-pointer fixed side-menu bottom-32">
        <i class="fas fa-pen text-3xl hover:text-gray-400" @click="$router.push('/post/update')"></i>
    </div>
</template>


<style lang="scss" scoped>
.side-menu {
    transform: translateX(-120%);
}

@media screen and (max-width:768px) {
    .side-menu {
        transform: translateX(0);
        bottom: 20px;
    }

}
</style>