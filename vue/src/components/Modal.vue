<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/40" @click="$emit('close')"></div>

        <!-- Modal Content -->
        <div class="bg-white rounded-lg shadow-lg max-w-md p-6 z-10 transition transform duration-300 w-full grid grid-cols-12"
            style="max-width: 550px;">
            <div class="col-span-6">
                <h2 class="text-xl font-bold" v-if="title">{{ title }}</h2>
            </div>
            <div class="col-span-6 flex">
                <slot name="next-header"></slot>
            </div>
            <!-- Named slot for modal content -->
            <div class="col-span-12 mt-5">
                <slot name="modal-content"></slot>
            </div>

            <div class="flex justify-end mt-4 gap-2 col-span-12">
                <button @click="$emit('close')" class="btn px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Zavřít
                </button>
                <button @click="$emit('submit')" class="btn btn_main px-4 py-2 rounded hover:bg-gray-400">
                    Potvrdit
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