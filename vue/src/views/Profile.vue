<template>
    <div class="grid grid-cols-2 gap-6 h-[600px]">
        <div class="picture col-span-2 md:col-span-1">
            <div>
                <h2>Profilový obrázek</h2>
            </div>
            <div class="border-2 border-gray-200 h-100 flex justify-center items-center">
                <IconUserCircle stroke={2} class="h-80 w-100 md:w-80" />
            </div>
        </div>
        <div class="info col-span-2 md:col-span-1 ">
            <div>
                <h2>Informace</h2>
            </div>
            <div class="grid mt-5" v-if="mainStore.user">
                <div class="grid">
                    <span class="font-semibold">Užitelské jméno:</span>
                    <span>{{ mainStore.user.username }}</span>
                </div>
                <div class="grid mt-4">
                    <span class="font-semibold">Email:</span>
                    <span v-if="mainStore.user.email">{{ mainStore.user.email }}</span>
                    <span>-</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '../store'
import { IconUserCircle } from '@tabler/icons-vue';

const mainStore = useMainStore()


</script>
<style lang="">

</style>