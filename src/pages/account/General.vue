<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { ref, watch } from 'vue'
import { useMutations } from '@/composables/useMutations.ts'

const { changeUserName } = useMutations()
const { firebaseUser, changePassword, validatePassword, changeProfilePicture } =
  useFirebase()
const isChangingPassword = ref<boolean>(false)
const passwordChangedSuccessfully = ref<boolean>(false)
const isChangingUsername = ref<boolean>(false)
const usernameChangedSuccessfully = ref<boolean>(false)
const isHoveringProfilePicture = ref<boolean>(false)
const isFocusProfilePicture = ref<boolean>(false)

const uid = firebaseUser.value?.uid
const email = firebaseUser.value?.email
const emailVerified = firebaseUser.value?.emailVerified
console.log(firebaseUser.value)

console.log(uid)
if (!uid) throw new Error('no uid')

const isMicrosoftUser =
  firebaseUser.value?.providerData[0].providerId === 'microsoft.com'

const errors = ref<string[] | undefined>(undefined)
const resetPassword = (e: any) => {
  validatePassword(e['old-password'])
    .then(() => {
      changePassword(e['new-password'])
      isChangingPassword.value = false
      passwordChangedSuccessfully.value = true
    })
    .catch(e => {
      console.log(e)
      errors.value = [e.message]
    })
}
watch(passwordChangedSuccessfully, () => {
  setTimeout(() => {
    passwordChangedSuccessfully.value = false
  }, 5000)
})
watch(usernameChangedSuccessfully, () => {
  setTimeout(() => {
    usernameChangedSuccessfully.value = false
  }, 5000)
})

const changeUsername = async (e: any) => {
  console.log(e)
  const username = e.username
  changeUserName({ username }).then(e => {
    console.log('success')
    isChangingUsername.value = false
    usernameChangedSuccessfully.value = true
    // reload firebaseUser
    firebaseUser.value?.reload()
  })
}

const changeProfilePictureEvent = (e: any) => {
  const file = e.target.files[0]
  console.log(file)
  if (!file) return
  changeProfilePicture(file)
}
</script>

<template>
  <div class="mx-4 my-4 w-full">
    <div class="font-title pb-4 text-lg">General</div>
    <div>
      <div class="b-b-1 b-neutral-400 flex w-full justify-between pb-2">
        <div>
          <h3>Email address</h3>
          <p>The email address associated with your account</p>
        </div>
        <p>{{ email }}</p>
      </div>
      <div v-if="!isMicrosoftUser" class="b-neutral-400 b-b-1 mt-4 pb-2">
        <div class="flex justify-between">
          <div>
            <h3>Password</h3>
            <p>Set a unique password to secure your account</p>
          </div>
          <button
            @click="() => (isChangingPassword = true)"
            v-if="!isChangingPassword"
          >
            Change Password
          </button>
        </div>
        <div v-if="isChangingPassword" class="pt-2">
          <FormKit type="form" @submit="resetPassword" :errors="errors">
            <FormKit
              autocomplete="current-password"
              name="old-password"
              type="password"
              label="Old Password"
              placeholder="Old Password"
              rules="required"
            />
            <FormKit
              autocomplete="new-password"
              name="new-password"
              type="password"
              label="Password"
              placeholder="Password"
              rules="required"
            ></FormKit>
          </FormKit>
        </div>
        <div v-if="passwordChangedSuccessfully">
          <p class="font-bold underline">Password changed successfully</p>
        </div>
      </div>
      <div class="b-neutral-400 b-b-1 mt-4 pb-2">
        <div class="flex justify-between">
          <div>
            <h3>Username</h3>
            <div>How people see you</div>
          </div>
          <div class="text-right">
            <div>{{ firebaseUser?.displayName ?? 'No username' }}</div>
            <button
              v-if="!isMicrosoftUser && !isChangingUsername"
              @click="() => (isChangingUsername = true)"
            >
              Change username
            </button>
          </div>
        </div>
        <div v-if="isChangingUsername">
          <FormKit type="form" @submit="changeUsername" :errors="errors">
            <FormKit
              name="username"
              type="text"
              label="Username"
              placeholder="Username"
              rules="required | length:3"
              autocomplete="username"
            />
          </FormKit>
        </div>
        <div v-if="usernameChangedSuccessfully">
          <p class="font-bold underline">Username changed successfully</p>
        </div>
      </div>
      <div class="b-neutral-400 b-b-1 mt-4 flex justify-between pb-2">
        <div>
          <div>Your profile picture</div>
          <div v-if="!isMicrosoftUser" class="font-300 text-sm">
            Hover image to upload file
          </div>
          <div v-else class="font-300 text-sm">
            Change your profile picture on your Microsoft account
          </div>
        </div>
        <input
          type="file"
          id="file-input"
          accept="image/png, image/jpeg"
          class="hidden"
          :disabled="isMicrosoftUser"
          @change="changeProfilePictureEvent"
        />
        <label for="file-input">
          <img
            @mouseenter="
              () => {
                if (!isMicrosoftUser) isHoveringProfilePicture = true
              }
            "
            @mouseleave="isHoveringProfilePicture = false"
            @focusin="
              () => {
                if (!isMicrosoftUser) isFocusProfilePicture = true
              }
            "
            @focusout="isFocusProfilePicture = false"
            :src="
              isHoveringProfilePicture || isFocusProfilePicture
                ? '/upload.svg'
                : firebaseUser?.photoURL ??
                  'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
            "
            alt="Your profile picture"
            class="h16 w-16 rounded-full object-cover"
            :class="{
              'bg-neutral-500':
                isHoveringProfilePicture || isFocusProfilePicture,
              'cursor-pointer': !isMicrosoftUser,
            }"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
