<script setup lang='ts'>

import { graphql } from '@/gql'
import { useMutation } from '@vue/apollo-composable'
import Editor from '@/components/markdown/editor.vue'
import { ref } from 'vue'
import Switch from '@/components/headlessui/switch.vue'

const gql = graphql(`
    mutation createNewEvent($input: EventInput!) {
        createEvent(input: $input) {
            title
            location
            type
            description
            startDate
            endDate
            maxAttendees
            openToGuests
        }
    }
`)
const { mutate } = useMutation(gql)
const body = ref('')

const editorViewMode = ref(false)

</script>

<template>
  <h2>Create new event</h2>
  <FormKit
    type='form'
  >
    <FormKit
      type='text'
      name='title'
      label='Titel'
      validation='required|length:3'
    />
    <FormKit
      type='text'
      name='location'
      label='Locatie'
      validation='required|length:3'
    />
    <div>
      Preview
      <Switch
        v-model='editorViewMode'
        screenReader='Toggle editor mode'
      />
    </div>
    <editor
      :view='editorViewMode? "viewer" : "editor"'
      @update='body = $event'
      placeholder='Beschrijving'
    />


  </FormKit>

</template>

<style scoped>

</style>
