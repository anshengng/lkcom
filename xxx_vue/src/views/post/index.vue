<script setup lang="ts">
import usePost from '@/composable/usePost';

const { postList, findAll } = usePost()

await findAll()
</script>


<template>
    <div class="flex justify-center">
        <div class="grid grid-flow-row justify-center gap-2 mt-3">
            <post-item v-for="post in postList" :key="post.id" :post="post"
                @click="$router.push({ path: '/post/detail', query: { id: post.id } })"></post-item>
            <side-menu></side-menu>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>