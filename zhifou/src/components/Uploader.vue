<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">
      <span v-if="fileStatus == 'loading'">正在上传...</span>
      <span v-else>点击上传</span>
    </button>
    <input type="file" class="d-none file-input" ref="fileInput" @change="handleFileChange">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
type uploadStatus = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup(props) {
    //获取input的dom节点(input类型)
    const fileInput = ref<null | HTMLInputElement>(null)
    //上传状态
    const fileStatus = ref<uploadStatus>('ready')
    const triggerUpload = () => {
      console.log(fileInput.value);
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    // 上传input发送改变时
    const handleFileChange = async (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.value) {
        fileStatus.value = 'loading'
        //获取文件并将其转化为formData类型
        const files = Array.from(currentTarget.value)
        const formData = new FormData()
        formData.append('file', files[0])
        console.log(formData);

        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp => {
          console.log(resp);
          fileStatus.value = 'success'
        }).catch(resp => {
          console.log(resp);
          fileStatus.value = 'error'
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }

    return {
      fileInput,
      fileStatus,
      triggerUpload,
      handleFileChange
    }
  }
})
</script>

<style scoped></style>
