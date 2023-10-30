<template>
  <div class="validate-input-container pb-3">
    <input v-if="type == 'input'" class="form-control" :class="{ 'is-invalid': inputRef.error }" :value="inputRef.val"
      @blur="validateInput" @change="validateInput" @input="updateValue" v-bind="$attrs">
    <textarea v-else class="form-control" :class="{ 'is-invalid': inputRef.error }" :value="inputRef.val"
      @blur="validateInput" @change="validateInput" @input="updateValue" v-bind="$attrs" rows="10"></textarea>
    <span class="invalid-feedback" v-if="inputRef.error">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted, nextTick, customRef } from 'vue'
import { emitter } from './validateForm.vue'

const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
const phoneReg = /^1[2|3|4|5|6|7|8|9|]\d{9}$/;
interface ruleProp {
  type: 'required' | 'phone' | 'email' | 'custom',
  validator?: () => boolean
  message: string
}
export type rulesProp = ruleProp[]
export type tagType = 'input' | 'textarea'
export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<rulesProp>
    },
    modelValue: {
      type: String
    },
    type: {
      type: String as PropType<tagType>,
      default: 'input'
    },
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: '',
    })
    const validateInput = () => {
      //val要经过所有rule的校验
      if (props.rules) {
        const allPass = props.rules?.every(rule => {
          let pass = true
          inputRef.message = rule.message
          //因为是switch，是单独每次计算break的
          switch (rule.type) {
            case 'required':
              pass = (inputRef.val.trim() !== "")
              break;
            case 'email':
              pass = emailReg.test(inputRef.val)
              break;
            case 'phone':
              pass = phoneReg.test(inputRef.val)
              break;
            case 'custom':
              pass = rule.validator ? rule.validator() : true
              break;
            default:
              break;
          }
          return pass
        })
        inputRef.error = !allPass
        return allPass
      }
      return true
    }

    const updateValue = (e: Event) => {
      nextTick(() => {
        validateInput()
      })
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    return {
      inputRef,
      validateInput,
      updateValue
    }
  },
})
</script>

<style scoped></style>
