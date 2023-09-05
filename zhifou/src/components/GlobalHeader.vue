<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a href="#" class="navbar-brand">知否专栏</a>
    <div v-if="!user?.isLogin">
      <div class="list-inline-item">
        <a href="#" class="btn btn-outline-light">登录</a>
      </div>
      <div class="list-inline-item">
        <a href="#" class="btn btn-outline-light">注册</a>
      </div>
    </div>
    <div v-else>
      <div class="list-inline-item">
        <a href="#" class="btn btn-outline-light">hello! {{ user.name }}</a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>
    }
  },
})
</script>

<style scoped></style>
