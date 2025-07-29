<template>
    <div>
        <div>
            <h2>Vytvořit nový tým</h2>
        </div>
        <div v-if="success" class="mt-5">
            <p class="text-green-600 bg-green-100 p-2 px-4 w-75 border-1 text-center border-green-600">Tým byl úspešně vytvořen</p>
        </div>
        <div class="form mt-10 grid grid-cols-1 sm:w-1/2">
            <div class="form-group grid">
                <label class="">Název týmu:</label>
                <input type="text" placeholder="Zadejte název týmu" class="border-1 border-gray-300 mt-1 p-1" v-model="teamName"></input>
            </div>
            <div class="form-group grid mt-4">
                <label class="">Členové:</label>
                <multiselect v-model="teamUsers" :options="users" :multiple="true" :close-on-select="false"
                    :preserve-search="true" track-by="id" label="username" placeholder="Vyberte členy týmu"
                    select-label="Vybrat" deselect-label="Odstranit" class="custom-multiselect">
                </multiselect>
            </div>
            <div class="mt-5">
                <button class="btn btn_secondary" @click="createTeam()">Vytvořit tým</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useMainStore } from '../store'
import { onMounted, ref } from 'vue'
import Multiselect from 'vue-multiselect'

const mainStore = useMainStore();


// Load Users
const users = ref([])

onMounted(() => {
    loadUsers()
})

const loadUsers = () => {
    mainStore.api.get(`/users/`).then((response) => {
        users.value = response.data.items
    })
}

// Add Team
const teamUsers = ref([])
const teamName = ref('')
const success = ref(false)

const createTeam = () => {
    mainStore.api.post(`/team/add`, { name: teamName.value, users: teamUsers.value }).then((response) => {
        success.value = true
        teamUsers.value = []
        teamName.value = ''

    }).catch(err => {
        console.error(err)
    })
}

</script>
<style scoped>
::v-deep(.custom-multiselect .multiselect__control) {
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
}

::v-deep(.custom-multiselect .multiselect__option--highlight) {
    background-color: #dbeafe;
    background-color: var(--secondary-color);
}

::v-deep(.custom-multiselect .multiselect__tag) {
    background-color: var(--secondary-color);
    color: #fff;
}
::v-deep(.custom-multiselect .multiselect__tag-icon) {
    background-color: transparent;
    color: #fff;
}
::v-deep(.custom-multiselect .multiselect__content-wrapper) {
    font-size: 16px;
}
</style>