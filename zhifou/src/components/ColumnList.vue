<template>
  <div class="row">
    <div v-for="column of colunmList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle Border border-light w-25 my-3">
          <h5>{{ column.title }}</h5>
          <p>{{ column.description }}</p>
          <router-link :to="`/columnDetail/${column.columnId}`">
            <div class="btn btn-outline-primary">进入专栏</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../testData'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>
    }
  },
  setup(props) {
    const colunmList = computed(() => {
      return props.list?.map(colunm => {
        if (!colunm.avatar) {
          colunm.avatar = require('@/assets/avatar.png')
        }
        return colunm
      })
    })

    return {
      colunmList
    }
  }
})
</script>

<style scoped></style>
