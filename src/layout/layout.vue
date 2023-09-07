<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase.ts'
import { ref, watch } from 'vue'

const { firebaseUser } = useFirebase()
const router = useRouter()

const clickLogout = () => {
  console.log('logout')
  router.push('/logout')
}

interface INavigation {
  [key: string]: {
    name: string
    path: string
    meta?: {
      highLight: boolean
    }
  }
}

const navigation = ref<INavigation>({
  home: {
    name: 'Home',
    path: '/',
  },
  events: {
    name: 'Events',
    path: '/events',
  },
  about: {
    name: 'About',
    path: '/about',
  },
  account: {
    name: 'Login',
    path: '/login',
    meta: {
      highLight: true,
    },
  },
})

watch(
  firebaseUser,
  () => {
    if (firebaseUser.value) {
      navigation.value.account.name =
        firebaseUser.value.displayName ?? 'Account'
      navigation.value.account.path = '/account'
    } else {
      navigation.value.account.name = 'Login'
      navigation.value.account.path = '/login'
    }
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div class="font-sans">
    <header
      class="font-title font-400 mx8 mt-4 flex items-center justify-between text-neutral-700"
    >
      <!--      Title -->
      <div>MCT Community</div>

      <!--      Navigation -->

      <ul class="flex items-center justify-end gap-16 text-lg">
        <li
          v-for="nav in navigation"
          :key="nav.name"
          :class="nav.meta?.highLight ? 'text-primary-500' : ''"
        >
          <router-link :to="nav.path">{{ nav.name }}</router-link>
        </li>
      </ul>
    </header>

    <button @click="clickLogout" v-if="false">Log out</button>

    <slot></slot>
    <footer>Footer Here</footer>
  </div>
</template>

<style scoped></style>
