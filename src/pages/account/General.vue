<script setup lang="ts">
import { useFirebase } from '@/composables/useFirebase.ts'
import { ref, watch } from 'vue'
import { useMutations } from '@/composables/useMutations.ts'
import { useWindowSize } from '@vueuse/core'

const { changeUserName } = useMutations()
const { firebaseUser, changePassword, validatePassword, changeProfilePicture } =
  useFirebase()
const isChangingPassword = ref<boolean>(false)
const passwordChangedSuccessfully = ref<boolean>(false)
const isChangingUsername = ref<boolean>(false)
const usernameChangedSuccessfully = ref<boolean>(false)
const isHoveringProfilePicture = ref<boolean>(false)
const isFocusProfilePicture = ref<boolean>(false)
const { width } = useWindowSize()
const uid = firebaseUser.value?.uid
const email = firebaseUser.value?.email
const emailVerified = firebaseUser.value?.emailVerified
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
  if (!file) return
  changeProfilePicture(file)
}
</script>

<template>
  <div class="mx-4 my-4 lg:w-full">
    <div class="font-title pb-4 text-lg">General</div>
    <div>
      <div class="b-b-1 b-neutral-400 justify-between pb-2 lg:flex lg:w-full">
        <div>
          <h3 class="text-lg font-medium">Email address</h3>
        </div>
        <p>{{ email }}</p>
      </div>
      <div v-if="!isMicrosoftUser" class="b-neutral-400 b-b-1 mt-4 pb-2">
        <div class="justify-between lg:flex">
          <div>
            <h3 class="font-medium">Password</h3>
            <p>Set a unique password to secure your account</p>
          </div>
          <button
            @click="() => (isChangingPassword = true)"
            v-if="!isChangingPassword"
            :class="{
              underline: width < 1024,
            }"
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
        <div class="justify-between lg:flex">
          <div>
            <h3 class="text-lg font-medium">Username</h3>
          </div>
          <div class="lg:text-right">
            <div>{{ firebaseUser?.displayName ?? 'No username' }}</div>
            <button
              v-if="!isMicrosoftUser && !isChangingUsername"
              @click="() => (isChangingUsername = true)"
              :class="{
                underline: width < 1024,
              }"
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
          <div class="text-lg font-medium">Your profile picture</div>
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
