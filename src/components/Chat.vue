<script setup lang="ts">
import ChatApi from '@/api/ChatApi'
import type Message from '@/resource/Message'
import hljs from 'highlight.js'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Loader from './Loader.vue'

const messages = ref<Message[]>([])
const styledMessages = computed(() => {
  return messages.value.map((message) => {
    return {
      ...message,
      message: () => {
        // find text between 3 backticks. Remove the first word after the backticks that is used to indicate the language
        const regex = /```(.*)```/s
        const messages = message.message.split(regex)
        return messages
          .map((message, index) => {
            if (index % 2 === 0) {
              return message
            } else {
              return `<div class="code-block"><pre><code>${
                hljs.highlightAuto(message).value
              }</code></pre></div>`
            }
          })
          .join('')
      }
    }
  })
})

const isLoading = ref<boolean>(true)

const route = useRoute()

const threadId = computed(() => route.params.threadId as string)

watch(threadId, () => {
  getAllMessages()
})
const messageToSend = ref<string>('')

async function getAllMessages() {
  isLoading.value = true
  const api = new ChatApi()
  const response = await api.getMessages(threadId.value)
  response.data.messages.map((message) => {
    messages.value.push({message: message.message, isBot:false, id: '1', threadId: threadId.value})
  })
  isLoading.value = false
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
  <div class="container" v-if="isLoading">
    <Loader style="margin: auto" />
  </div>

  <div v-else>
    <div class="chat-container container">
      <div
        class="chat-message"
        :class="message.isBot ? 'left' : 'right'"
        v-for="message in styledMessages"
      >
        <p v-html="message.message()" />
      </div>
    </div>
  </div>
  <form @submit.prevent="sendMessage()" class="flex chat-input">
    <input class="flex-fill mr-1" v-model="messageToSend" type="text" />
    <button class="btn">Send</button>
  </form>
</template>

<style scoped>
.chat-message {
  padding: 1rem;
  margin: 1rem;
  background-color: var(--color-background-mute);
  border-radius: 1rem;
  width: 80%;
}

input {
  background-color: var(--color-background-mute);
  color: var(--color-text);
  border-color: var(--color-background-soft);
  font-size: 1rem;
}
.right {
  /* text-align: right; */
  align-self: flex-end;
}
.left {
  text-align: left;
}
.container {
  flex-direction: column-reverse;
  height: 80vh;
  border: 1px solid black;
  background-color: var(--color-background-soft);
  overflow-y: auto;
}

p {
  color: var(--color-text);
}
</style>
