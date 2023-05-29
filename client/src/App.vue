<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useIndexesStore } from '@/store/indexes.store'

const store = useIndexesStore()

onMounted(() => {
  store.getIndexes()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
