<template>
    <div class="login-page">
        <div class="form">
            <validateForm @form-submit="onFormSubmit">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">请输入邮箱:</label>
                    <validateInput :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱"></validateInput>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">请输入密码:</label>
                    <validateInput :rules="passwordRules" v-model="passwordVal" placeholder="请输入密码"></validateInput>
                </div>
                <template #submit>
                    <button type="submit" class="btn btn-primary">Login</button>
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
export default defineComponent({
    name: 'home',
    components: {
        validateInput,
        validateForm
    },
    setup() {
        // 表单校验相关
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
        }]

        //表单双向绑定相关
        const emailVal = ref('')
        const passwordVal = ref('')

        const router = useRouter()
        const store = useStore()

        const onFormSubmit = (result: boolean) => {
            if (result) {
                const payload = {
                    email: emailVal.value,
                    password: passwordVal.value,
                }
                store.dispatch('loginAndFetch', payload).then((data) => {
                    console.log(data);
                    createMessage("登录成功！即将跳转首页", 'success', 2000)
                    setTimeout(() => {
                        router.push('/')
                    }, 2000)
                }).catch(err => {
                    console.log(err);
                })
            }
        }
        const inputRef = ref<any>()
        return {
            emailRules,
            passwordRules,
            emailVal,
            passwordVal,
            onFormSubmit,
            inputRef,
        }
    }
})
</script>
  
<style scoped></style>
  