<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { useMutations } from '@/composables/useMutations.ts'
import { PropType, ref } from 'vue'
import CtaBold from '@/components/elements/CtaBold.vue'
import Loader from '@/components/elements/Loader.vue'
import { LucideCalendarCheck2, LucideCalendarPlus } from 'lucide-vue-next'

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
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String as PropType<'mobile' | 'desktop'>,
    required: false,
    default: 'desktop',
  },
})

const isLoadingMutation = ref<boolean>(false)
const { firebaseUser } = useFirebase()
const {
  attendEvent: attendEventMutation,
  unattendEvent: UnattendEventMutation,
} = useMutations()

const attendEvent = async () => {
  isLoadingMutation.value = true
  if (!firebaseUser.value) return
  const res = await attendEventMutation({
    eventId: props.id,
  })
  setTimeout(() => {
    isLoadingMutation.value = false
  }, 500)
}

const unattendEvent = async () => {
  isLoadingMutation.value = true
  if (!firebaseUser.value) return
  const res = await UnattendEventMutation({
    eventId: props.id,
  })
  setTimeout(() => {
    isLoadingMutation.value = false
  }, 500)
}
</script>

<template>
  <CtaBold
    v-if="type == 'desktop'"
    @click="() => (isAttending ? unattendEvent() : attendEvent())"
  >
    <Loader v-if="isLoading || isLoadingMutation" />

    <div v-else class="flex flex-row items-center gap-4">
      <LucideCalendarPlus v-if="!isAttending" />
      <LucideCalendarCheck2 v-else />
      {{ !isAttending ? 'Attend' : 'Attending' }}
    </div>
  </CtaBold>

  <button v-else @click="() => (isAttending ? unattendEvent() : attendEvent())">
    <Loader v-if="isLoading || isLoadingMutation" />
    <div v-else class="flex flex-row items-center justify-center gap-4">
      <LucideCalendarPlus v-if="!isAttending" />
      <LucideCalendarCheck2 v-else />
      {{ !isAttending ? 'Attend' : 'Attending' }}
    </div>
  </button>
</template>

<style scoped></style>
