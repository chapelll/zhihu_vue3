import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import store from './store'
import Home from '../src/views/Home.vue'
import Login from '../src/views/Login.vue'
import Register from '../src/views/Register.vue'
import ColumnDetail from '../src/views/ColumnDetail.vue'
import CreatePost from '../src/views/CreatePost.vue'

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            redirectAlreadyLogin: true
        }
    }, {
        path: '/register',
        name: 'register',
        component: Register,
    }, {
        path: '/columnDetail/:columnId',
        name: 'columnDetail',
        component: ColumnDetail,
    }, {
        path: '/create',
        name: 'create',
        component: CreatePost,
        meta: {
            requiredLogin: true
        }
    }]
})

//路由前置守卫
router.beforeEach((to, from, next) => {
    const { user, token } = store.state
    const { requiredLogin, redirectAlreadyLogin } = to.meta
    
    if (user.isLogin) {
        console.log('登录了');
        if (redirectAlreadyLogin) {
            next('/')
        } else {
            next()
        }
    } else {
        if (token) {
            //如果未登录且有token 先去进行登录验证 (可以删除app中的登录，因为每次进入页面都会执行路由守卫)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            store.dispatch('fetchCurrentUser').then(() => {
                if (redirectAlreadyLogin) {
                    next('/')
                } else {
                    next()
                }
            }).catch((err) => {
                //登录验证失败代表token已失效，清空它
                console.error(err)
                localStorage.removeItem('token')
                store.commit('logout')
            })
        } else {
            if (requiredLogin) {
                next('login')
            } else {
                next()
            }
        }
    }

})

export default router
