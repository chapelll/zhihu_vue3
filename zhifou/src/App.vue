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
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from './components/GlobalHeader.vue'
import loader from './components/loader.vue'
import createMessage from './components/createMessage'
import axios from 'axios'
import { GlobalDataProps } from './store'


export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const isLoading = computed(() => {
      return store.state.loading
    })
    const currentUser = computed(() => {
      return store.state.user
    })
    const token = computed(() => {
      return store.state.token
    })
    const error = computed(() => {
      return store.state.error
    })
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    //出现错误时使用函数式组件createMessage
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        console.log(status, message);
        createMessage(message, 'error')
      }
    })
    return {
      isLoading,
      currentUser,
      error
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
