<template>
    <button v-if="!sidebarOpened" type="button" class="sm:hidden m-2 bg-blue-500 px-5 py-2 text-white rounded-4xl"
        @click="toggleSidebar()">
        <span>Otevrit sidebar</span>
    </button>

    <aside :class="[
        'fixed top-0 left-0 w-64 h-full transition-transform z-50 flex flex-col',
        sidebarOpened ? 'translate-x-0' : '-translate-x-full',
        'sm:translate-x-0' // Always open on sm and up
    ]">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 flex flex-col flex-1">
            <ul class="flex flex-col flex-grow gap-2">
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
                <li v-if="selectedTeam">
                    <router-link :to="{ path: `/team/${selectedTeam}/task-organizator` }"
                        class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                        <span class="ms-3">Organizace úkolů</span>
                    </router-link>
                </li>
                <li v-if="sidebarOpened">
                    <button @click="toggleSidebar" class="bg-blue-500 px-5 py-2 text-white rounded-4xl">
                        Zavřít sidebar
                    </button>
                </li>
            </ul>
            <div class="mb-10">
                <label for="team" class="block text-gray-700 font-bold">Vyberte tým:</label>
                <select class="border-1 border-gray-300 p-1 w-full mt-3" v-model="selectedTeam" @change="selectTeam()">
                    <option disabled></option>
                    <option v-for="team in availableTeams" :key="team.id" :value="team.id">{{ team.name }}</option>
                </select>
            </div>

            <div class="mt-auto mb-10">
                <a @click="logout"
                    class="flex items-center p-2 bg-black text-white font-bold rounded-4xl hover:bg-gray-100 justify-center">
                    <span class="flex-1 ms-3 whitespace-nowrap text-center">Odhlásit se</span>
                </a>
            </div>
        </div>
    </aside>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '../store';

const sidebarOpened = ref(false); // Controls visibility on mobile
const availableTeams = ref([]);
const selectedTeam = ref(null);

onMounted(() => {
    loadData();
});

const toggleSidebar = () => {
    sidebarOpened.value = !sidebarOpened.value;
};

const mainStore = useMainStore();

const logout = () => {
    mainStore.api.post('/api/logout/', {}).then(() => {
        window.location.href = '/login';
    });
}
const loadData = () => {
    mainStore.api.get('/available_user_teams/').then((response) => {
        availableTeams.value = response.data.teams;
    });
    mainStore.api.get('/profile/').then((response) => {
        selectedTeam.value = response.data.user_profile.selected_team;
        mainStore.setSelectedTeam(selectedTeam.value);
        console.log(mainStore.selectedTeam)
    });
}

const selectTeam = () => {
    mainStore.api.post('/profile/set_user_profile/', { team: selectedTeam.value }).then((response) => {
        mainStore.setSelectedTeam(selectedTeam.value);
    });
}

</script>

<style lang="" scoped>


</style>