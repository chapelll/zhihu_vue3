<template>
  {{ hello }}
  {{ count }}
  <button @click="add">+1</button>
  <message @change="chufa" :user="user"></message>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import message from './components/message.vue';

const hello = 'hello world'
const count = ref(0)
const add = () => {
  count.value++
}
const user = {
  name: 'zcz',
  age: 26
}
const chufa = (text: number) => {
  alert(text);
}
</script>

<style scoped></style>
