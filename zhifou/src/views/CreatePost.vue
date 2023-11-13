<template>
  <div class="create-post-page">
    <h4 class="ont-weight-bold mb-4">新建文章</h4>
    <uploader action="/upload" :beforeUpload="uploadCheck"
      class="d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-4">
      <div>
        <!-- 初始状态 -->
        <h2>点击上传头图</h2>
      </div>
      <template #loading>
        <div class="d-flex justify-content-center align-items-center">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only mr"></span>
          </div>
          <h2 style="margin-left: 24px;">正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.message.data.url">
      </template>
    </uploader>
    <validateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题:</label>
        <validateInput :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="input">
        </validateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情:</label>
        <validateInput :rules="contentRules" v-model="contentVal" placeholder="请输入文章详情" type="textarea">
        </validateInput>
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import validateInput, { rulesProp } from '../components/validateInput.vue'
import validateForm from '../components/validateForm.vue'
import uploader from '../components/Uploader.vue'
import createMessage from '../components/createMessage'
import { beforeUploadCheck } from '../helper'

export default defineComponent({
  name: 'create',
  components: {
    validateInput,
    validateForm,
    uploader,
  },
  setup() {
    const titleVal = ref('')
    const contentVal = ref('')
    const titleRules: rulesProp = [{
      type: 'required',
      message: '请输入标题',
    }]
    const contentRules: rulesProp = [{
      type: 'required',
      message: '请输入内容',
    }]

    const store = useStore()
    const router = useRouter()

    //图片上传前的检测方法
    const uploadCheck = (file: File) => {
      const { passed, error } = beforeUploadCheck(file, {
        format: ['image/png', 'image/jpg'],
        size: 1
      })
      if (error == 'format') {
        createMessage("只能上传png和jpg类型的图片", 'error')
      }
      if (error == 'size') {
        createMessage("只能上传不超过1M的图片", 'error')
      }
      return passed
    }

    const onFormSubmit = (result: boolean) => {
      if (result) {
        console.log('通过验证');
        const { columnId } = store.state.user
        let data = {
          columnId,
          post: {
            _id: new Date().getTime(),
            createdAt: new Date().toLocaleString(),
            title: titleVal.value,
            excerpt: contentVal.value,
          }
        }
        store.commit('createPost', data)
        router.push({
          name: 'columnDetail',
          params: { columnId: columnId }
        })

      }
    }
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      uploadCheck,
      onFormSubmit,
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
