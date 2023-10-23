<!-- yup vee-Validate的使用 -->
<script setup lang="ts">
import v from '@/plugins/validate'

const { handleSubmit, errors } = v.useForm({
    initialValues: {
        username: 'jizhu',
        password: '',
    },
    validationSchema: {
        username: v.yup.string().required('用户名不能为空').email('邮箱格式错误'),
        password: v.yup.string().required('密码不能为空'),
    }
})

const { value: username } = v.useField<string>('username',{ label: '用户名' })
const { value: password } = v.useField<string>('password',{ label: '密码' })

const onSubmit = handleSubmit((values) => {
    alert('success!!')
    console.log(values);
})
</script>


<template>
    <form @submit="onSubmit">
        <div class="w-[720px]">
            <lkInput placeholder="请输入手机号或邮箱" type="text" v-model="username" />
            <p class="pt-3 text-red-500">{{ errors.username }}</p>
            <lkInput class="mt-5" placeholder="请输入密码" type="password" v-model="password" />
            <p class="pt-3 text-red-500">{{ errors.password }}</p>
            <lkButton />
        </div>
    </form>
</template>


<style scoped lang="scss"></style>