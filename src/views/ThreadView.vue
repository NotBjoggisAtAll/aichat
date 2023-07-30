<template>
  <main>
    <div class="container">
      <div class="flex align-items-center">
        <h1 class="flex-fill">Thread {{ $route.params.threadId }}</h1>
        <button class="btn btn-delete" @click="deleteThread()">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </div>
      <Chat />
    </div>
  </main>
</template>
<script setup lang="ts">
import ChatApi from '@/api/ChatApi';
import Chat from '@/components/Chat.vue';
import { useRoute, useRouter } from 'vue-router';

const api = new ChatApi()
const router = useRouter()
const route = useRoute()

async function deleteThread() {
  const threadId = route.params.threadId
  console.log(threadId)
  if (!threadId) return
  if (typeof threadId !== 'string') return
  await api.deleteThread(threadId)

  router.push({ name: 'home' })
}
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
