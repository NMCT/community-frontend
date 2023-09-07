import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/events/index.vue'
import Login from '@/pages/auth/login.vue'
import { useFirebase } from '@/composables/useFirebase.ts'

const { logout, firebaseUser } = useFirebase()

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
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/events',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: routes.events,
          component: Home,
        },
        {
          path: ':id',
          name: 'eventById',
          component: () => import('@/pages/events/Details.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: routes.login,
      component: Login,
      meta: {
        requiresAuth: false,
        avoidAuth: true,
      },
    },
    {
      path: '/register',
      name: routes.register,
      component: () => import('@/pages/auth/register.vue'),
      meta: {
        requiresAuth: false,
        avoidAuth: true,
      },
    },
    {
      path: '/password-reset',
      name: routes.passwordReset,
      component: () => import('@/pages/auth/passwordReset.vue'),
      meta: {
        requiresAuth: false,
        avoidAuth: false,
      },
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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/new',
      name: routes.new,
      component: () => import('@/pages/new.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: routes.notFound,
      component: () => import('@/pages/404.vue'),
      meta: {
        requiresAuth: false,
      },
    },
  ],
})

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
  if (firebaseUser.value === null && to.meta.requiresAuth) {
    next({ name: routes.login })
    return
  } else if (firebaseUser.value !== null && to.meta.avoidAuth) {
    next({ name: routes.events })
    return
  } else next()
})
