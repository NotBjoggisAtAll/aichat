<template>
  <main>
    <div class="container">
      <div class="flex align-items-center">
        <h1 class="flex-fill">Thread {{ $route.params.threadId }}</h1>
      </div>
      <Chat />
    </div>
  </main>
</template>
<script setup lang="ts">
import Chat from '@/components/Chat.vue';
</script>

<style scoped>
.container {
  width: 60rem;
  padding-left: 2rem;
}

span {
  font-size: 1.5rem;
  margin: auto;
}
</style>
