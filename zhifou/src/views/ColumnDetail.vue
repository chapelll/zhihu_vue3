<template>
  <div class="content">
    <div class="column-detail-page w-75 mx-auto">
      <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
        <div class="col-3 text-center">
          <img :src="column.avatar" class="rounded-circle border w-100">
        </div>
        <div class="col-9">
          <h4>{{ column.title }}</h4>
          <p class="text-muted">{{ column.description }}</p>
        </div>
      </div>
      <postList :list="list"></postList>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import postList from '../components/postList.vue'
export default defineComponent({
  name: 'ColumnDetail',
  components: {
    postList
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const currentId = route.params.id
    const column = computed(() => {
      return store.state.columns.filter((item: any) => item.id == currentId)[0]
    })
    const list = computed(() => {
      return store.state.posts.filter((item: any) => item.columnId == currentId)[0].list
    })
    return {
      route,
      column,
      list,
    }
  }
})
</script>