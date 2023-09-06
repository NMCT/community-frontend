<script setup lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import Layout from '@/layout/layout.vue'
import { useApolloClient } from '@/composables/useApolloClient.ts'
const { apolloClient } = useApolloClient()
provide(DefaultApolloClient, apolloClient)
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<style scoped></style>
