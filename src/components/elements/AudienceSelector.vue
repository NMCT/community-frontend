<script setup lang="ts">
import useAudiences from '@/composables/useAudiences';

const {audiences} = useAudiences();

defineEmits(["change"])
</script>

<template>
  <select @change="(e: any) => $emit('change', e.target?.value)">
    <option value="" selected>All</option>
    <option v-for="audience in audiences" :key="audience" :value="audience">
      {{ audience }}
    </option>
  </select>
</template>

<style scoped></style>
