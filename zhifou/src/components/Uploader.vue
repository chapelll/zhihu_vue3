<template>
  <div class="file-upload">
    <div @click.prevent="triggerUpload" class="file-upload-container" v-bind="$attrs">
      <slot v-if="fileStatus == 'loading'" name="loading">
        <button class="btn btn-primary">正在上传</button>
      </slot>
      <slot :message="message" v-else-if="fileStatus == 'success'" name="uploaded">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input type="file" class="d-none file-input" ref="fileInput" @change="handleFileChange">
  </div>
  <button v-if="fileStatus == 'success'" class="btn btn-primary" @click="deleteImg">删除图片</button>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue'
import axios from 'axios'
type uploadStatus = 'ready' | 'loading' | 'success' | 'error'
type checkFunction = (file: File) => boolean
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<checkFunction>
      //这个类型是限制外部传入的beforeUpload方法的
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
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
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        //在这里进行上传前的判断 beforeUpload
        if (props.beforeUpload) {
          const res = props.beforeUpload(files[0])
          if (!res) {
            console.log('未通过用户的自定义校验');
            return
          }
        }

        fileStatus.value = 'loading'
        //获取文件并将其转化为formData类型
        const formData = new FormData()
        formData.append('file', files[0])
        try {
          const result = await axios.post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          console.log(result);
          fileStatus.value = 'success'
          message.value = result.data
          context.emit('file-uploaded', result.data)
        } catch (error) {
          console.log(error);
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', { error })
        } finally {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        }
      }
    }
    //删除图片
    const deleteImg = () => {
      message.value = ''
      fileStatus.value = 'ready'
    }

    const message = ref()

    return {
      message,
      fileInput,
      fileStatus,
      triggerUpload,
      handleFileChange,
      deleteImg
    }
  }
})
</script>

<style scoped></style>
