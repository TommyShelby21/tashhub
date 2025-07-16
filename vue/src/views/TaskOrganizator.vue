<template>
    <div>
        <h1 style="font-size: 26px; font-weight: 700;">Organizace úkolů v týmu</h1>
    </div>
    <div class="mt-4">
        <div class="flex">
            <h2 class="me-5" style="font-size: 20px; font-weight: 500;">Aktuální úkoly:</h2>
            <button class="btn btn_main" @click="openTaskModal">Přidat úkol</button>
        </div>
        <Modal v-if="openedTaskModal" @close="openedTaskModal = false" @submit="submitNewTask" :title="'Přidat úkol'">
            <template #modal-content>
                <div class="row">
                    <div>
                        <label for="name" class="">Název:</label>
                        <input type="text" placeholder="Zadejte název úkolu"
                            class="border-1 border-gray-300 p-1 w-full mt-1" v-model="addTask.name">
                    </div>
                    <div class="mt-2">
                        <label for="description" class="">Popis:</label>
                        <input type="text" placeholder="Zadejte popis úkolu"
                            class="border-1 border-gray-300 p-1 w-full mt-1" v-model="addTask.description">
                    </div>
                    <div class="mt-2">
                        <label>Přiřadit členy</label>
                        <select class="border-1 border-gray-300 p-1 w-full mt-1" multiple v-model="addTask.users">
                            <option value="1">Použitelné</option>
                            <option value="2">Nepoužitelné</option>
                        </select>
                    </div>
                </div>
            </template>

        </Modal>
        <div class="flex gap-5 mt-3">
            <div v-for="task in teamTasks" :key="task.id"
                class="px-4 py-2 flex text-white font-semibold rounded-4xl cursor-grab hover:bg-gray-800 transition"
                draggable="true" @dragstart="onDragStart(task.id)" style="background-color: var(--secondary-color)">
                <span class="me-2">{{ task.name }}</span>
                <IconInfoCircleFilled class="cursor-pointer" @click="openTaskDetail(task.id)" />
            </div>
        </div>
        <Modal v-if="openedTaskDetail" @close="openedTaskDetail = false" :title="'Detail úkolu'">
            <template #modal-content>
                <div>
                    {{ openedTask }}
                </div>
            </template>
        </Modal>

        <div class="mt-5">
            <ActualTasksTable :draggedTaskId="draggedTaskId" :teamTasks="teamTasks"
                @clearDraggedTaskId="draggedTaskId = null" @onDragStart="onDragStart" />
        </div>
    </div>

</template>
<script setup>
import { IconInfoCircleFilled } from '@tabler/icons-vue';
import { ref } from 'vue';
import { useMainStore } from '../store';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import Modal from '../components/Modal.vue';
import ActualTasksTable from '../components/ActualTasksTable.vue';

const mainStore = useMainStore();
const route = useRoute();
const teamTasks = ref([])
const openedTaskModal = ref(false)
const draggedTaskId = ref(null);
const openedTaskDetail = ref(false)
const openedTask = ref({})
const addTask = ref({
    name: '',
    description: '',
    users: []
})

onMounted(() => {
    loadData()
})

function loadData() {
    mainStore.api.get(`/team/${route.params.id}/tasks`).then((response) => {
        teamTasks.value = response.data.tasks;
    });
}
function onDragStart(taskId) {
    draggedTaskId.value = taskId;
}
function openTaskModal() {
    openedTaskModal.value = true
}

function submitNewTask() {
    mainStore.api.post(`/team/${route.params.id}/tasks/add/`, addTask.value).then((response) => {
        loadData()
        openedTaskModal.value = false
    })
}
const openTaskDetail = (taskId) => {
    openedTask.value = teamTasks.value.find(task => task.id === taskId)
    openedTaskDetail.value = true
}

</script>
<style lang="scss" scoped></style>