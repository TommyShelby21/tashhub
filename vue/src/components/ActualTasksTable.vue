<template>
    <div class="flex items-center gap-5 mb-4 mt-10">
        <div class="flex items-center gap-2 current_time_div">
            <span>{{ formattedCurrentDate }}</span>
        </div>
        <div class="gap-2 flex">
            <button class="btn btn_main previous" @click="previousWeek">
                <span>
                    < </span>
            </button>
            <button class="btn btn_main next" @click="nextWeek">></button>
        </div>
    </div>
    <div class="h-[600px] overflow-x-auto overflow-y-auto">
        <table class="table-fixed w-full">
            <thead class="sticky top-0 z-10" style="background-color: var(--main-color); color: var(--text-color);">
                <tr class="">
                    <th class="w-24 px-4 py-2">Čas</th>
                    <th class="px-4 py-2" v-for="day in weekDays" :key="day">{{ day.label }}</th>
                </tr>
            </thead>
            <tbody class="text-sm">
                <tr v-for="hour in hours" :key="hour">
                    <td class="border px-2 py-1 font-medium bg-gray-100 text-center">{{ hour }}</td>
                    <td v-for="day in weekDays" :key="day.index"
                        class="border px-2 py-6 hover:bg-blue-100 cursor-pointer" @dragover.prevent
                        @drop="onDrop(day, hour)">

                        <div v-for="task in tasksForCell(day.index, hour)" :key="task.id">
                            <Task :task="task.task" draggable="true" @dragstart="onDragStart(task.task.id)" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useMainStore } from '../store'
import { useRoute } from 'vue-router'
import Task from '../components/Task.vue';

const mainStore = useMainStore()
const route = useRoute()

const emit = defineEmits(['clearDraggedTaskId', 'onDragStart'])

const props = defineProps({
    draggedTaskId: Number,
    teamTasks: Array
})

// Update current date
const currentDate = ref(new Date())
const assignedTasks = ref([])


watch(
    () => mainStore.selectedTeam,
    (newTeam) => {
        if (newTeam) {
            loadData()
        }
    },
    { immediate: true }
)

function loadData() {
    if (mainStore.selectedTeam) {
        mainStore.api.get(`/team/${mainStore.selectedTeam}/assigned_tasks`)
            .then((response) => {
                assignedTasks.value = response.data.assigned_tasks;
            })
    }
}

const formattedCurrentDate = computed(() => {
    return currentDate.value.toLocaleDateString('cs-CZ', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
})


function nextWeek() {
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() + 7)
    currentDate.value = newDate
    loadData()
}

function previousWeek() {
    const newDate = new Date(currentDate.value)
    newDate.setDate(newDate.getDate() - 7)
    currentDate.value = newDate
    loadData()
}

// Get the Monday of the current week
function getStartOfWeek(date) {
    const day = date.getDay() || 7 // Sunday=0 becomes 7
    const monday = new Date(date)
    monday.setDate(date.getDate() - day + 1)
    return monday
}

const weekDays = computed(() => {
    const start = getStartOfWeek(currentDate.value)
    const days = []

    for (let i = 0; i < 7; i++) {
        const d = new Date(start)
        d.setDate(start.getDate() + i)

        const label = d.toLocaleDateString('cs-CZ', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit'
        })

        days.push({
            date: d,
            label,
            index: i + 1 // matches 1 = Monday, 7 = Sunday
        })
    }

    return days
})

const hours = ref([
    '00:00', '01:00', '02:00', '03:00', '04:00',
    '05:00', '06:00', '07:00',
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00',
    '23:00', '24:00'
]);

function onDrop(day, hour) {
    saveTaskChanges(day, hour, props.draggedTaskId);

    // clear the draggedTaskId
    emit('clearDraggedTaskId');
}

function tasksForCell(day, hour) {
    const startOfWeek = getStartOfWeek(currentDate.value)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)

    return assignedTasks.value.filter(task => {
        const taskDate = new Date(task.datetime)

        // pouze pokud je task v aktuálním týdnu
        if (taskDate < startOfWeek || taskDate > endOfWeek) return false

        const taskDay = taskDate.getUTCDay() === 0 ? 7 : taskDate.getUTCDay() // Sunday = 7
        const taskHour = taskDate.getUTCHours().toString().padStart(2, '0') + ':00'

        return taskDay === day && taskHour === hour
    })
}

const saveTaskChanges = (day, hour, taskId) => {
    const correct_datetime = `${day.date.getFullYear()}-${day.date.getMonth() + 1}-${day.date.getDate()} ${hour}:00`
    const postData = {
        datetime: correct_datetime,
        taskId: taskId
    }
    mainStore.api.put(`/team/${route.params.id}/tasks/update/`, postData).then((response) => {
        loadData()
    })
}

const onDragStart = (taskId) => {
    emit('onDragStart', taskId)
}

</script>
<style scoped>
.current_time_div {
    color: var(--white);
    background-color: var(--main-color);
    font-weight: 700;
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 8px;
}

.previous,
.next {
    font-size: 20px;
    padding: 6px 30px;
}
</style>