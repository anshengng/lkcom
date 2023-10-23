<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor } from '@wangeditor/editor'
import { ImageUpload } from '@/apis/upload';


const props = withDefaults(defineProps<{ modelValue: string, url?: string }>(), {
    modelValue: '',
    url: '/api/image'
})
const emit = defineEmits(['update:modelValue'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

//输入区域 内容 HTML
const valueHtml = ref(props.modelValue)

// 设置父子组件的内容绑定
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = props.modelValue
    }, 0) //或者可以使用nextTick
})

const toolbarConfig = {}

const editorConfig: { placeholder: string, MENU_CONF: Record<string, any> } = { placeholder: '请输入内容...', MENU_CONF: {} }

// 自定义上传图片
type InsertFnType = (url: string, alt: string, href: string) => void;

editorConfig.MENU_CONF['uploadImage'] = {
    async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
        // res 即服务端的返回结果
        // console.log(res);
        const data = new FormData()
        data.append('file', file)
        const res = await ImageUpload(data)
        // 从 res 中找到 url alt href ，然后插入图片
        insertFn(res.data.url, '图片', res.data.url)
    },
}

//输入时与父组件数据同步
const changeContent = (editor: IDomEditor) => {
    const content = editor.getHtml(); //valueHtml
    emit('update:modelValue', content)
}
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>


<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" mode="default"
            @onCreated="handleCreated" @onChange="changeContent" />
    </div>
</template>


<style lang="scss" scoped>
.w-e-full-screen-container {
    z-index: 9999;
}
</style>