<template>
  <div class="flex thread-item">
    <router-link class="router-link flex-fill" :to="`/thread/${threadId}`">{{
      threadId
    }}</router-link>
    <button @click="deleteThread()" class="btn btn-delete">
      <span class="material-symbols-outlined"> delete </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import ChatApi from '@/api/ChatApi';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  threadId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['deleteThread'])

const api = new ChatApi()
const route = useRoute()
const router = useRouter()
async function deleteThread() {
  await api.deleteThread(props.threadId)
  if (route.params.threadId === props.threadId) {
    router.push({ name: 'home' })
  }
  emit('deleteThread')
}
</script>

<style scoped>
span {
  margin: auto;
  font-size: 1.5rem;
}

.router-link {
  text-decoration: none;
  font-size: 0.9rem;
  margin: auto;
  color: var(--color-text);
  padding: 0.3rem;
}

.router-link-exact-active {
  background-color: var(--color-active);
}

.thread-item {
  background-color: var(--color-background-mute);
}
.thread-item:hover {
  background-color: var(--color-hover);
}

button {
  padding: 0.5rem;
}

button-delete {
  justify-self: center;
  align-self: center;
}
</style>
