<script setup lang="ts">
import { Suspense } from 'vue';
import TopBar from '@/layouts/header/topBar.vue'
// import userinfo from '@/apis/user'

// const response  = await userinfo()
// console.log(response);
</script>

<template>
  <!-- 等待加载完成在渲染 -->
  <TopBar></TopBar>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style scoped></style>
