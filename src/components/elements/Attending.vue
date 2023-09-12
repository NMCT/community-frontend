<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { useMutations } from '@/composables/useMutations.ts'
import CtaBold from '@/components/elements/CtaBold.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  isAttending: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const { firebaseUser } = useFirebase()
const {
  attendEvent: attendEventMutation,
  unattendEvent: UnattendEventMutation,
} = useMutations()

const attendEvent = async () => {
  if (!firebaseUser.value) return
  const res = await attendEventMutation({
    eventId: props.id,
  })
}

const unattendEvent = async () => {
  if (!firebaseUser.value) return
  const res = await UnattendEventMutation({
    eventId: props.id,
  })
}
</script>

<template>
  <cta-bold @click="() => (isAttending ? unattendEvent() : attendEvent())">
    {{ !isAttending ? 'Attend Event' : 'Attending' }}
  </cta-bold>
</template>

<style scoped></style>
