<template>
  <div class="content">
    <div class="column-detail-page w-75 mx-auto">
      <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
        <div class="col-3 text-center">
          <img :src="column.avatar?.url" class="rounded-circle border w-100">
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

import { defineComponent, computed, onMounted } from 'vue'
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
    console.log(route.params);

    const currentId = route.params.columnId

    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })

    const column = computed(() => {
      return store.getters.getColumnById(currentId)
    })
    const list = computed(() => {
      return store.getters.getPostsByCid(currentId)
    })
    console.log('list', list.value);

    return {
      route,
      column,
      list,
    }
  }
})
</script>