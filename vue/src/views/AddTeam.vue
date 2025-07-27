<template>
    <div>
        <div>
            <h2>Vytvořit nový tým</h2>
        </div>
        <div class="form mt-10 grid grid-cols-1 sm:w-1/2">
            <div class="form-group grid">
                <label class="">Název týmu</label>
                <input type="text" placeholder="Zadejte název týmu" class="border-1 border-gray-300 mt-1 p-1"></input>
            </div>
            <div class="form-group grid mt-4">
                <label class="">Členové</label>
                <select class="border-1 border-gray-300 mt-1 p-1">
                    <option value="0" selected></option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.username }}
                    </option>
                </select>
            </div>
            <div class="mt-5">
                <button class="btn btn_secondary">Vytvořit tým</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useMainStore } from '../store'
import { onMounted, ref } from 'vue'
const mainStore = useMainStore();

const users = ref([])

onMounted(() => {
    loadUsers()
})

const loadUsers = () => {
    mainStore.api.get(`/users/`).then((response) => {
        users.value = response.data.items
    })
}
</script>
<style lang="">

</style>