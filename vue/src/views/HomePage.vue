<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        asd
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '../store'

const mainStore = useMainStore()

async function test() {
    mainStore.api.get('/api/protected/')
        .then(response => {
            console.log('Response:', response.data)
        })
        .catch(error => {
            console.error('Error:', error)
        })
}


onMounted(() => {
    test()
})
</script>
<style lang="">

</style>