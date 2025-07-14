<template>
    <div class="flex items-center gap-5 mb-4">
        <div>
            <span>Aktualni den mesic</span>
        </div>
        <div>
            <button>prepinac tydnu</button>
        </div>
    </div>
    <div class="h-100 border-5 border-gray-300 overflow-x-auto">
        <table class="table-auto w-full ">
            <thead class="bg-gray-200">
                <tr>
                    <th class="px-4 py-2">Pondělí</th>
                    <th class="px-4 py-2">Úterý</th>
                    <th class="px-4 py-2">Středa</th>
                    <th class="px-4 py-2">Čtvrtek</th>
                    <th class="px-4 py-2">Pátek</th>
                    <th class="px-4 py-2">Sobota</th>
                    <th class="px-4 py-2">Neděle</th>
                </tr>
            </thead>
            <tbody class="bg-gray-100">
                <!-- <tr v-for="task in mainStore.tasks" :key="task.id">
                        <td class="border px-4 py-2">{{ task.name }}</td>
                        <td class="border px-4 py-2">{{ task.description }}</td>
                        <td class="border px-4 py-2">{{ task.status }}</td>
                    </tr> -->
            </tbody>
        </table>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>