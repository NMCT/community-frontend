<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { EventInput } from '@/gql/graphql.ts'
import { ref, watch } from 'vue'
import { useFirebase } from '@/composables/useFirebase.ts'

const { firebaseUser } = useFirebase()

console.log(firebaseUser.value?.uid)

const { result, loading, error } = useQuery(
  graphql(`
    query getEvents {
      events {
        items {
          id
          title
          location
        }
      }
    }
  `),
)
console.log(result)

const input = ref<EventInput | null>(null)
const token = ref<string>()

if (!firebaseUser.value) throw new Error()

watch(token, async () => {
  console.log('your token', token.value)
})
</script>

<template>
  <div v-if="loading">...</div>
  <ul v-else-if="result && result.events && !error">
    <li v-for="event of result.events.items" :key="event.id">
      {{ event.title }} {{ event.location }}
    </li>
  </ul>
</template>

<style scoped></style>
