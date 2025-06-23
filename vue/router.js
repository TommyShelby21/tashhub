import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './src/views/HomePage.vue'
import Login from './src/views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta: { navbar: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { navbar: false }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
