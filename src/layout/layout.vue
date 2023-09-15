<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase.ts'
import { ref, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { LucideMenu } from 'lucide-vue-next'

const { width } = useWindowSize()

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
      highLight?: boolean
      isHidden?: boolean
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
    meta: {
      isHidden: true,
    },
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
      navigation.value.account.path = '/account/general'
      if (navigation.value.events.meta) {
        navigation.value.events.meta.isHidden = false
      }
    } else {
      if (navigation.value.events.meta) {
        navigation.value.events.meta.isHidden = true
      }
      navigation.value.account.name = 'Login'
      navigation.value.account.path = '/login'
    }
  },
  { deep: true, immediate: true },
)

const isMenuOpen = ref<boolean>(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="font-sans">
    <header
      class="font-title font-400 mx8 my-4 flex items-center justify-between text-neutral-700"
    >
      <!--      Title -->
      <h1>
        <router-link to="/">MCT Community</router-link>
      </h1>

      <!--      Navigation -->

      <ul
        class="flex items-center justify-end gap-16 text-lg"
        v-if="width > 800"
      >
        <li
          v-for="nav in navigation"
          :key="nav.name"
          :class="{
            'text-primary-500': nav.meta?.highLight,
          }"
        >
          <router-link :to="nav.path">{{ nav.name }}</router-link>
        </li>
      </ul>
      <div v-else>
        <!--        Todo: mobile nav-->
        <LucideMenu @click="toggleMenu" />
      </div>
      <div v-if="isMenuOpen">
        <!-- darker shade when menu is open -->
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
        <!-- menu itself -->
        <div class="fixed inset-y-0 right-0 w-64 bg-white">
          <div class="flex justify-end">
            <LucideMenu @click="toggleMenu" class="mr-4 mt-4" />
          </div>
          <ul class="flex flex-col items-center justify-center gap-16 text-lg">
            <li
              v-for="nav in navigation"
              :key="nav.name"
              :class="{
                'text-primary-500': nav.meta?.highLight,
              }"
            >
              <router-link :to="nav.path">{{ nav.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <button @click="clickLogout" v-if="false">Log out</button>

    <div class="pb-4">
      <slot></slot>
    </div>
    <footer class="fixed inset-x-0 bottom-0">
      <div class="flex flex-row">
        <div class="bg-tertiary-500 h-2 w-full"></div>
        <div class="bg-primary-500 h2 w-full"></div>
        <div class="bg-secondary-500 h2 w-full"></div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
