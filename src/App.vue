<script setup lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://localhost:5010/graphql',
})
provide(DefaultApolloClient, apolloClient)
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
