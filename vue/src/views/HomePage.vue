<template>
    <div class="">
        <h2 style="font-size: 24px; font-weight: 700;">Vaše úkoly:</h2>
    </div>
    <div class="mt-4">
        <ActualTasksTable />
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '../store'
import ActualTasksTable from '../components/ActualTasksTable.vue';



</script>
<style lang="">

</style>