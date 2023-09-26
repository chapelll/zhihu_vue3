<template>
  <div class="row">
    <div v-for="column of colunmList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar?.url" :alt="column.title" class="rounded-circle Border border-light my-3">
          <h5>{{ column.title }}</h5>
          <p>{{ column.description }}</p>
          <router-link :to="`/columnDetail/${column._id}`">
            <div class="btn btn-outline-primary">进入专栏</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../store'

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
          colunm.avatar = {
            url: require('@/assets/avatar.png')
          }
        } else {
          colunm.avatar.url = colunm.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
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

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
