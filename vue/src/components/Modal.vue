<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/40" @click="$emit('close')"></div>

        <!-- Modal Content -->
        <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 z-10 transition transform duration-300">
            <h2 class="text-xl font-bold mb-4" v-if="title">{{ title }}</h2>

            <!-- Named slot for modal content -->
            <slot name="modal-content"></slot>

            <div class="flex justify-end mt-4">
                <button @click="$emit('close')" class="btn px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
defineProps({
    title: String
})

</script>
<style lang="">

</style>