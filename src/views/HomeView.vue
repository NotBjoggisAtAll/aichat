<script setup lang="ts">
import ChatApi from '@/api/ChatApi'
import { onMounted, ref } from 'vue'
import Chat from '@/components/Chat.vue'

const api = new ChatApi()

const threadId = ref('')

const threads = ref<string[]>([])

onMounted(() => {
  getAllThreads()
})
async function createThread() {
  const response = await api.createThread()
  threadId.value = response.data
  getAllThreads()
}

async function getAllThreads() {
  const response = await api.getAllThreads()
  threads.value = response.data
}
</script>

<template>
  <main>
    <div class="container border">
      <h1>Chat</h1>
      <button class="btn" @click="createThread()">Create new Thread</button>
    </div>
    <div class="container border" v-for="id in threads" :key="id">
      <span>Thread {{ id }}</span>
      <Chat :thread-id="id" />
    </div>
  </main>
</template>

<style scoped></style>
