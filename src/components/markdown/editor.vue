<script setup lang="ts">
import { marked } from 'marked'
import { computed, ref, watch } from 'vue'
import { debounce } from 'lodash'

const props = defineProps({
  input: {
    type: String,
    required: false,
  },
  view: {
    type: String,
    required: false,
    default: 'editor',
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
})
const emits = defineEmits(['update', 'updateInput'])
const update = debounce((e: any) => {
  input.value = e.target.value
  emits('updateInput', input.value)
}, 100)

const input = ref(props.input ?? '')
const output = computed(() =>
  marked(input.value, {
    gfm: true,
    breaks: true,
    smartLists: true,
    headerIds: false,
    mangle: false,
  }),
)
watch(output, () => {
  emits('update', output.value)
})
</script>

<template>
  <div>
    <div class="label" v-if="label">
      <strong>{{ label }}</strong>
    </div>
    <div class="editor" v-if="view === 'editor'">
      <textarea
        class="w-full"
        name="input"
        :value="input"
        @input="update"
        :placeholder="placeholder"
      ></textarea>
    </div>
    <div
      class="output border-3 rounded-2 b-neutral-300 px-6 py-4"
      v-html="output"
      v-else-if="view === 'viewer'"
    ></div>
  </div>
</template>

<style scoped></style>
