<script setup lang="ts">
import { ref } from 'vue'

const audiences = ref<string[]>([
  '1MCT',
  '2MCT',
  '3MCT',
  'MCT',
  'AI',
  'Next Web',
  'XR',
  'IOT',
])
defineEmits()
</script>

<template>
  <select @change="e => $emit('change', e.target.value)">
    <option value="" selected>All</option>
    <option v-for="audience in audiences" :key="audience" :value="audience">
      {{ audience }}
    </option>
  </select>
</template>

<style scoped></style>
