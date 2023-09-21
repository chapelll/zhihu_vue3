import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import Home from '../src/views/Home.vue'
import Login from '../src/views/Login.vue'
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
    if (to.meta.requiredLogin && !store.state.user.isLogin) {
        next({ name: 'login' })
    } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
        next({ name: 'home' })
    } else {
        next()
    }
})

export default router
