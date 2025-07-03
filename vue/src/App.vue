<template>
  <SideBar v-if="showNavbar" />
  <div class="ms-64 p-2">
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SideBar from './components/SideBar.vue';
import { useRoute } from 'vue-router'
import { useMainStore } from './store';
import { onMounted } from 'vue';

const store = useMainStore();

onMounted(() => {
  store.setupInterceptors();
});


const route = useRoute();

const showNavbar = computed(() =>
  route.meta.navbar !== false
)
</script>

<style scoped></style>
