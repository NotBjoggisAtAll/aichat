<script setup lang="ts">
import ChatApi from '@/api/ChatApi';
import { onMounted, ref } from 'vue';

const api = new ChatApi()

const threadId = ref('')

const threads = ref<string[]>([])

onMounted(() => {
  getAllThreads()
})

async function getAllThreads() {
  const response = await api.getAllThreads()
  threads.value = response.data
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Select a thread on the left</h1>
    </div>
  </main>
</template>

<style scoped>
.container {
  margin: auto;
  font-size: 1rem;
  height: 80hv;
  width: 50vh;
}
</style>
