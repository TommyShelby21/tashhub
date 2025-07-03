<template>
    <div>

    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '../store'
const mainStore = useMainStore()

onMounted(() => {
    mainStore.api.get('/profile/').then(response => {
        mainStore.user = response.data
    }).catch(error => {
        console.error('Error fetching profile:', error)
    })
})

</script>
<style lang="">

</style>