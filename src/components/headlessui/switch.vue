<script setup lang="ts">
import { Switch } from '@headlessui/vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },

  screenReader: {
    type: String,
    required: false,
    default: 'Toggle',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <Switch
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :class="modelValue ? 'bg-blue-600' : 'bg-gray-200'"
    class="relative inline-flex h-6 w-11 items-center rounded-full"
  >
    <span class="sr-only">{{ screenReader }}</span>
    <span
      :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
      class="inline-block h-4 w-4 transform rounded-full bg-white transition"
    />
  </Switch>
</template>

<style scoped></style>
