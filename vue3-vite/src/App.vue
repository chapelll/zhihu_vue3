<template>
  <!-- <h1>{{ count }}</h1>
  <h1>{{ sum }}</h1> -->
  <div>{{ title }}</div>
  <button @click="add">+1</button>
  <button @click="addHello" style="display: block;">+Hello</button>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, onMounted, onUpdated, onRenderTriggered, watch } from 'vue';
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
    onRenderTriggered((event) => {
      console.log(event);
    })

    const sum = ref(0)
    const title = ref('')
    const reactiveData: reactiveType = reactive({
      count: 0,
      add: () => {
        reactiveData.count++
        sum.value++
        return
      },
      double: computed(() => {
        return reactiveData.count * 2
      })
    })

    const addHello = () => {
      title.value = title.value + 'Hello'
    }
    const add = () => {
      reactiveData.count++
      sum.value++
    }

    watch([title, () => reactiveData.count], (newVal, oldVal) => {
      console.log(newVal);
      console.log(oldVal);
      document.title = 'updated' + reactiveData.count + title.value
    })



    const reactiveRefData = toRefs(reactiveData)
    return {
      sum,
      ...reactiveRefData,
      title,
      add,
      addHello
    }
  },


}
</script>

<style scoped></style>
