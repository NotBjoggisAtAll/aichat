<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex">
    <Sidebar />
    <RouterView class="flex-fill" />
  </div>
</template>

<style scoped>
</style>
