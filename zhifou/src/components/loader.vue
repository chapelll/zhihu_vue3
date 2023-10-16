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
import useDomCreate from '@/hooks/useDomCreate'
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
    useDomCreate('back')
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
