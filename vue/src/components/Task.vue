<template>
    <div class="px-4 py-2 flex text-white font-semibold rounded-4xl cursor-grab task" draggable="true"
        @dragstart="onDragStart(task.id)">
        <span class="me-2 text-white">{{ task.name }}</span>
        <IconInfoCircleFilled class="cursor-pointer" @click="openDetail"
            style="width: 20px; height: 20px;" />
    </div>
    <Modal v-if="openedTaskDetail" @close="openedTaskDetail = false" @delete="deleteTask(task.id)" @submit="saveTask"
        :title="'Detail úkolu'" :deleteButton="true" :submitButton="true">
        <template #modal-content>
            <div class="flex flex-col gap-4">
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-slate-700">Název</label>
                    <input type="text" v-model="editedName" placeholder="Název úkolu"
                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-slate-700">Popis</label>
                    <textarea v-model="editedDescription" rows="4" placeholder="Popis úkolu"
                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 resize-none"></textarea>
                </div>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 border-t border-slate-100 text-xs text-slate-400">
                    <span v-if="task.created_by" class="flex items-center gap-1">
                        <IconUserCircle :size="14" />
                        Vytvořil: <span class="font-medium text-slate-500">{{ task.created_by.username }}</span>
                    </span>
                    <span v-if="task.created_at" class="flex items-center gap-1">
                        <IconClock :size="14" />
                        {{ formattedCreatedAt }}
                    </span>
                </div>
            </div>
        </template>
    </Modal>
</template>
<script setup>
import { ref, computed, defineEmits } from 'vue';
import { IconInfoCircleFilled, IconUserCircle, IconClock } from '@tabler/icons-vue';
import Modal from '../components/Modal.vue';
import { useMainStore } from '../store';
import { useRoute } from 'vue-router';

const mainStore = useMainStore();
const route = useRoute();

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['draggedTaskId', 'deleteTask', 'taskUpdated']);

const draggedTaskId = ref(null);
function onDragStart(taskId) {
    draggedTaskId.value = taskId;
    emit('draggedTaskId', taskId);
}

// Open Task
const openedTaskDetail = ref(false)
const editedName = ref('')
const editedDescription = ref('')

function openDetail() {
    editedName.value = props.task.name
    editedDescription.value = props.task.description
    openedTaskDetail.value = true
}

const formattedCreatedAt = computed(() => {
    if (!props.task.created_at) return ''
    return new Date(props.task.created_at).toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
})

const saveTask = () => {
    mainStore.api.put(`/team/${route.params.id}/task/update/`, {
        taskId: props.task.id,
        name: editedName.value,
        description: editedDescription.value
    })
        .then(() => {
            openedTaskDetail.value = false
            emit('taskUpdated')
        })
        .catch((error) => {
            console.error('Task update failed', error)
        })
}

const deleteTask = (taskId) => {
    mainStore.api.put(`/team/${route.params.id}/task/delete/`, { taskId })
        .then(() => {
            openedTaskDetail.value = false
            emit('deleteTask')
        })
        .catch((error) => {
            console.error('Task delete failed', error)
        })
}

</script>
<style scoped>
.task {
    background-color: var(--main-color);
}
</style>
