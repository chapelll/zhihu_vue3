<template>
  <teleport to="#main">
    <div class="center" v-if="modalShow">
      <slot>
        <div>this is modal</div>
      </slot>
      {{ lang }}
      <button @click="handleClose"> close </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  props: {
    modalShow: Boolean,
  },
  emits: {
    closeModal: null
  },
  setup(props, context,) {
    console.log(props);
    const handleClose = () => {
      context.emit('closeModal')
    }
    const lang = inject('lang')
    return {
      handleClose,
      lang
    }
  }
})
</script>

<style scoped>
.center {
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  color: black;
  font-weight: 700;
  border: 2px solid black;
}
</style>
