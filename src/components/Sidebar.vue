<template>
  <nav class="sidebar">
    <div class="flex align-items-center">
      <h1 class="flex-fill">
        <router-link :to="{ name: 'home' }">Threads</router-link>
      </h1>
      <button class="btn" @click="createThread()">
        <span class="material-symbols-outlined"> add </span>
      </button>
    </div>
    <div class="container">
      <router-link
        class="router-link"
        v-for="thread in threads"
        :key="thread"
        :to="`/thread/${thread}`"
        >{{ thread }}</router-link
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import ChatApi from '@/api/ChatApi'
import { onMounted, ref, type PropType } from 'vue'
import { useRouter } from 'vue-router'

const api = new ChatApi()

const threads = ref<string[]>([])
const router = useRouter()
onMounted(async () => {
  getAllThreads()
})

async function createThread() {
  const response = await api.createThread()
  router.push({ name: 'thread', params: { threadId: response.data } })
  getAllThreads()
}

async function getAllThreads() {
  const response = await api.getAllThreads()
  threads.value = response.data
}
</script>

<style scoped>

span {
  margin: auto;
  font-size: 1rem;
}
button {
  padding: 0.5rem;
}

.container {
  min-height: 20hv;
  max-height: 80vh;
  overflow: auto;
}
</style>
