<template>
    <div>
        <h1 style="font-size: 26px; font-weight: 700;">Organizace úkolů v týmu</h1>
    </div>
    <div class="mt-4">
        <div class="flex">
            <h2 class="me-5" style="font-size: 20px; font-weight: 500;">Aktuální úkoly:</h2>
            <button class="btn bg-blue-500 text-white px-5" @click="openTaskModal">Přidat úkol</button>
        </div>
        <Modal v-if="openedTaskModal" @close="openedTaskModal = false" :title="'Přidat úkol'">
            <template #modal-content>
                <div class="row">
                    <div>
                        <label for="name" class="">Název:</label>
                        <input type="text" placeholder="Zadejte název úkolu"
                            class="border-1 border-gray-300 p-1 w-full mt-1">
                    </div>
                    <div class="mt-2">
                        <label for="description" class="">Popis:</label>
                        <input type="text" placeholder="Zadejte popis úkolu"
                            class="border-1 border-gray-300 p-1 w-full mt-1">
                    </div>
                    <div class="mt-2">
                        <label>Přiřadit členy</label>
                        <select class="border-1 border-gray-300 p-1 w-full mt-1">
                            <option value="1">Použitelné</option>
                            <option value="2">Nepoužitelné</option>
                        </select>
                    </div>
                </div>
            </template>

        </Modal>
        <div v-for="task in teamTasks" :key="task.id">
            <span>{{ task.name }}</span>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useMainStore } from '../store';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import Modal from '../components/Modal.vue';

const mainStore = useMainStore();
const route = useRoute();
const teamTasks = ref([])
const openedTaskModal = ref(false)

onMounted(() => {
    mainStore.api.get(`/team/${route.params.id}/tasks`).then((response) => {
        mainStore.tasks = response.data;
    });
})

function openTaskModal() {
    openedTaskModal.value = true
}

</script>
<style lang="scss" scoped></style>