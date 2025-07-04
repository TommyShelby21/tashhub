import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import { router } from './router.js'
import { useMainStore } from './store'

const app = createApp(App)
app.use(createPinia())
app.use(router)
const mainStore = useMainStore()
mainStore.setupInterceptors()
app.mount('#app')
