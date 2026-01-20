<template>
    <div class="profile main_div grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- PROFILE PICTURE -->
        <div class="flex flex-col items-center">
            <h2 class="section-title">Profilový obrázek</h2>

            <div class="profile-avatar mt-4 flex items-center justify-center">
                <IconUserCircle class="h-48 w-48 opacity-80" />
            </div>
        </div>

        <!-- USER INFO -->
        <div>
            <h2 class="section-title">Informace</h2>
            <div v-if="mainStore.user" class="info-card mt-4 space-y-4">
                <div>
                    <span class="info-label">Uživatelské jméno</span>
                    <p class="info-value">{{ mainStore.user.username }}</p>
                </div>

                <div v-if="mainStore.user.email">
                    <span class="info-label">Email</span>
                    <p class="info-value">{{ mainStore.user.email }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useMainStore } from '../store'
import { IconUserCircle } from '@tabler/icons-vue';

const mainStore = useMainStore()


</script>
<style scoped>
.profile {
    color: var(--white);
    min-height: 500px;
    max-height: fit-content;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    opacity: 0.95;
}

.profile-avatar {
    width: 220px;
    height: 220px;
    border: 2px dashed rgba(255, 255, 255, 0.4);
}

.info-card {
    background: var(--secondary-color);
    padding: 1.25rem;
    border-radius: 20px;
}

.info-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    opacity: 0.7;
}

.info-value {
    font-size: 1rem;
    font-weight: 600;
}
</style>
