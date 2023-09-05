import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/index.vue'
import Login from '@/pages/auth/login.vue'
import { userStore } from '@/store/stores.ts'
import { useFirebase } from '@/composables/useFirebase'

const { logout } = useFirebase()

export enum routes {
  landing = 'Landing',
  events = 'Home',
  login = 'Login',
  register = 'Register',
  passwordReset = 'PasswordReset',
  account = 'Account',
  accountHome = 'AccountHome',
  new = 'New',
  notFound = '404',
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: routes.landing,
      component: () => import('@/pages/landing.vue'),
    },
    {
      path: '/events',
      name: routes.events,
      component: Home,
    },
    {
      path: '/login',
      name: routes.login,
      component: Login,
    },
    {
      path: '/register',
      name: routes.register,
      component: () => import('@/pages/auth/register.vue'),
    },
    {
      path: '/password-reset',
      name: routes.passwordReset,
      component: () => import('@/pages/auth/passwordReset.vue'),
    },
    {
      path: '/account',
      name: routes.account,
      children: [
        {
          path: '',
          name: routes.accountHome,
          component: () => import('@/pages/account/index.vue'),
        },
      ],
    },
    {
      path: '/new',
      name: routes.new,
      component: () => import('@/pages/new.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: routes.notFound,
      component: () => import('@/pages/404.vue'),
    },
  ],
})

const allowedRoutes: routes[] = [
  routes.login,
  routes.register,
  routes.passwordReset,
  routes.landing,
  routes.notFound,
]
router.beforeEach((to, _, next) => {
  if (!to.name) {
    next({ name: routes.notFound })
    return
  }
  if (to.path == '/logout') {
    logout()
    next({ name: routes.login })
    return
  }
  if (
    userStore.firebaseUser === null &&
    !allowedRoutes.includes(to.name.toString() as routes)
  ) {
    next({ name: routes.login })
    return
  } else if (userStore.firebaseUser !== null && to.name === 'Login') {
    next({ name: routes.events })
    return
  } else next()
})
