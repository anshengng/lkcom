<script setup lang="ts">
import { useCaptcha } from '@/composable/captcha/useCaptcha'


const text = ref('')

const emits = defineEmits(['update:captcha_key','update:captcha_value'])

const { get_captcha, captcha } = useCaptcha()

await get_captcha()

watch(text,()=>{
    emits('update:captcha_value',text.value)
    emits('update:captcha_key',captcha.value.key) // 验证码key
})

</script>


<template>
    <div class="flex h-10 mt-6  items-center">
        <LkInput placeholder="请输入验证码" v-model="text"></LkInput>
        <div v-html="captcha.svg" @click="get_captcha"></div>
    </div>
</template>


<style lang="scss" scoped></style>