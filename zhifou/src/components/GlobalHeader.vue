<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">知否专栏</router-link>
    <div v-if="!user?.isLogin">
      <div class="list-inline-item">
        <a @click="toPage('login')" class="btn btn-outline-light">登录</a>
      </div>
      <div class="list-inline-item">
        <a @click="toPage('register')" class="btn btn-outline-light">注册</a>
      </div>
    </div>
    <div v-else>
      <div class="list-inline-item">
        <Dropdown :title="`hello！ ${user.nickName}`">
          <Dropdown-item>
            <router-link :to="{ name: 'create' }" class="dropdown-item">新建文章</router-link>
          </Dropdown-item>
          <Dropdown-item>
            <a href="#" class="dropdown-item">编辑资料</a>
          </Dropdown-item>
          <Dropdown-item>
            <router-link :to="`/columnDetail/${user.column}`" class="dropdown-item">我的专栏</router-link>
          </Dropdown-item>
          <Dropdown-item>
            <a href="#" class="dropdown-item" @click="logout">退出登录</a>
          </Dropdown-item>
        </Dropdown>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { UserProps } from '../store'
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';


export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const logout = () => {
      store.commit('logout')
      router.push('/')
    }
    const toPage = (url: string) => {
      router.push(`/${url}`)
    }
    return {
      logout,
      toPage
    }
  }
})
</script>

<style scoped></style>
