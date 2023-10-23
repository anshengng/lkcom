<script setup lang="ts">
import WangEditor from '@/components/editor/wangEditor.vue'
import { ref } from 'vue';
const content = ref('ajfpsjf')
</script>

<template>
    <div>
        <WangEditor v-model="content" url="/api/image"></WangEditor>
        {{ content }}
    </div>
</template>


<style lang="scss" scoped></style>