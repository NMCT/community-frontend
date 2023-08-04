<script setup lang='ts'>

import { graphql } from '@/gql'
import { userStore } from '@/store/stores.ts'
import { useQuery } from '@vue/apollo-composable'
import { watch, computed, ref } from 'vue'

const uid = userStore.firebaseUser?.uid

const query = graphql(
  `query getUser($id: String!) {
    user(uid: $id) {
      id
      profilePictureUri
      email
      username
      socials {
        discord
        facebook
        instagram
        linkedIn
      }
      firebaseId
       }
  }`,
)
const edit = ref(true)
const { result, loading, error } = useQuery(
  query,
  {
    id: uid!,
  },
)
watch(result, () => {
  console.log(result.value)
})

const profilePictureUri = computed(() => {
  return result.value.user.profilePictureUri ?? 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
})


</script>

<template>
  <div>My Account</div>

  <div>
    <div>Account details</div>
    <button @click='edit = !edit'>
      {{ edit ? 'Save' : 'Edit' }}
    </button>

    <div v-if='loading'>
      <font-awesome-icon icon='spinner' spin />
    </div>
    <div v-else-if='result && !edit'>
      <div>
        {{ result.user.username ?? 'No username' }}
      </div>
      <div>
        {{ result.user.email }}
      </div>
      <img :src='profilePictureUri' alt='Your profile picture' class='rounded-full w-24 h24'>
      <div v-for='socialKey in result.user.socials' :key='result.user.socials[socialKey]'>
        <div>
          {{ socialKey }}
        </div>
        <div>
          {{ result.user.socials[socialKey] }}
        </div>
      </div>
    </div>
    <div v-if='edit == true'>
      <div>Editing...</div>
      <FormKit
        type='form'
      >
        <div>{{ result?.user?.email?? "" }}</div>
        <FormKit
          type='text'
          name='username'
          label='Username'
        />
        <FormKit
          type='text'
          name='Discord'
          label='Discord'
          :value='result?.user?.socials?.discord?? ""'
        />
        <FormKit
          type='text'
          name='Facebook'
          label='Facebook'
          :value='result?.user?.socials?.facebook?? ""'/>
        <FormKit
          type='text'
          name='Instagram'
          label='Instagram'
          :value='result?.user?.socials?.instagram?? ""'/>
        <FormKit
          type='text'
          name='LinkedIn'
          label='LinkedIn'
          :value='result?.user?.socials?.linkedIn?? ""'/>

      </FormKit>
    </div>

  </div>


</template>

<style scoped>

</style>
