<template>
  <teleport to="#message" >
    <div v-if="isVisible" :class="classObject" class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2">
      <span>{{ message }}</span>
      <button type="button" class="close" aria-label="close" @click.prevent="hide">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'
export type MessageType = 'success' | 'error' | 'warning' | 'default'
export default defineComponent({
  emits: ['close-message'],
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  setup(props, context) {

    useDomCreate('message')

    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type == 'success',
      'alert-danger': props.type == 'error',
      'alert-warning': props.type == 'warning',
      'alert-primary': props.type == 'default',
    }
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      isVisible,
      classObject,
      hide
    }
  }
})
</script>

<style scoped></style>
