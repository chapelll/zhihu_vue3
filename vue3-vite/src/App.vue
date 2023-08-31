<template>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="add">+1</button>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, onMounted, onUpdated,onRenderTriggered, watch } from 'vue';
//ref变成响应式对象
interface reactiveType {
  count: number,
  double: number,
  add: () => void
}


export default {
  name: 'App',
  setup() {
    onMounted(() => {
      console.log('onMounted');
    })
    onUpdated(() => {
      console.log('onUpdated');
    })
    onRenderTriggered((event)=>{
      console.log(event);
    })
    const sum = ref(0)
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
