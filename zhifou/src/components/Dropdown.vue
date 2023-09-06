<template>
  <div>
    <div class="dropdown" ref="dropdown">
      <a class="btn btn-outline-light my-2 dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
        data-bs-toggle="dropdown" aria-expanded="false" @click.prevent="toggleOpen">
        {{ title }}
      </a>
      <ul class="dropdown-menu" style="display: block;" v-if="isOpen">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      require: true
    }
  },
  setup() {
    let isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const dropdown = ref<null | HTMLElement>(null)
    const handle = (e: MouseEvent) => {
      //判断点击到的html是否在dropdown里
      console.log(e.target);
      
      if (dropdown.value) {
        if (!dropdown.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handle)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handle)
    })
    return {
      isOpen,
      toggleOpen,
      dropdown,
      handle
    }
  }
})
</script>

<style scoped></style>
