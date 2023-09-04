import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import Home from '@/pages/index.vue'
import Login from '@/pages/auth/login.vue'
import { userStore } from '@/store/stores.ts'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useFirebase } from '@/hooks/useFirebase.ts'
const {logout} = useFirebase();

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/auth/register.vue'),
    },
    {
      path: '/password-reset',
      name: 'PasswordReset',
      component: () => import('@/pages/auth/passwordReset.vue'),
    },
    {
      path: '/account',
      name: 'Account',
      children: [
        {
          path: '',
          name: 'AccountHome',
          component: () => import('@/pages/account/index.vue'),
        }
      ]

    },
    {
      path: '/new',
      name: 'New',
      component: () => import('@/pages/new.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/pages/404.vue'),
    },
  ],
})


const allowedRoutes = ['Login', 'Register', 'PasswordReset', '404']
const allowedPaths = ['/login', '/register', '/password-reset', '/new', '/logout']
router.beforeEach((to, _, next) => {
    if (!to.name) {
        next({ name: '404' })
        return
    }
    if (to.path == "/logout"){
        logout();
        next({name: "Login"})
        return
    }
    if (userStore.firebaseUser === null && !allowedRoutes.includes(to.name.toString())) {
        next({ name: 'Login' })
        return
    } else if (userStore.firebaseUser !== null && to.name === 'Login') {
        next({ name: 'Home' })
        return
    } else next()
})

