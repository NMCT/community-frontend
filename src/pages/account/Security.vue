<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { useUser } from '@/composables/useUser.ts'
import { useQuery } from '@vue/apollo-composable'

const { firebaseUser, changePassword } = useFirebase()
const uid = firebaseUser.value?.uid
const email = firebaseUser.value?.email
const emailVerified = firebaseUser.value?.emailVerified
console.log(firebaseUser.value)

const { getUserQuery } = useUser()
console.log(uid)
if (!uid) throw new Error('no uid')
const { result } = useQuery(getUserQuery, { id: uid })

const isMicrosoftUser =
  firebaseUser.value?.providerData[0].providerId === 'microsoft.com'
</script>

<template>
  <div>security</div>
  <div>
    <div>
      <h3>email address</h3>
      <p>the email address associated with your account</p>
      <p>{{ email }}</p>
    </div>
    <div v-if="!isMicrosoftUser">
      <h3>Password</h3>
      <p>Set a unique password to secure your account</p>
      <button @click="">Change Password</button>
    </div>
  </div>
</template>

<style scoped></style>
