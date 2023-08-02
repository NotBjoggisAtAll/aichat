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
      <SidebarItem
        v-for="thread in threads"
        :key="thread"
        :thread-id="thread"
        @delete-thread="getAllThreads"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import ChatApi from '@/api/ChatApi'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

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
  console.log('getAllThreads')
  const response = await api.getAllThreads()
  threads.value = response.data
}
</script>

<style scoped>
span {
  margin: auto;
  font-size: 1.5rem;
}

a {
  text-decoration: none;
  color: var(--color-text);
}

.container {
  min-height: 20hv;
  max-height: 80vh;
  overflow: auto;
}
</style>
