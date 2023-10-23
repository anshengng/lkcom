<script setup lang="ts">
import { getArticle } from '@/apis/article';

const articles = ref()
getArticle().then(({data}) => {
    articles.value = data
})

//删除
const delArticle = (index: number) => {
    articles.value.splice(index, 1)
}

</script>


<template>
    <div class="article" >
        <Animation tag="ul" :delay=".1" :duration="2">
            <li :data-index="index" v-for="(article, index) in articles" :key="article.id">
                <span>{{ article.title }}</span>
                <button @click="delArticle(index)">删除</button>
            </li>
        </Animation>
    </div>
</template>


<style lang="scss" scoped>
.article {
    @apply flex flex-col items-center w-screen;

    ul {
        @apply flex flex-col relative;

        li {
            @apply flex items-center justify-between h-12 w-[900px] bg-slate-400 text-white m-4 pl-2 rounded-md;

            button {
                @apply rounded-md bg-cyan-300 text-black px-3 py-1 m-2 cursor-pointer;

                &:hover {
                    @apply bg-cyan-900 text-white;
                }
            }
        }
    }
}
</style>