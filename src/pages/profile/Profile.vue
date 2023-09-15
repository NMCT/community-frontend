
<script setup lang="ts">
import { graphql } from '@/gql'
import { useQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

const gql = graphql(`
  query getUserById($uid: String!) {
    user(uid: $uid) {
      firebaseId
      email
      profilePictureUri
      username
      socials {
        discord
        facebook
        instagram
        linkedIn
      }
    }
  }
`)

const { currentRoute } = useRouter()
const uid = currentRoute.value.params['id']
console.log(uid)

const {
  result,
  loading,
  error,
} = useQuery(gql, {
  uid: uid,
})

</script>

<template>
<div v-if="loading"></div>
  <div v-if="result">
    <img :src="result.user.profilePictureUri" class="card-img-top"/>
    <div>
      <h1>{{ result.user.username }}</h1>
      <p>{{ result.user.email }}</p>
      <p>
        <ul>
          <li v-for="(social, platform) in result.user.socials">
            {{ platform }} {{ social }}
          </li>
        </ul>
      </p>
    </div>
  </div>
</template>
