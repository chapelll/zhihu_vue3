<template>
  <!-- <h1>{{ count }}</h1>
  <h1>{{ sum }}</h1> -->
  <!-- <div>{{ title }}</div>
  <button @click="add">+1</button>
  <button @click="addHello" style="display: block;">+Hello</button> -->
  <!-- {{ 'x轴:' + mouseXYRef.x + 'y轴:' + mouseXYRef.y }} -->
  <div>x轴: {{ mouseXYRef.x }}</div>
  <div>y轴: {{ mouseXYRef.y }}</div>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, onMounted, onUpdated, onRenderTriggered, watch } from 'vue';
//ref变成响应式对象
// import useMousePosistion from './hooks/useMousePosistion'

interface reactiveType {
  count: number,
  double: number,
  add: () => void
}

interface mouseXYtype {
  x: number,
  y: number,
  mouseUpdate: (e: any) => void
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

    watch([title, () => reactiveData.count], () => {
      document.title = 'updated' + reactiveData.count + title.value
    })
    // const { x, y } = useMousePosistion()

    const mouseXY: mouseXYtype = reactive({
      x: 0,
      y: 0,
      mouseUpdate: (e) => {
        mouseXY.x = e.pageX
        mouseXY.y = e.pageY
      }
    })
    document.addEventListener("click", (e) => {
      mouseXY.mouseUpdate(e)
    })

    const reactiveRefData = toRefs(reactiveData)
    const mouseXYRef = toRefs(mouseXY)

    return {
      sum,
      ...reactiveRefData,
      title,
      add,
      addHello,
      mouseXY,
      mouseXYRef
    }
  },


}
</script>

<style scoped></style>
