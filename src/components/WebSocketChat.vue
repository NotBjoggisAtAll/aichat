<template>
  <form @submit.prevent="sendMessage()">
    <!-- <div v-for="m in messages" :key="m">
      <br />
      <p>{{ m }}</p>
    </div> -->
    <p> {{ messagesCombined }}</p>
    <input type="text" v-model="message" placeholder="Type a message" />
    <button>Submit</button>
  </form>
  <button class="btn">Active</button>
</template>

<script setup lang="ts">
import { Client } from '@stomp/stompjs';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const host = window.location.host

const brokerURL = import.meta.env.DEV ? `ws://${host}/ws` : `wss://${host}/ws`

const client = new Client({
  brokerURL: brokerURL,
  logRawCommunication: true,
  onConnect: (frame) => {
    console.log('Connected')
    const url = JSON.stringify(client.webSocket)
    console.log(`Connected to: ${url}`)
    console.log(JSON.stringify(frame))
    
    client.subscribe('/user/queue/response', (message) => {
      messages.value.push('')
      const receivedMessage = JSON.parse(message.body)
      // simulateTyping(receivedMessage.message)
      messages.value.push(receivedMessage.message)

      console.log(`Received: ${message.body}`)
    })
  },
  onStompError: (frame) => {
    console.log(`Broker reported error: ${frame.headers.message}`)
    console.log(`Additional details: ${frame.body}`)
  },
})


const messages = ref<string[]>([])
const message = ref<string>('')
const threadId = ref<number | undefined>(2)

const messagesCombined = computed(() => messages.value.join(''))
function sendMessage() {
  client.publish({
    destination: '/app/hello',
    body: JSON.stringify({ threadId: threadId.value, message: message.value })
  })
  messages.value.push(message.value)
  message.value = ''
}

onMounted(() => {
  client.activate()
})

onUnmounted(() => {
  client.deactivate()
})
</script>
