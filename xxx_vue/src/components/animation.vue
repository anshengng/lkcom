<script setup lang="ts">
import gsap from 'gsap'
import { RendererElement } from 'vue';

interface IProps {
    tag?: string
    duration?: number
    delay?: number
}
const props = withDefaults(defineProps<IProps>(), {
    tag: '',
    duration: 3,
    delay: .5
})

const beforeEnter = (el: RendererElement) => {
    gsap.set(el, {
        opacity: 0,
    })
}
const enter = (el: RendererElement) => {
    gsap.to(el, {
        opacity: 1,
        duration: props.duration,
        delay: el.dataset.index * props.delay //使用data-index作为延迟时间
    })
}
</script>


<template>
    <div class="animation">
        <!-- 如果你想在某个节点初次渲染时应用一个过渡效果，你可以添加 appear -->
        <transition-group appear :tag="props.tag" name="article_animation" @before-enter="beforeEnter" @enter="enter">
            <slot></slot>
        </transition-group>
    </div>
</template>


<style lang="scss" scoped>
.animation {
    position: relative;
    //默认v-leave-active 可以指定name
    .article_animation-leave-active {
        transition: all .6s ease;
        position: absolute;
        width: 100%;
    }

    .article_animation-leave-to {
        opacity: 0;
    }

    .article_animation-move {
        transition: all 1s ease;
    }
}
</style>