<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex">
    <Sidebar />
    <RouterView />
  </div>
</template>

<style scoped></style>
