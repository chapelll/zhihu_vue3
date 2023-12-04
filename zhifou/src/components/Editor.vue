<template>
  <div class="vue-easymde-editor">
    <textarea ref="textArea"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted, onUnmounted, defineExpose } from 'vue';
import EasyMDE, { Options } from 'easymde';
// 传入属性
interface EditorProps {
  modelValue?: string;
  options?: Options;
}
// 输出事件
interface EditorEvents {
  (type: 'update:modelValue', value: string): void;
  (type: 'change', value: string): void;
  (type: 'blur'): void;
}
const props = defineProps<EditorProps>()
const emit = defineEmits<EditorEvents>()

// 初始数据
const textArea = ref<null | HTMLTextAreaElement>(null)
let easyMdeInstance: EasyMDE | null = null
const innerValue = ref(props.modelValue || "")

// 初始化实例
// 暴露方法 实现验证功能
onMounted(() => {
  if (textArea.value) {
    // 组装options
    const config: Options = {
      ...(props.options || {}),
      element: textArea.value,
      initialValue: innerValue.value
    }
    easyMdeInstance = new EasyMDE(config)
    // 监控对应事件
    easyMdeInstance.codemirror.on('change', () => {
      if (easyMdeInstance) {
        const updateValue = easyMdeInstance.value()
        innerValue.value = updateValue
        emit('update:modelValue', updateValue)
        emit('change', updateValue)
      }
    })
    easyMdeInstance.codemirror.on('blur', () => {
      if (easyMdeInstance) {
        emit('blur')
      }
    })
  }
})

// 销毁实例
onUnmounted(() => {
  if (easyMdeInstance) {
    easyMdeInstance.cleanup()
  }
  easyMdeInstance = null
})

// 清空方法
const clear = () => {
  if (easyMdeInstance) {
    easyMdeInstance.value("")
  }
}
// 获取实例
const getMdeInstance = () => {
  if (easyMdeInstance) {
    return easyMdeInstance
  }
}

defineExpose({
  clear, getMdeInstance
})
</script>

<style scoped></style>
