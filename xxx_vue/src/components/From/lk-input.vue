<script setup lang="ts">
const props = defineProps({
    modelValue: String,
})
// const updateModelValue = (e:Event) => {
//     console.log((e.target as HTMLInputElement).value);
// }
</script>


<template>
    <input class="lk-input" :value="props.modelValue" @input="$emit('update:modelValue',($event.target as HTMLInputElement)?.value)" />
</template>


<style  scoped>
.lk-input {
    @apply p-2 w-full border-gray-100 ring-1 rounded-md outline-none duration-300 outline-offset-4 placeholder:text-base focus:outline-indigo-700
}
</style>