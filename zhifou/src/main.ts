import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import App from './App.vue'
import Home from '../src/views/Home.vue'
import Login from '../src/views/Login.vue'
import ColumnDetail from '../src/views/ColumnDetail.vue'

const store = createStore({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            state.count++
        }
    }
})

console.log(store.state.count);
store.commit('add')
console.log(store.state.count);

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
    }]
})
const app = createApp(App)
app.use(router)
app.mount('#app')
