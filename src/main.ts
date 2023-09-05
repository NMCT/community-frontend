import { createApp } from 'vue'

// Uno css framework
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'


import { defaultConfig, plugin } from '@formkit/vue'
import config from '../formkit.config.ts'

import './assets/style.css'
import App from '@/App.vue'

import { useFirebase } from '@/composables/useFirebase.ts'
import { router } from '@/bootstrap/router.ts'
import { useFirstLogin } from '@/composables/useFirstLogin'

const { restoreLogin } = useFirebase()
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
    .mount('#app')
}

restoreLogin().then(create)
