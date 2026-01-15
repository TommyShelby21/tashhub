<template>
    <div>
        <h1 style="font-size: 26px; font-weight: 700;">Organizace úkolů v týmu</h1>
    </div>
    <div class="mt-4">
        <div class="flex">
            <h2 class="me-5" style="font-size: 20px; font-weight: 500;">Aktuální úkoly:</h2>
            <button class="btn btn_main" @click="openTaskModal">Přidat úkol</button>
        </div>
        <!-- Add task Modal -->
        <Modal v-if="openedTaskModal" @close="openedTaskModal = false" @submit="submitNewTask" :title="'Přidat úkol'">
            <template #modal-content>
                <div class="row">
                    <div>
                        <label for="name" class="text-color">Název:</label>
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
            <div v-for="task in teamTasks" :key="task.id">
                <Task :task="task" />
            </div>
        </div>
        <!-- Assign members to task Modal -->
        <Modal v-if="openedTaskDetail" @close="openedTaskDetail = false" :title="'Detail úkolu'"
            @submit="assignMembers()">
            <template #next-header>
                <div class="flex cursor-pointer btn btn_main justify-center items-center"
                    @click="addingMembers = !addingMembers">
                    <IconPlus stroke={2} class="me-2" />
                    <span>Přiřadit členy</span>
                </div>
            </template>
            <template #modal-content>
                <div class="grid">
                    <div class="grid grid-cols-2">
                        <div v-if="openedTask.team_members.length > 0" v-for="team_member in openedTask.team_members"
                            :key="team_member.id" class="col-span-1">
                            <IconUserCircle stroke={2} style="width: 40px; height: 40px;"
                                data-tooltip-target="tooltip-default" />
                            <div id="tooltip-default" role="tooltip"
                                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                                Tooltip content
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div v-else class="col-span-1">
                            <!-- empty div -->
                        </div>
                        <div v-if="addingMembers" class="mb-4 w-full ms-auto grid-cols-1">
                            <multiselect v-model="assignedTeamMembers" :options="processedTeamMembers" :multiple="true"
                                :close-on-select="false" :preserve-search="true" track-by="id" label="label"
                                placeholder="Vyberte členy týmu" select-label="Vybrat" deselect-label="Odstranit"
                                class="custom-multiselect">
                            </multiselect>
                        </div>
                    </div>
                    <div v-if="openedTask.team_members.length <= 0" class="mt-4">
                        <span class="font-bold">Nikdo nepřiřazen</span>
                    </div>
                    <span class="font-semibold mt-4" style="font-size: 20px;">{{ openedTask.name }}</span>
                    <p>
                        {{ openedTask.description }}
                    </p>
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
import { computed, ref } from 'vue';
import { useMainStore } from '../store';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import Modal from '../components/Modal.vue';
import ActualTasksTable from '../components/ActualTasksTable.vue';
import Task from '../components/Task.vue';
import { IconUserCircle } from '@tabler/icons-vue';
import { IconPlus } from '@tabler/icons-vue';
import Multiselect from 'vue-multiselect'

const mainStore = useMainStore();
const route = useRoute();

onMounted(() => {
    loadData()
})

// Load Data
const teamTasks = ref([])
function loadData() {
    mainStore.api.get(`/team/${route.params.id}/tasks`).then((response) => {
        teamTasks.value = response.data.tasks;
    });
}

// Open Task
const openedTaskModal = ref(false)
function openTaskModal() {
    openedTaskModal.value = true
}

const openedTaskDetail = ref(false)
const openedTask = ref({})
const openTaskDetail = (taskId) => {
    openedTask.value = teamTasks.value.find(task => task.id === taskId)
    openedTaskDetail.value = true
}

// Add Task
const addTask = ref({
    name: '',
    description: '',
    users: []
})
function submitNewTask() {
    mainStore.api.post(`/team/${route.params.id}/tasks/add/`, addTask.value).then((response) => {
        loadData()
        openedTaskModal.value = false
    })
}

// Load Team Members
const teamMembers = ref([])
onMounted(() => {
    mainStore.api.get(`/team/${route.params.id}/members`).then((response) => {
        teamMembers.value = response.data.members;
    });
})
const processedTeamMembers = computed(() => {
    return teamMembers.value.map(member => ({
        ...member,
        id: member.user.id,
        label: member.user.username
    }))
})

// Add Members to Task
const addingMembers = ref(false)
const assignedTeamMembers = ref([])
const assignMembers = () => {
    let payload = {
        taskId: openedTask.value.id,
        teamMembers: assignedTeamMembers.value.map(member => member.id)
    }
    mainStore.api.post(`/team/${route.params.id}/tasks/assign`, payload).then((response) => {
        loadData()
        addingMembers.value = false
    })
}


</script>
<style scoped></style>