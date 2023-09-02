<template>
  <!-- <h1>{{ count }}</h1>
  <h1>{{ sum }}</h1> -->
  <!-- <div>{{ title }}</div>
  <button @click="add">+1</button>
  <button @click="addHello" style="display: block;">+Hello</button> -->
  <!-- {{ 'x轴:' + mouseXYRef.x + 'y轴:' + mouseXYRef.y }} -->
  <div>x轴: {{ mouseXYRef.x }}</div>
  <div>y轴: {{ mouseXYRef.y }}</div>

  <h1 v-if="loading">loading....</h1>
  <img v-if="loaded" :src="result ? result[0].url : undefined">

  <modal :modalShow="modalShow" @closeModal="modalShow = false">
    123
  </modal>
  <button @click="modalShow = true">打开modal</button>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, onMounted, onUpdated, onRenderTriggered, watch } from 'vue';
//ref变成响应式对象
// import useMousePosistion from './hooks/useMousePosistion'
import useURLLoader from './hooks/useURLLoader'
import modal from './components/modal.vue'

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

// interface DogResult {
//   message: string,
//   status: string
// }

interface CatResult {
  id: string,
  url: string,
  height: string,
  width: string,
}


export default {
  name: 'App',
  components: {
    modal
  },
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

    const { result, loading, loaded, error } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')

    watch(result, () => {
      if (result.value) {
        console.log(result.value[0].url);
      }
    })


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

    const modalShow = ref(false)

    const reactiveRefData = toRefs(reactiveData)
    const mouseXYRef = toRefs(mouseXY)

    return {
      sum,
      ...reactiveRefData,
      title,
      add,
      addHello,
      mouseXY,
      mouseXYRef,
      result, loading, loaded, error,
      modalShow
    }
  },


}
</script>

<style scoped></style>
