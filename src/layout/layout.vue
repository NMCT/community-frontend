<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase.ts'

const { logout } = useFirebase()
const router = useRouter()

const clickLogout = () => {
  console.log('logout')
  router.push('/logout')
}
</script>

<template>
  <div>
    <header>Header Here</header>
    <button @click="clickLogout">Log out</button>

    <slot></slot>
    <footer>Footer Here</footer>
  </div>
</template>

<style scoped></style>
