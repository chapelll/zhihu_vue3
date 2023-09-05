<template>
  <div>
    <div class="dropdown">
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
import { defineComponent, ref } from 'vue'
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

    return {
      isOpen,
      toggleOpen
    }
  }
})
</script>

<style scoped></style>
