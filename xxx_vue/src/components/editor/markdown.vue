<script setup lang="ts">
import { nextTick } from 'vue';
import toastEditor from './toastEditor';

interface IProps {
  modelValue: string
  height?: number
  placeholder?: string
}
const props = withDefaults(defineProps<IProps>(),
  {
    modelValue: '',
    height: 500,
    placeholder: '请输入内容'
  }
)
const emit = defineEmits(['update:modelValue']) // 'update:modelValue'会被识别，自动更新父组件的v-model的值



onMounted(() => {
  nextTick(() => {
    const toastui = new toastEditor('#editor', `${props.modelValue}`, `${props.height}px`);
    toastui.editor.on('change', (type: string) => {
      // const content = type === 'markdown' ? toastui.editor.getMarkdown() : toastui.editor.getHTML();
      // emit('update:modelValue', content)
      //简写 ↓
      emit('update:modelValue', toastui.editor[type === 'markdown' ? 'getMarkdown' : 'getHTML']())
    })

  })
})
</script>


<template>
  <div id="editor"></div>
</template>


<style lang="scss" scoped>
#editor {
  @apply bg-white;

}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
  margin: 0;
}
</style>