<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useChatStore } from '@/store/chats.store'
import { onMounted } from 'vue'

onMounted(() => {
  const store = useChatStore()
  store.getChats()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
