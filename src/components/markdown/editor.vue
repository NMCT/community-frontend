<script setup lang="ts">
import { marked } from 'marked'
import { computed, ref, watch } from 'vue'
import { debounce } from 'lodash'

const update = debounce(e => {
  input.value = e.target.value
}, 100)

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
const emits = defineEmits(['update'])

const input = ref(props.input ?? '# Hello World')
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
  <div class="label" v-if="label">
    <strong>{{ label }}</strong>
  </div>
  <div class="editor" v-if="view === 'editor'">
    <textarea
      name="input"
      :value="input"
      @input="update"
      :placeholder="placeholder"
    ></textarea>
  </div>
  <div class="output" v-html="output" v-else-if="view === 'viewer'"></div>
</template>

<style scoped></style>
