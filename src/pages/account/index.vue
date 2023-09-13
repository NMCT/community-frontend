<script setup lang="ts">
import { graphql } from '@/gql'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import { useFirebase } from '@/composables/useFirebase.ts'
import { Socials, User } from '@/gql/graphql.ts'
import CtaSubtile from '@/components/elements/CtaSubtile.vue'

const { firebaseUser } = useFirebase()

const uid = firebaseUser.value?.uid

const query = graphql(`
  query getUser($id: String!) {
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
  }
`)

const changeSocialsGql = graphql(`
  mutation changeSocials($socials: SocialsInput!) {
    updateSocials(socials: $socials) {
      id
      socials {
        discord
        facebook
        instagram
        linkedIn
      }
    }
  }
`)

const { mutate: changeSocials } = useMutation(changeSocialsGql)

interface iUser {
  user: User
}

const edit = ref(false)
const { result, loading, error } = useQuery<iUser>(query, {
  id: uid!,
})

const user = computed(() => {
  if (result.value) {
    return result.value.user as User
  }
})

const submitForm = async (e: any) => {
  if (e.instagram) {
    e.instagram = e.instagram.replace('@', '')
    e.instagram = e.instagram.replace('https://www.instagram.com/', '')
  }
  if (e.facebook) {
    e.facebook = e.facebook.replace('https://www.facebook.com/', '')
  }

  const socials: Socials = {
    discord: e.Discord ?? '',
    facebook: e.Facebook ?? null,
    instagram: e.Instagram ?? null,
    linkedIn: e.LinkedIn ?? null,
  }
  const username = e.username

  if (socials !== user.value?.socials) {
    await changeSocials({ socials })
  }

  edit.value = false
}

console.log(user, loading)
</script>

<template>
  <div>My Account</div>

  <div>
    <div>Account details</div>
    <button @click="edit = !edit">
      {{ edit ? 'Save' : 'Edit' }}
    </button>

    <!--    Todo: replace with loading icon-->
    <div v-if="loading">Loading...</div>
    <div v-else-if="!edit && user">
      <div>
        {{ user.username ?? 'No username' }}
      </div>
      <div>
        {{ user.email }}
      </div>
      <img
        v-if="user"
        :src="
          user.profilePictureUri ??
          'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
        "
        alt="Your profile picture"
        class="h24 w-24 rounded-full"
      />
    </div>
    <div v-if="edit">
      <div>Editing...</div>
      <FormKit type="form" @submit="submitForm">
        <div>{{ user?.email ?? '' }}</div>
        <FormKit
          type="text"
          name="username"
          label="Username"
          :value="user?.username"
        />
        <FormKit
          type="text"
          name="Discord"
          label="Discord"
          :value="user?.socials?.discord ?? ''"
        />
        <FormKit
          type="text"
          name="Facebook"
          label="Facebook"
          :value="user?.socials?.facebook ?? ''"
        />
        <FormKit
          type="text"
          name="Instagram"
          label="Instagram"
          :value="user?.socials?.instagram ?? ''"
        />
        <FormKit
          type="text"
          name="LinkedIn"
          label="LinkedIn"
          validation="url"
          :value="user?.socials?.linkedIn ?? ''"
        />
      </FormKit>
    </div>
    <RouterLink to="/logout">
      <CtaSubtile> Log uit </CtaSubtile>
    </RouterLink>
  </div>
</template>

<style scoped></style>
