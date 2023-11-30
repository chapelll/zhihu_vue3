<template>
  <teleport to="#modal" v-if="show">
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
          </div>
          <div class="modal-body">
            <slot>
              <div>内容</div>
            </slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">关闭</button>
            <button type="button" class="btn btn-primary" @click="confirm">确定</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDomCreate from '../hooks/useDomCreate'
export default defineComponent({
  name: 'Modal',
  emits: ['confirm', 'close'],
  props: {
    title: {
      type: String,
      default: '标题'
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    useDomCreate('modal')
    const confirm = () => {
      context.emit('confirm')
    }
    const close = () => {
      context.emit('close')
    }

    return {
      confirm,
      close
    }
  }
})
</script>

<style scoped></style>
