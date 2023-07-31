import { createApp } from 'vue'
import './style.css'
import Login from '@/pages/auth/login.vue'
import Home from '@/pages/index.vue'
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import App from '@/App.vue'
import { userStore } from './store/stores.ts'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
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
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('./pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const allowedRoutes = ['Login', 'Register', 'PasswordReset', '404']

router.beforeEach((to, _, next) => {
  if (!userStore.user){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userStore.user = user;
      } else {
        userStore.user = null;
      }
      navigate(to, next)
    });
  }
  else{
    navigate(to, next)
  }
  console.debug('navigating to', to.path)

})

const navigate = (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (!to.name) {
    next({ name: '404' })
    return
  }
  if (userStore.user === null && !allowedRoutes.includes(to.name.toString())) {
    next({ name: 'Login' })
  } else if (userStore.user !== null && to.name === 'Login') {
    next({ name: 'Home' })
  } else next()
}

createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  // .use(plugin, defaultConfig({
  //     theme: 'tailwindcss/genesis',
  // }))
  .use(plugin, defaultConfig(config))
  .mount('#app')
