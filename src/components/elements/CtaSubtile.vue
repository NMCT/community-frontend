<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <button
    class="text-secondary-700 font-title underline"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped></style>
