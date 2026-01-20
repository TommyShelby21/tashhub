<template>
    <div class="add_team">
        <div>
            <h2>Vytvořit nový tým</h2>
        </div>
        <div class="form mt-5">
            <div v-if="success">
                <p class="text-green-600 bg-green-100 p-2 px-4 w-75 border-1 text-center border-green-600">Tým byl
                    úspešně
                    vytvořen</p>
            </div>
            <div class="grid grid-cols-1 sm:w-1/2">
                <div class="form-group grid">
                    <label class="">Název týmu:</label>
                    <input type="text" placeholder="Zadejte název týmu" class="mt-1" v-model="teamName"></input>
                </div>
                <div class="mt-5">
                    <button class="btn btn_main" @click="createTeam()">Vytvořit tým</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useMainStore } from '../store'
import { onMounted, ref } from 'vue'

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
const teamName = ref('')
const success = ref(false)

const createTeam = () => {
    mainStore.api.post(`/team/add`, { name: teamName.value }).then((response) => {
        success.value = true
        teamName.value = ''

    }).catch(err => {
        console.error(err)
    })
}

</script>
<style scoped>
.add_team {
    padding: 2rem;
    background-color: var(--main-color);
    color: var(--white);
    border-radius: 32px;
}

.form {
    background-color: var(--secondary-color);
    max-width: 700px;
    padding: 1rem;
    border-radius: 32px;
}

label {
    font-weight: 600;
    margin-bottom: 0.4rem;
    opacity: 0.7;
}

input {
    background-color: var(--main-color);
    color: var(--white);
    border-radius: 32px;
    padding: 0.5rem 1rem;
    min-height: 44px;
}

input::placeholder {
    font-size: 14px;
}

/* Root */
::v-deep(.custom-multiselect.multiselect) {
    background-color: #000;
    color: #fff;
    border-radius: 32px;
}

/* Control / input area */
::v-deep(.custom-multiselect .multiselect__tags) {
    background-color: #000;
    border: 1px solid #333;
    border-radius: 32px;
    min-height: 44px;
}

/* Placeholder */
::v-deep(.custom-multiselect .multiselect__placeholder) {
    color: #aaa;
}

/* Input text */
::v-deep(.custom-multiselect .multiselect__input) {
    background-color: #000;
    color: #fff;
}

/* Selected single label */
::v-deep(.custom-multiselect .multiselect__single) {
    background-color: #000;
    color: #fff;
}

/* Dropdown */
::v-deep(.custom-multiselect .multiselect__content-wrapper) {
    background-color: #000;
    border: 1px solid #333;
    color: #fff;
    border-radius: 16px;
}

/* Options */
::v-deep(.custom-multiselect .multiselect__option) {
    background-color: #000;
    color: #fff;
}

/* Hover / highlight */
::v-deep(.custom-multiselect .multiselect__option--highlight) {
    background-color: #222;
}

/* Selected option */
::v-deep(.custom-multiselect .multiselect__option--selected) {
    background-color: #111;
    font-weight: 600;
}

/* Tags (multiple select) */
::v-deep(.custom-multiselect .multiselect__tag) {
    background-color: #111;
    color: #fff;
    border-radius: 16px;
}

/* Tag remove icon */
::v-deep(.custom-multiselect .multiselect__tag-icon) {
    color: #aaa;
}

::v-deep(.custom-multiselect .multiselect__tag-icon:hover) {
    background-color: transparent;
    color: #fff;
}

/* Arrow */
::v-deep(.custom-multiselect .multiselect__select::before) {
    border-color: #fff transparent transparent;
}

/* Disabled */
::v-deep(.custom-multiselect.multiselect--disabled) {
    opacity: 0.5;
}
</style>