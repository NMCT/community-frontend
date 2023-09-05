<script setup lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Layout from '@/layout/layout.vue'
import { useFirebase } from '@/composables/useFirebase.ts'

const { firebaseUser } = useFirebase()

const cache = new InMemoryCache()

const baseUrl = import.meta.env.VITE_BASE_URL
const httpLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
})

const authMiddleware = setContext(async operation => {
  if (!firebaseUser.value) throw new Error('not logged in')
  const token = await firebaseUser.value.getIdToken()
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = ApolloLink.from([authMiddleware, httpLink])

const apolloClient = new ApolloClient({
  cache,
  link: link,
})
provide(DefaultApolloClient, apolloClient)
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<style scoped></style>
