<template>
  <div class="content" v-if="post">
    <div class="img-wrapper" v-if="post.image">
      <img :src="post.image.url" class="img">
    </div>
    <div class="title">
      {{ post.title }}
    </div>
    <div class="author" v-if="post.author">
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
    <div class="text" v-html="currentHtml">
    </div>

    <div v-if="showEditArea" class="btn-group mt-5">
      <router-link type="button" class="btn btn-success"
        :to="{ name: 'create', query: { id: post._id } }">编辑</router-link>
      <button type="button" class="btn btn-danger" @click="modalShow = true">删除</button>
    </div>
    <Modal title="删除文章" :show="modalShow" @confirm="confirm" @close="modalShow = false">
      <div>确定要删除这篇文章吗?</div>
    </Modal>
  </div>
</template>

<script lang="ts">

import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { marked } from 'marked'
import { generateFitUrl } from '../helper'
import postList from '../components/postList.vue'
import Modal from '../components/Modal.vue'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'posts',
  components: {
    // postList
    Modal
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    onMounted(() => {
      console.log(route.params._id);
      if (route.params._id) {
        store.dispatch('getPosts', route.params._id)
      }
    })

    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (isLogin && post.value.author && post.value.author._id) {
        return _id === post.value.author._id
      } else {
        return false
      }
    })

    // 获取到文章详情
    const post = computed(() => {
      console.log(store.state.post);
      return store.state.post
    })

    const currentHtml = computed(() => {
      if (post.value && post.value.content) {
        return marked(post.value.content, { breaks: true })
      }
    })

    const modalShow = ref(false)

    const confirm = async () => {
      modalShow.value = false
      const res = await store.dispatch('deletePost', {
        id: post.value._id
      })
      if (res.code === 0) {
        createMessage('删除成功，即将返回专栏列表', 'success', 2000)
        setTimeout(() => {
          console.log(res.data);
          router.push({
            path: `/columnDetail/${res.data.column}`
          })
        }, 2000)
      }
    }

    return {
      showEditArea,
      post,
      currentHtml,
      modalShow,
      confirm
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