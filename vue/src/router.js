import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from './store.js'
import HomePage from './views/HomePage.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import AddTeam from './views/AddTeam.vue'
import TaskOrganizator from './views/TaskOrganizator.vue'


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
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { navbar: true }
    },
    {
        path: '/team/:id/task-organizator',
        name: 'TaskOrganizator',
        component: TaskOrganizator,
        meta: { navbar: true }
    },
    {
        path: '/add-team',
        name: 'AddTeam',
        component: AddTeam,
        meta: { navbar: true }
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const store = useMainStore()
    if (to.fullPath === '/login' && store.isLoggedIn === true) {
        next({ name: 'HomePage' })
    }
    else {
        next()
    }
})
