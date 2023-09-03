<template>
  <div>
    <h1>{{ props.user.name }}</h1>
    <h1>{{ props.user.age }}</h1>
    <button @click="handle">触发</button>
  </div>
</template>

<script setup lang="ts">
// import { defineProps } from 'vue'
interface IUser {
  name: string;
  age: number
}
interface IEvent {
  (e: 'change', age: number): void
  //事件类型是change，传递参数是number
}

const props = defineProps<{ user: IUser }>()
const emits = defineEmits<IEvent>()
const handle = () => {
  emits('change', props.user.age)
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
