<template>
    <div class="relative min-h-screen bg-white">
        <!-- Demo button in top-right corner -->
        <div class="absolute top-6 right-6">
            <button type="button" class="bg-purple-500 text-white px-4 py-2 rounded-3xl font-bold">
                Demo režim
            </button>
        </div>

        <!-- Centered login form -->
        <div class="flex flex-col items-center justify-center min-h-screen px-4">
            <div class="bg-gray-200 p-7 py-12 rounded-lg shadow-lg w-full max-w-2xl">
                <div class="flex flex-col">
                    <label for="email">Email:</label>
                    <input type="text" id="email" class="border border-gray-300 p-2 rounded mt-1"
                        placeholder="Zadejte svůj email" v-model="username" />
                </div>
                <div class="flex flex-col mt-4">
                    <label for="password">Heslo:</label>
                    <input type="password" id="password" class="border border-gray-300 p-2 rounded mt-1"
                        placeholder="Zadejte své heslo" v-model="password" @keyup.enter="loginUser" />
                </div>
                <div>
                    <button type="button" class="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-4 w-full"
                        @click="loginUser()">
                        Přihlásit se
                    </button>
                </div>
            </div>

            <div
                class="mt-4 w-full max-w-2xl flex flex-col sm:flex-row items-center justify-start text-sm sm:text-base">
                <span>Ještě nemáš účet?</span>
                <router-link :to="{ name: 'Register' }"
                    class="bg-blue-500 text-white px-4 py-2 rounded-3xl mt-2 sm:mt-0 sm:ml-3 hover:bg-blue-600">
                    Zaregistrovat se
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMainStore } from '../store'
import { useRouter } from 'vue-router';

const mainStore = useMainStore()
const router = useRouter();

const username = ref('');
const password = ref('');

function loginUser() {
    mainStore.api.post('/api/login/', {
        username: username.value,
        password: password.value,
    },
    ).then(response => {
        mainStore.api.get(`/user/${response.data.user.id}/`)
            .then((response) => {
                mainStore.setUser(response.data.user);
            }).catch(err => {
                console.error('Chyba při načítání profilu uživatele:', err);
            });
        router.push({ name: 'HomePage' });
    }).catch(err => {
        console.error(err)
    })
}

</script>
<style lang="">

</style>