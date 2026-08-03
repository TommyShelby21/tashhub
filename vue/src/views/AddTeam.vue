<template>
    <div>
        <div class="flex flex-col gap-1 mb-6">
            <p class="text-sm font-semibold text-blue-600 uppercase tracking-wider">Tým</p>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Vytvořit nový tým</h1>
            <p class="text-sm text-slate-500">Zadejte název týmu a vytvořte nové pracovní prostředí.</p>
        </div>

        <div class="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 max-w-lg">
            <div class="space-y-6">
                <div v-if="success"
                    class="rounded-2xl bg-emerald-50 p-4 text-center text-sm text-emerald-700 ring-1 ring-emerald-200">
                    Tým byl úspěšně vytvořen
                </div>

                <div class="space-y-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-slate-700">Název týmu</label>
                        <input type="text" placeholder="Zadejte název týmu"
                            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                            v-model="teamName" />
                    </div>
                    <button class="btn btn_main w-full rounded-2xl px-5 py-3 text-base" @click="createTeam()">
                        Vytvořit tým
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useMainStore } from '../store'
import { onMounted, ref } from 'vue'

const mainStore = useMainStore();

// Add Team
const teamName = ref('')
const success = ref(false)

const createTeam = () => {
    mainStore.api.post(`/team/add`, { name: teamName.value }).then((response) => {
        success.value = true
        teamName.value = ''

    }).catch(err => {
        console.error(err)
    })
}

</script>
<style scoped></style>
