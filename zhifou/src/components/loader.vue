<template>
  <teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{ background: background }">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p v-if="text" class="text-primary small"> {{ text }} </p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup() {
    // 在loader挂载之前创建一个#back节点放到最外层
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)
    // loader组件卸载前删除本次创建的#back节点
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style scoped>
.loading-container {
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;


}

.loading-container {
  text-align: center;
}
</style>
