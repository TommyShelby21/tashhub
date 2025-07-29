<template>
    <div class="border-2 border-gray-200 grid grid-cols-2 h-[600px]">
        <div class="picture grid-col-span-1">
            <div>
                <h2>Profilový obrázek</h2>
            </div>
        </div>
        <div class="info grid-col-span-1">
            <div>
                <h2>Informace</h2>
            </div>
            <div class="grid mt-5">
                <span class="font-semibold">Email:</span>
                <span>{{ mainStore.user.email }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '../store'
const mainStore = useMainStore()


</script>
<style lang="">

</style>