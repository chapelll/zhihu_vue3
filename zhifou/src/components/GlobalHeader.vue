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
        <Dropdown :title="`hello！ ${user.name}`">
          <Dropdown-item>
            <a href="#" class="dropdown-item">新建文章</a>
          </Dropdown-item>
          <Dropdown-item>
            <a href="#" class="dropdown-item">编辑资料</a>
          </Dropdown-item>
          <Dropdown-item disabled>
            <a href="#" class="dropdown-item">退出登录</a>
          </Dropdown-item>
        </Dropdown>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

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
})
</script>

<style scoped></style>
