<script setup lang="ts">
import ChatApi from '@/api/ChatApi'
import type Message from '@/resource/Message'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const messages = ref<Message[]>([])

const route = useRoute()

const threadId = computed(() => route.params.threadId as string)

watch(threadId, () => {
  getAllMessages()
})
const messageToSend = ref<string>('')

async function getAllMessages() {
  const api = new ChatApi()
  const response = await api.getMessages(threadId.value)
  messages.value = response.data.reverse()
}

onMounted(async () => {
  await getAllMessages()
})

async function sendMessage() {
  const api = new ChatApi()
  const message = messageToSend.value
  messageToSend.value = ''
  messages.value.unshift({ id: '1', threadId: threadId.value, message: message, isBot: false })
  console.log('Sending message: ' + message)
  const response = await api.sendMessage({ message: message, threadId: threadId.value })
  console.log('Received response: ' + response.data)
  messages.value.unshift(response.data)
}

</script>

<template>
  <div ref="el" class="chat-container container">
    <div class="chat-message" :class="message.isBot ? 'right' : 'left'" v-for="message in messages">
      <p>{{ message.message }}</p>
    </div>
  </div>
  <form @submit.prevent="sendMessage()" class="flex chat-input">
    <input class="flex-fill p-1" v-model="messageToSend" type="text" />
    <button class="btn">Send</button>
  </form>
</template>

<style scoped>
.chat-message {
  padding: 1rem;
  margin: 1rem;
  background-color: lightblue;
  border-radius: 1rem;
  width: 40%;
}
.right {
  text-align: right;
  align-self: flex-end;
}
.left {
  text-align: left;
}
.container {
  min-height: 20rem;
  flex-direction: column-reverse;
  max-height: 80vh;
  border: 1px solid black;
  overflow-y: auto;
}
</style>
