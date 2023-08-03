<script setup lang='ts'>
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, ApolloLink, concat, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { userStore } from '@/store/stores.ts'
import Layout from '@/layout/layout.vue'

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: 'http://localhost:5010/graphql',
})

const authMiddleware = setContext(async (operation) => {
  if (!userStore.firebaseUser) throw new Error('not logged in')
  const token = await userStore.firebaseUser.getIdToken()
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
