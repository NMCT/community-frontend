import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import App from '@/App.vue'
import { userStore } from './store/stores.ts'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useFirebase } from '@/hooks/useFirebase.ts'
import Home from '@/pages/index.vue'
import Login from '@/pages/auth/login.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faSpinner)

const {logout} = useFirebase();


const router = createRouter({
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
          component: () => import('./pages/account/index.vue'),
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
      component: () => import('./pages/404.vue'),
    },
  ],
})

const allowedRoutes = ['Login', 'Register', 'PasswordReset', '404']

router.beforeEach((to, _, next) => {
  if (!userStore.firebaseUser){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userStore.firebaseUser = user;
      } else {
        userStore.firebaseUser = null;
      }
      navigate(to, next)
    });
  }
  else{
    navigate(to, next)
  }
  console.debug('navigating to', to.path)

})

const navigate = async(to: RouteLocationNormalized, next: NavigationGuardNext) => {
  console.log("Navigating To", to.path)
  if (!to.name) {
    next({ name: '404' })
    return
  }
  if (to.path == "/logout"){
    await logout();
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
}

createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  // .use(plugin, defaultConfig({
  //     theme: 'tailwindcss/genesis',
  // }))
  .use(plugin, defaultConfig(config))
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
