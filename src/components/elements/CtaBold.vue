<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <button
    class="bg-primary-500 rounded-2 border-3 flex items-center justify-start gap-4 border-neutral-300 px-6 py-2 text-lg text-white"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped></style>
