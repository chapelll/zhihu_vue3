import { createRouter, createWebHistory } from 'vue-router'
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
    }, {
        path: '/columnDetail/:id',
        name: 'columnDetail',
        component: ColumnDetail,
    }, {
        path: '/create',
        name: 'create',
        component: CreatePost,
    }]
})

export default router
