<script setup lang='ts'>

import { graphql } from '@/gql'
import { useMutation } from '@vue/apollo-composable'
import Editor from '@/components/markdown/editor.vue'
import { onMounted, ref } from 'vue'
import Switch from '@/components/headlessui/switch.vue'
import { useFirebase } from '@/hooks/useFirebase.ts'

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

const {getUserType} = useFirebase()

const userType = ref<string | undefined>()
onMounted(async () => {
  userType.value = await getUserType()
})

</script>
<!--todo: submit-->
<template>
  <h2>Create new event</h2>

  <FormKit
    type='form'
    v-if='userType !== "Guest"'
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
      label='Beschrijving'
      :view='editorViewMode? "viewer" : "editor"'
      @update='body = $event'
      placeholder='Beschrijving'
    />
    <div v-if='userType === "Admin"'>
      <FormKit
        type='radio'
        label='Evenement type'
        :options='["Officieel", "Community"]'
        help='Officieel: Evenementen georganiseerd door de school. Community: Evenementen georganiseerd door de community.'
        />
    </div>
    <FormKit
      type='datetime-local'
      name='startDate'
      label='Start datum'
      validation='required|date_after'
    />
    <FormKit
      type='datetime-local'
      name='endDate'
      label='Eind datum'
      validation='required|date_after'
    />
    <FormKit
      type='number'
      name='maxAttendees'
      label='Maximale aantal deelnemers'
      validation='required|number'
      min='1'
      max='1000'
    />
    <FormKit
      type='checkbox'
      name='openToGuests'
      label='Open voor gasten'
      help='Sta toe om niet-Howest-studenten toe te laten tot het evenement'
    />
  </FormKit>
  <div v-else>
    <p>Je hebt geen rechten om een evenement aan te maken</p>
  </div>

</template>

<style scoped>

</style>
