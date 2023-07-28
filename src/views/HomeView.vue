<script setup lang="ts">
import ChatApi from '@/api/ChatApi'
import { ref } from 'vue'

const api = new ChatApi()

const threadId = ref('')

async function createThread() {
  const response = await api.createThread()
  threadId.value = response.data
}
</script>

<template>
  <main>
    <div class="container border">
      <h1>Chat</h1>
      <button class="btn" @click="createThread">Create new Thread</button>
      <p>Thread ID: {{ threadId }}</p>
    </div>
    <div></div>
  </main>
</template>

<style scoped></style>
