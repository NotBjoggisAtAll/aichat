<script setup lang="ts">
import ChatApi from '@/api/ChatApi';
import type Message from '@/resource/Message';
import { onMounted, ref } from 'vue';

const messages = ref<Message[]>([])

const messageToSend = ref<string>('')

async function getAllMessages() {
  const api = new ChatApi()
  const response = await api.getMessages(props.threadId)
  messages.value = response.data
}

onMounted(() => {
  getAllMessages()
})

async function sendMessage() {
    const api = new ChatApi()
    const message = messageToSend.value
    messageToSend.value = ''
    messages.value.push({id: "1", threadId: props.threadId,  message: message, isBot: false})
    console.log("Sending message: " + message)
    const response = await api.sendMessage({message: message, threadId: props.threadId})
    console.log("Received response: " + response.data)
    messages.value.push(response.data)
}

const props = defineProps({
  threadId: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="container">
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
</style>
