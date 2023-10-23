<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { echar1, echar2 } from './echars'
import * as echarts from 'echarts';

interface ICard {
    title: string
    Mtotal: number
    icon: string
    iconColor: string
    totalTitle: string
    totalNumber: number
}

const cards = ref<ICard[]>([
    { title: '在线用户', Mtotal: 23843, icon: 'fab fa-adn', iconColor: 'text-blue-700', totalTitle: '总用户', totalNumber: 234324 },
    { title: '销售额', Mtotal: 34324, icon: 'fab fa-amazon-pay', iconColor: 'text-red-700', totalTitle: '总销售额', totalNumber: 2342112 },
    { title: '收入', Mtotal: 45635, icon: 'fab fa-bitcoin', iconColor: 'text-sky-700', totalTitle: '总收入', totalNumber: 12432423 },
    { title: '评论数', Mtotal: 7657567, icon: 'fab fa-buffer', iconColor: 'text-gray-700', totalTitle: '总评论数', totalNumber: 32423 },
    { title: '利润', Mtotal: 232322, icon: 'fab fa-battle-net', iconColor: 'text-yellow-700', totalTitle: '总利润', totalNumber: 32143223 },
])



onMounted(() => {
    //确保dom已经渲染完成再绘图
    nextTick(() => {
        echarts.init(document.getElementById('echar1') as HTMLDivElement).setOption(echar1);
        echarts.init(document.getElementById('echar2') as HTMLDivElement).setOption(echar2);
    })
})

</script>

<template>
    <div>
        <div class="grid  overflow-y-auto  md:grid-flow-col w-full gap-2 md:gap-4  md:p-2">
            <el-card class="min-w-[220px]" v-for="(card, index) in  cards" :key="index" shadow="hover"
                :body-style="{ padding: '20px' }">
                <template #header>
                    <div class="flex justify-between items-center cursor-pointer">
                        <span>{{ card.title }}</span>
                        <el-tag type="danger" effect="dark">月</el-tag>
                    </div>
                </template>
                <div class="cursor-pointer grid grid-flow-row">
                    <div class="flex justify-between w-full h-16">
                        <span class="text-4xl mb-4 font-bold pt-3">{{ card.Mtotal }}</span>
                        <i :class="[card.icon, card.iconColor]" class=" text-6xl"></i>
                    </div>
                    <div class="flex justify-between w-full mt-6">
                        <span class="font-bold">{{ card.totalTitle }}</span>
                        <span class="font-bold">{{ card.totalNumber }}</span>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="card grid md:grid-cols-2 m-3 p-2 gap-4">
            <el-card shadow="hover" :body-style="{ padding: '20px' }" class="w-full">
                <template #header>
                    <div>
                        <span>在线人数</span>
                    </div>
                </template>
                <div id="echar1" style="height:500px;" class="w-80 md:w-full"></div>
            </el-card>

            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <template #header>
                    <div>
                        <span>在线人数</span>
                    </div>
                </template>
                <div id="echar2" style="height:500px;" class="w-80 md:w-full"></div>
            </el-card>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@media screen and (max-width: 768px) {
    div {
        @apply m-0 p-0;
    }
}
</style>