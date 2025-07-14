<template>
    <button v-if="!sidebarOpened" type="button" class="sm:hidden m-2 bg-blue-500 px-5 py-2 text-white rounded-4xl"
        @click="toggleSidebar()">
        <span>Otevrit sidebar</span>
    </button>

    <aside :class="[
        'fixed top-0 left-0 w-64 h-full transition-transform bg-gray-50 z-50',
        sidebarOpened ? 'translate-x-0' : '-translate-x-full',
        'sm:translate-x-0' // Always open on sm and up
    ]">
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
                    <router-link :to="{ path: '/team/1/task-organizator' }"
                        class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                        <span class="ms-3">Organizace úkolů</span>
                    </router-link>
                </li>
                <li v-if="sidebarOpened">
                    <button @click="toggleSidebar" class="bg-blue-500 px-5 py-2 text-white rounded-4xl">Zavřít
                        sidebar</button>
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
import { ref } from 'vue';
import { useMainStore } from '../store';

const sidebarOpened = ref(false); // Controls visibility on mobile

const toggleSidebar = () => {
    sidebarOpened.value = !sidebarOpened.value;
};

const mainStore = useMainStore();

function logout() {
    mainStore.api.post('/api/logout/', {}).then(() => {
        window.location.href = '/login';
    });
}
</script>

<style lang="" scoped>


</style>