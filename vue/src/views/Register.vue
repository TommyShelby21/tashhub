<template>
    <div class="flex flex-col items-center justify-center min-h-screen px-4">
        <div class="bg-gray-200 p-7 py-12 rounded-lg shadow-lg w-full max-w-2xl">
            <div class="flex flex-col">
                <label for="email">Email:</label>
                <input type="text" id="email" class="border border-gray-300 p-2 rounded mt-1"
                    placeholder="Zadejte svůj email" v-model="email" />
            </div>
            <div class="flex flex-col mt-4">
                <label for="username">Uživatelské jméno:</label>
                <input type="username" id="username" class="border border-gray-300 p-2 rounded mt-1"
                    placeholder="Zadejte své uživatelské jméno" v-model="username" />
            </div>
            <div class="flex flex-col mt-4">
                <label for="password">Heslo:</label>
                <input type="password" id="password" class="border border-gray-300 p-2 rounded mt-1"
                    placeholder="Zadejte své heslo" v-model="password" />
            </div>
            <div>
                <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-4 w-full"
                    @click="registerUser()">
                    Zaregistrovat se
                </button>
            </div>
        </div>

        <div class="mt-4 w-full max-w-2xl flex flex-col sm:flex-row items-center justify-start text-sm sm:text-base">
            <span>Již máš účet?</span>
            <router-link :to="{ name: 'Login' }"
                class="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-2 sm:mt-0 sm:ml-3 hover:bg-blue-600">
                Přihlásit se
            </router-link>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useMainStore } from '../store'

const mainStore = useMainStore()

const email = ref('');
const username = ref('');
const password = ref('');

function registerUser() {
    mainStore.api.post('/api/register/', {
        email: email.value,
        username: username.value,
        password: password.value,
    })
}

</script>
<style lang="">

</style>