import { createApp } from 'vue'
import axios from 'axios';
import router from './router';
import store from './store';
import App from './App.vue'

axios.defaults.baseURL = "http://apis.imooc.com/api/" //设置默认url
//使用axios拦截器(request)
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.params = { ...config.params, icode: 'ED04A2A4725CFD8C' }
    store.commit('setLoading', true)
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
}, function (error) {
    // 对错误响应做些什么
    return Promise.reject(error);
});

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
