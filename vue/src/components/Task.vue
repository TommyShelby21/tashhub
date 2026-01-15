<template>
    <div class="px-4 py-2 flex text-white font-semibold rounded-4xl cursor-grab task" draggable="true"
        @dragstart="onDragStart(task.id)">
        <span class="me-2">{{ task.name }}</span>
        <IconInfoCircleFilled class="cursor-pointer" @click="openTaskDetail(task.id)"
            style="width: 20px; height: 20px;" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { IconInfoCircleFilled } from '@tabler/icons-vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});


//
const draggedTaskId = ref(null);
function onDragStart(taskId) {
    draggedTaskId.value = taskId;
}

// Open Task
const openedTaskModal = ref(false)
function openTaskModal() {
    openedTaskModal.value = true
}
</script>
<style scoped>
.task {
    background-color: var(--main-color);
}
</style>