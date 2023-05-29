<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useIndexesStore } from '@/store/indexes.store'
const store = useIndexesStore()
store.getIndexes()
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
