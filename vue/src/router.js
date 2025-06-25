import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

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
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { navbar: false }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
