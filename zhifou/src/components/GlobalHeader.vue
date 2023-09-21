<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">知否专栏</router-link>
    <div v-if="!user?.isLogin">
      <div class="list-inline-item">
        <router-link to="login" class="btn btn-outline-light">登录</router-link>
      </div>
      <div class="list-inline-item">
        <router-link to="login" class="btn btn-outline-light">注册</router-link>
      </div>
    </div>
    <div v-else>
      <div class="list-inline-item">
        <Dropdown :title="`hello！ ${user.name}`">
          <Dropdown-item>
            <router-link :to="{ name: 'create' }" class="dropdown-item">新建文章</router-link>
          </Dropdown-item>
          <Dropdown-item>
            <a href="#" class="dropdown-item">编辑资料</a>
          </Dropdown-item>
          <Dropdown-item>
            <a href="#" class="dropdown-item">退出登录</a>
          </Dropdown-item>
        </Dropdown>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useStore } from 'vuex'
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';

export interface UserProps {
  isLogin?: boolean;
  name?: string;
  id: number;
}

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  setup() {
    const store = useStore()
    const currentUser = computed(() => {
      return store.state.user
    })
    return {
      user: currentUser
    }
  }
})
</script>

<style scoped></style>
