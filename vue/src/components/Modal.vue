<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 px-4">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" @click="$emit('close')"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-lg rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgba(15,23,42,0.5)] ring-1 ring-slate-200 z-10 max-h-[90vh] flex flex-col overflow-hidden">
            <div class="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-slate-100">
                <h2 class="text-lg font-bold text-slate-900" v-if="title">{{ title }}</h2>
                <div class="flex items-center gap-2 ml-auto">
                    <slot name="next-header"></slot>
                    <button @click="$emit('close')" type="button"
                        class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                        <IconX :size="18" />
                    </button>
                </div>
            </div>

            <!-- Named slot for modal content -->
            <div class="px-6 py-5 overflow-y-auto">
                <slot name="modal-content"></slot>
            </div>

            <div class="flex justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button @click="$emit('close')" class="btn btn_cancel">
                    Zavřít
                </button>
                <button @click="$emit('delete')" class="btn btn_delete" v-if="deleteButton">
                    Smazat
                </button>
                <button @click="$emit('submit')" class="btn btn_submit" v-if="submitButton">
                    Potvrdit
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { IconX } from '@tabler/icons-vue';

defineProps({
    title: String,
    deleteButton: {
        type: Boolean,
        default: false
    },
    submitButton: {
        type: Boolean,
        default: false
    }
})

</script>
<style scoped></style>
