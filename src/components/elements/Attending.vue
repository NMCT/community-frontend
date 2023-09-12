<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { useMutations } from '@/composables/useMutations.ts'

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
  <div class="text-pink">Isattending: {{ isAttending }}</div>
  <button @click="() => (isAttending ? unattendEvent() : attendEvent())">
    {{ !isAttending ? 'Attend Event' : 'Attending' }}
  </button>
</template>

<style scoped></style>
