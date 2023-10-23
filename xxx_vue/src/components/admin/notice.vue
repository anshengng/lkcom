<script setup lang="ts">

</script>


<template>
    <div class="md:w-full md:grid-cols-2 grid gap-4">
        <div class="mt-3 px-5 py-3 bg-slate-200 h-[200px] rounded-3xl">
            <p class="text-2xl font-bold">网站公告</p>
            <div class="notice h-[130px] line-clamp-4 p-4 break-words whitespace-normal text-xl">
                tetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetes
            </div>
        </div>
        <div class="mt-3 py-3 bg-slate-200 h-[200px] rounded-3xl">
            <p class="text-2xl px-5 pb-2 font-bold border-b-[1px] border-gray-500 block w-full">社区小贴</p>
            <div class="flex items-center flex-col">
                <div class="md:text-xl font-bold pt-2 text-gray-500">这是一个主张友好、分享、自由的技术交流社区</div>
                <div class="text-lg py-1">欢迎进行交流</div>
                <div class="py-1">让我们共同维护社区环境</div>
                <div class="contact grid-flow-row grid-cols-4 grid gap-3">
                    <i class="fab fa-github cursor-pointer"></i>
                    <i class="fab fab fa-weixin text-green-600 cursor-pointer"></i>
                    <i class="fab fab fa-weibo text-orange-600 cursor-pointer"></i>
                    <i class="fab fab fa-qq text-gray-500 cursor-pointer"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.contact {
    i {
        @apply text-xl;
    }
}

@media screen and (max-width:768px) {
    .notice {
        @apply w-[360px];
    }
}
</style>