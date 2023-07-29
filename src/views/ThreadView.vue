<template>
  <main>
    <div class="container">
      <h1>Thread {{ $route.params.threadId }}</h1>
      <Chat />
    </div>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import Chat from '@/components/Chat.vue'
</script>

<style scoped>
.container {
  width: 60rem;
  padding-left: 2rem;
}
</style>
