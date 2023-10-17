import { createApp } from 'vue'
import axios from 'axios';
import router from './router';
import store from './store';
import App from './App.vue'

const icode = 'ED04A2A4725CFD8C'

axios.defaults.baseURL = "http://apis.imooc.com/api/" //设置默认url
//使用axios拦截器(request)
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.params = { ...config.params, icode: icode }
    // 如果是上传文件，添加到 FormData 中
    if (config.data instanceof FormData) {
        config.data.append('icode', icode)
    } else {
        // 普通的 body 对象，添加到 data 中
        config.data = { ...config.data, icode: icode }
    }
    store.commit('setLoading', true)
    store.commit('setError', { status: false, message: "" })
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
//使用axios拦截器(response)
axios.interceptors.response.use(function (config) {
    // 在获取响应之前做些什么
    store.commit('setLoading', false)
    return config;
}, function (err) {
    // 对错误响应做些什么 
    const { error } = err.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error);
});

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
