<template>
  <div class="container">
    <loader v-if="isLoading" text="努力加载中" background="rgba(0,0,0,0.3)"></loader>
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <router-view></router-view>
    <footer class="footer text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">知否专栏</li>
          <li class="list-inline-item">组件</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import loader from './components/loader.vue'

const userData: UserProps = {
  isLogin: false,
  name: 'zcz',
  id: 1
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    loader
  },
  setup() {
    const store = useStore()
    const isLoading = computed(() => {
      return store.state.loading
    })
    return {
      currentUser: userData,
      isLoading,
    }
  },
})
</script>

<style>
.container {
  position: relative;
}

.footer {
  margin: 24px 0;
}
</style>
