<template>
  <div class="content">
    <div class="img-wrapper" v-if="post.image.url">
      <img :src="post.image.url" class="img">
    </div>
    <div class="title">
      {{ post.title }}
    </div>
    <div class="author">
      <div class="avatar">
        <img :src="post.author.avatar?.url || require('../assets/avatar.png')" class="avatar-img">
        <div class="nickName">
          {{ post.author.nickName }}
        </div>
      </div>
      <div class="time">
        发表于 {{ post.createdAt }}
      </div>
    </div>
    <div class="text" v-html="post.content">
    </div>

    <pre>{{ post }}</pre>
  </div>
</template>

<script lang="ts">

import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { generateFitUrl } from '../helper'
import postList from '../components/postList.vue'
export default defineComponent({
  name: 'posts',
  components: {
    // postList
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    onMounted(() => {
      console.log(route.params._id);
      if (route.params._id) {
        store.dispatch('getPosts', route.params._id)
      }
    })
    // 获取到文章详情
    let post = ref()
    post = computed(() => {
      console.log(store.state.post);
      return store.state.post
    })

    return {
      post
    }
  }
})
</script>

<style scoped>
.content .img-wrapper .img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content .title {
  font-size: 28px;
  font-weight: 700;
  margin: 24px 0;
}

.content .author {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content .avatar {
  display: flex;
  align-items: center;
  font-weight: 700;
}

.content .avatar .avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
}

.content .author .time {
  font-style: italic;
}

.content .text {
  margin-top: 24px;
}
</style>