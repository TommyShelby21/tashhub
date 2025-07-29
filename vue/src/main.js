import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './style.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { router } from './router.js'
import { useMainStore } from './store'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.use(router)
const mainStore = useMainStore()
mainStore.setRouter(router)
mainStore.setupInterceptors()
app.mount('#app')
