<template>
    <div>
        <h1 style="font-size: 26px; font-weight: 700;">Organizace úkolů v týmu</h1>
    </div>
    <div class="mt-4">
        <div class="flex">
            <h2 style="font-size: 20px; font-weight: 500;">Aktuální úkoly:</h2>
            <button class="bg-blue-500 text-white px-5">Přidat úkol</button>
        </div>
        <div v-for="task in teamTasks" :key="task.id">
            <span>{{ task.name }}</span>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useMainStore } from '../store';
import { onMounted } from 'vue'

const teamTasks = ref([])

onMounted(() => {
    useMainStore.api.get("/team-tasks/").then(() => {
        teamTasks = response.data;
    });
})

</script>
<style lang="">

</style>