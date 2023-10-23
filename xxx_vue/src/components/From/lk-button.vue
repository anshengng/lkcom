<script setup lang="ts">

</script>


<template>
    <button class="lk-button mt-6">
        <slot></slot>
    </button>
</template>


<style scoped>
.lk-button {
    @apply border-0 w-full rounded-lg bg-indigo-600 h-10 text-white hover:bg-indigo-500 active:bg-indigo-600
}
</style>