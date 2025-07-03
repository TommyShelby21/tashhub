<template>
    <button type="button" class="hidden">
        <span>Open sidebar</span>
    </button>

    <aside class="fixed top-0 left-0 w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
            <ul class="">
                <li>
                    <router-link :to="{ path: '/' }"
                        class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                        <span class="ms-3">Nástěnka</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/profile' }"
                        class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                        <span class="ms-3">Můj účet</span>
                    </router-link>
                </li>
                <li>
                    <a @click="logout()" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                        <span class="flex-1 ms-3 whitespace-nowrap">Odhlásit se</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>
<script setup>
import { useMainStore } from '../store'

const mainStore = useMainStore()
function logout() {
    mainStore.api.post('/api/logout/', {}).then(response => {
        window.location.href = '/login'

    }).catch(error => {
        console.error('Logout failed:', error)
    })
}

</script>
<style lang="">

</style>