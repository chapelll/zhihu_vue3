<template>
    <div class="login-page">
        <div class="form">
            <validateForm @form-submit="onFormSubmit">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">请输入昵称:</label>
                    <validateInput :rules="nameRules" v-model="nickNameVal" placeholder="请输入昵称"></validateInput>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">请输入邮箱:</label>
                    <validateInput :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱"></validateInput>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">请输入密码:</label>
                    <validateInput :rules="passwordRules" v-model="passwordVal" placeholder="请输入密码"></validateInput>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">请重复密码:</label>
                    <validateInput :rules="repeatPasswordRules" v-model="repeatPasswordVal" placeholder="请重复密码">
                    </validateInput>
                </div>
                <template #submit>
                    <button type="submit" class="btn btn-primary">注册新用户</button>
                </template>
            </validateForm>
        </div>
    </div>
</template>
  
<script lang="ts">
import validateInput, { rulesProp } from '../components/validateInput.vue'
import validateForm from '../components/validateForm.vue'
import createMessage from '../components/createMessage'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default defineComponent({
    name: 'home',
    components: {
        validateInput,
        validateForm
    },
    setup() {
        // 表单校验相关
        const nameRules: rulesProp = [
            {
                type: 'required',
                message: '请输入昵称',
            }]
        const emailRules: rulesProp = [{
            type: 'required',
            message: '请输入邮箱',
        }, {
            type: 'email',
            message: '邮箱格式不正确',
        }]
        const passwordRules: rulesProp = [{
            type: 'required',
            message: '请输入密码',
        }, {
            type: 'custom',
            validator: () => {
                return passwordVal.value.length > 5
            },
            message: '密码位数不小于6位',
        }]
        const repeatPasswordRules: rulesProp = [{
            type: 'required',
            message: '请重复密码',
        },
        {
            type: 'custom',
            validator: () => {
                return passwordVal.value === repeatPasswordVal.value
            },
            message: '输入的密码不一致',
        }]

        //表单双向绑定相关
        const nickNameVal = ref('')
        const emailVal = ref('')
        const passwordVal = ref('')
        const repeatPasswordVal = ref('')

        const router = useRouter()
        const store = useStore()

        const onFormSubmit = async (result: boolean) => {
            if (result) {
                const payload = {
                    email: emailVal.value,
                    password: passwordVal.value,
                    nickName: nickNameVal.value,
                }

                const result = await axios.post('users', payload)
                if (result && result.data.code === 0) {
                    createMessage("注册成功！即将跳转登录页", "success", 2000)
                    setTimeout(() => {
                        router.push('/login')
                    }, 2000)
                } else {
                    createMessage("注册失败！", "error", 2000)
                }
            }
        }
        const inputRef = ref<any>()
        return {
            nameRules,
            emailRules,
            passwordRules,
            repeatPasswordRules,
            nickNameVal,
            emailVal,
            passwordVal,
            repeatPasswordVal,
            onFormSubmit,
            inputRef,
        }
    }
})
</script>
  
<style scoped></style>
  