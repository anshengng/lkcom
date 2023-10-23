<script setup lang="ts">
import MarkDown from '@/components/editor/markdown.vue';
import { ref } from 'vue';

const content = ref('wwww')
</script>


<template>
        <div class>
                <MarkDown v-model="content" />
        </div>
</template>


<style lang="scss" scoped></style>