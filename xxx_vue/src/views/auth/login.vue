<script setup lang="ts">
import { loginRef } from '@/apis/user';
import v from '@/plugins/validate'
import { userLogin } from '@/utils/user';
import ErrorStore from '@/store/userError'

let captcha_key = ref('')
let captcha_value = ref('')

const { handleSubmit, errors } = v.useForm({
    initialValues: {
        name: 'jizhu',
        password: 'admin'
    },
    validationSchema: {
        name: v.yup.string().required('用户名不能为空').matches(/.+@.+com|\d{11}|[a-zA-Z]+/i, '用户名格式错误'),
        password: v.yup.string().required('密码不能为空').min(3, '密码不能少于3位'),
    }
})

const { value: name } = v.useField<string>('name', { label: '用户名' })
const { value: password } = v.useField<string>('password', { label: '密码' })

const onSubmit = handleSubmit(async (values: any) => {
    if(captcha_value.value === ''){
        ElMessage({
            type: 'error',
            message: '验证码不能为空'
        })
        return;
    }
    values.captcha = { key: captcha_key.value, value: +captcha_value.value } as Record<string, string | number>
    await userLogin(values as loginRef)
})

</script>


<template>
    <form @submit.prevent="onSubmit">
        <div class="p-5 bg-slate-200 h-screen flex justify-center items-center  ">
            <div
                class="w-[820px] h-[480px] bg-white -translate-y-40 rounded-md shadow-md overflow-hidden md:grid grid-cols-2 ">
                <div class="p-5">
                    <div class="text-center text-3xl font-normal mt-5 h-14">会员登录</div>
                    <div class="w-full mt-4">
                        <lkInput placeholder="请输入手机号或邮箱" type="text" v-model="name" />
                        <p class="lk-error">{{ errors.name }}</p>
                        <p class="lk-error" v-show="!errors.name && ErrorStore().errors.filed === 'name'">{{
                            ErrorStore().errors.message }}</p>
                        <lkInput class="mt-5" placeholder="请输入密码" type="password" v-model="password" />
                        <p class="lk-error">{{ errors.password }}</p>
                        <p class="lk-error" v-show="!errors.password && ErrorStore().errors.filed === 'password'">{{
                            ErrorStore().errors.message }}</p>
                        <Captcha v-model:captcha_key="captcha_key" v-model:captcha_value="captcha_value"></Captcha>
                        <lkButton>登录</LkButton>
                    </div>
                    <div class="flex justify-center mt-3 text-2xl text-white">
                        <i class="fa-brands fa-weixin bg-green-500 p-1 rounded-full mr-3 cursor-pointer"></i>
                        <i class="fa-brands fa-weibo bg-orange-500 p-1 rounded-full cursor-pointer"></i>
                    </div>
                    <div class="flex justify-center gap-2 mt-6">
                        <a href="" class="font-semibold hover:text-indigo-400">帮助中心</a>
                        <a href="/register" class="font-semibold hover:text-indigo-400">会员注册</a>
                        <a href="" class="font-semibold hover:text-indigo-400">找回密码</a>
                    </div>
                </div>
                <div class="hidden md:block">
                    <img class="h-full object-cover" src="/images/login.jpg" alt="">
                </div>
            </div>
        </div>
    </form>
</template>


<style scoped lang="scss"></style>

<script lang="ts">

</script>