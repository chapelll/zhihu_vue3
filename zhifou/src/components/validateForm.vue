<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import mitt from 'mitt'
import { defineComponent, onUnmounted } from 'vue'
export const emitter = mitt<Events>() //使用mitt创建事件监听器，并把它导出

type ValidateFunc = () => boolean
type Events = { 'form-item-created': ValidateFunc } //定义mitt的事件类型

export default defineComponent({
  emits: ['form-submit'],
  setup(props, context) {
    const submitForm = () => {
      //map生成所有校验完成后的Boolean的数组，再使用every方法，遇到false就返回false，全部没有false返回true
      let result = funcArray.map((func) => { return func() }).every((item) => { return item })

      context.emit('form-submit', result)
    }
    let funcArray: ValidateFunc[] = []
    //使用事件监听器监听
    const callback = (func: ValidateFunc) => {
      funcArray.push(func)
    }
    emitter.on('form-item-created', callback)

    onUnmounted(() => {
      emitter.off('form-item-created')
      funcArray = []
    })
    return {
      submitForm
    }
  }
})
</script>

<style scoped></style>
