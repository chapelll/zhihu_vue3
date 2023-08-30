<template>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="add">+1</button>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs } from 'vue';
//ref变成响应式对象
interface reactiveType {
  count: number,
  double: number,
  add: () => void
}


export default {
  name: 'App',
  setup() {
    const sum = ref(0)
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const add = () => {
    //   count.value++
    // }
    const reactiveData: reactiveType = reactive({
      count: 0,
      add: () => {
        return reactiveData.count++
      },
      double: computed(() => {
        return reactiveData.count * 2
      })
    })
    const reactiveRefData = toRefs(reactiveData)
    return {
      sum,
      ...reactiveRefData
    }
  }
}
</script>

<style scoped></style>
