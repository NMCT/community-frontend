import { createApp } from 'vue'

import { defaultConfig, plugin } from '@formkit/vue'
import config from '../formkit.config.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/style.css'
import App from '@/App.vue'

import { useFirebase } from '@/composables/useFirebase.ts'
import { router } from '@/bootstrap/router.ts'
import { useFirstLogin } from '@/composables/useFirstLogin.ts'

const { restoreLogin, MicrosoftLoginResult } = useFirebase()
const { postFirstLogin } = useFirstLogin()

const create = () => {
  postFirstLogin()
  // MicrosoftLoginResult()
  //   .then(user => {
  //     console.log('MicrosoftLoginResult', user)
  //   })
  //   .catch(error => {
  //     console.debug('MicrosoftLoginResult error', error)
  //   })

  createApp(App)
    .use(router)
    // .use(plugin, defaultConfig(
    //     theme: 'tailwindcss/genesis',
    // }))
    .use(plugin, defaultConfig(config))
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
}

restoreLogin().then(create)
