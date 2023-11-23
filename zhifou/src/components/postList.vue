<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4><a style="cursor: pointer;" @click="toPosts(post)">{{ post.title }}</a></h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image?.url" class="col-4">
            <img :src="post.image?.url" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
// import { PostProps, ImageProps } from '../store'
// import { generateFitUrl } from '../helper'
export default defineComponent({
  props: {
    list: {
      required: true,
      type: Array,
    }
  },
  setup(props) {
    const router = useRouter()

    const posts = computed(() => {
      return props.list
    })

    const toPosts = (posts: any) => {
      router.push({
        name: `postDetail`,
        params: {
          '_id': posts._id
        }
      })
    }

    return {
      posts,
      toPosts,
    }
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}

.post-list h4 a:hover {
  color: #0d6efd;
}
</style>
