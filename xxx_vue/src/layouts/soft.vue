<script setup lang="ts">

</script>


<template>
    <div class="flex justify-center bg-gray-100">
        <router-view class="soft_containner p-5"></router-view>
    </div>
</template>


<style lang="scss" scoped>
.soft_containner {
    width: 1700px;
    height: calc(100vh - 80px);
}
</style>