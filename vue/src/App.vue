<template>
  <SideBar v-if="showNavbar" />
  <router-view />
</template>

<script setup>
import { computed } from 'vue';
import SideBar from './components/SideBar.vue';
import { useRoute } from 'vue-router'

const route = useRoute();

const showNavbar = computed(() =>
  route.meta.navbar !== false
)
</script>

<style scoped></style>
