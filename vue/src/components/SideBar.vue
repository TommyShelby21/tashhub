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
        <div class="h-full px-3 py-4 overflow-y-auto  flex flex-col flex-1 sidebar" style="background-color: #7A7A73;">
            <ul class="flex flex-col flex-grow gap-2">
                <li>
                    <router-link :to="{ path: '/' }"
                        class="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-800">
                        <span class="ms-3">Nástěnka</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/profile' }"
                        class="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-800">
                        <span class="ms-3">Můj účet</span>
                    </router-link>
                </li>
                <li v-if="selectedTeam">
                    <router-link :to="{ path: `/team/${selectedTeam}/task-organizator` }"
                        class="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-800">
                        <span class="ms-3">Organizace úkolů</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/add-team' }"
                        class="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-800">
                        <span class="ms-3">Vytvořit nový tým</span>
                    </router-link>
                </li>
                <li v-if="sidebarOpened">
                    <button @click="toggleSidebar" class="bg-blue-500 px-5 py-2 text-gray-100 rounded-4xl">
                        Zavřít sidebar
                    </button>
                </li>
            </ul>
            <div class="mb-10">
                <label for="team" class="block text-gray-700 font-bold">Vyberte tým:</label>
                <select class="border-1 border-gray-900 text-gray-100 bg-gray-500 p-1 w-full mt-3"
                    v-model="selectedTeam" @change="selectTeam()">
                    <option disabled></option>
                    <option v-for="team in availableTeams" :key="team.id" :value="team.id">{{ team.name }}</option>
                </select>
            </div>

            <div class="mt-auto mb-10">
                <a @click="logout" class="flex items-center rounded-4xl justify-center btn btn_main">
                    <span class="flex-1 ms-3 whitespace-nowrap text-center">Odhlásit se</span>
                </a>
            </div>
        </div>
    </aside>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useMainStore } from '../store';

const sidebarOpened = ref(false); // Controls visibility on mobile
const availableTeams = ref([]);
const selectedTeam = ref(null);

const mainStore = useMainStore();

onMounted(() => {
    selectedTeam.value = mainStore.selectedTeam
});



const toggleSidebar = () => {
    sidebarOpened.value = !sidebarOpened.value;
};

const logout = () => {
    mainStore.api.post('/api/logout/', {}).then(() => {
        window.location.href = '/login';
        mainStore.setUser(null);
        mainStore.setSelectedTeam(null);
    });
}
const loadData = () => {
    mainStore.api.get('/available_user_teams/').then((response) => {
        availableTeams.value = response.data.teams;
    });
}

const selectTeam = () => {
    mainStore.api.post('/profile/set_user_profile/', { team: selectedTeam.value }).then((response) => {
        console.log("Nastaven vybraný tým:", selectedTeam.value);
        mainStore.setSelectedTeam(selectedTeam.value);
    });
}

watch(() => mainStore.user, (newUser) => {
    if (newUser) {
        loadData();
    }
}, { immediate: true }
);

</script>

<style lang="" scoped>


</style>