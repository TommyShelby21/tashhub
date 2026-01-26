<template>
    <div class="px-4 py-2 flex text-white font-semibold rounded-4xl cursor-grab task" draggable="true"
        @dragstart="onDragStart(task.id)">
        <span class="me-2 text-white">{{ task.name }}</span>
        <IconInfoCircleFilled class="cursor-pointer" @click="openedTaskDetail = true" style="width: 20px; height: 20px;" />
    </div>
    <Modal v-if="openedTaskDetail" @close="openedTaskDetail = false" :title="'Detail úkolu'" :deleteButton="true" :submitButton="false">
        <template #modal-content>
            <div class="flex flex-col">
                <div>
                    <span class="font-semibold" style="font-size: 20px;">{{ task.name }}</span>
                </div>
                <div class="mt-2">
                    <p>
                        {{ task.description }}
                    </p>
                </div>
            </div>
        </template>
    </Modal>
</template>
<script setup>
import { ref, defineEmits } from 'vue';
import { IconInfoCircleFilled } from '@tabler/icons-vue';
import Modal from '../components/Modal.vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['draggedTaskId']);

const draggedTaskId = ref(null);
function onDragStart(taskId) {
    console.log('Dragging task ID:', taskId);
    draggedTaskId.value = taskId;
    emit('draggedTaskId', taskId);
}

// Open Task
const openedTaskDetail = ref(false)

</script>
<style scoped>
.task {
    background-color: var(--main-color);
}
</style>