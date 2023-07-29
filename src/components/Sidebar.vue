<template>
  <nav class="sidebar">
    <h1>Threads</h1>
    <ul class="container border">
      <li v-for="thread in threads" :key="thread">
        <router-link :to="`/thread/${thread}`">{{ thread }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import ChatApi from '@/api/ChatApi'
import { onMounted, ref, type PropType } from 'vue'

const api = new ChatApi()

const threads = ref<string[]>([])

onMounted(async () => {
  const response = await api.getAllThreads()
  threads.value = response.data
})
</script>


<style scoped>
li {
    list-style: none;
    border-radius: 1.5rem;
    margin: 0.5rem 0;
    background-color: greenyellow;
    
}
a {
    background-color: greenyellow;
    padding: 0.5rem;
  
    color:black;
}
</style>
