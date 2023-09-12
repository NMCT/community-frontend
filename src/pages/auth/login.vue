<script setup lang="ts">
import GuestLogin from '@/components/Login/GuestLogin.vue'
import MicrosoftLogin from '@/components/Login/MicrosoftLogin.vue'
</script>

<template>
  <div class="grid min-h-full place-items-center">
    <div class="b-3 b-neutral-300 rounded-2 min-w-md p-6">
      <h2 class="font-title mb-4 text-lg">Lorem ipsum dolor sit amet</h2>
      <GuestLogin />
      <MicrosoftLogin />
    </div>
  </div>
</template>

<style scoped></style>
