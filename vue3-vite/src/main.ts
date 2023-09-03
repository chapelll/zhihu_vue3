import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let app = createApp(App)
app.provide('currentUser', {
    name: 'wsc'
})
app.mount('#app')
