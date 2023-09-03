import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import App2 from './App2.vue'

// let app = createApp(App)
let app = createApp(App2)
app.provide('currentUser', {
    name: 'wsc'
})
app.mount('#app')
