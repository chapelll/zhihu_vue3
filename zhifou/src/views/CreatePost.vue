<template>
  <div class="create-post-page">
    <h4 class="ont-weight-bold mb-4">新建文章</h4>
    <validateForm>
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
import { defineComponent, ref } from 'vue'
import validateInput, { rulesProp } from '../components/validateInput.vue'
import validateForm from '../components/validateForm.vue'
export default defineComponent({
  name: 'create',
  components: {
    validateInput,
    validateForm
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
    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules
    }
  }
})
</script>

<style scoped></style>