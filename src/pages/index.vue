<script setup lang='ts'>
import { useMutation, useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { EventInput } from '@/gql/graphql.ts'

const { result, loading, error } = useQuery(
  graphql(
      `
       query getEvents {
            events{
            items {
               id,
               title,
               location,
            }
          }
       }`),
)
console.log(result)

const input : EventInput = {

}

const { mutate } = useMutation(graphql(`mutation createEvent ($input: EventInput!){
    createEvent(input: $input){
    id
    }
}`), () => ({
  variables: {
    input: input
  }
}))


</script>

<template>
<div v-if='loading'>
  ...
</div>
  <ul v-else-if='result && result.events && !error'>
    <li v-for='event of result.events.items' :key='event.id'>
      {{event.title}} {{event.location}}
    </li>
  </ul>

</template>

<style scoped></style>
