<script setup lang="ts">
import { userStore } from '@/store/stores.ts'

const user = userStore
console.log('user', user)
</script>

<template>
  <div>Home</div>
</template>

<style scoped></style>
