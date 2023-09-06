import { createApp } from 'vue'

// Uno css framework
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

// formkit
import { defaultConfig, plugin } from '@formkit/vue'
import config from '../formkit.config.ts'
import '@formkit/themes/genesis'

import './assets/style.css'
import App from '@/App.vue'

import { useFirebase } from '@/composables/useFirebase.ts'
import { router } from '@/bootstrap/router.ts'
import { useFirstLogin } from '@/composables/useFirstLogin'
import { useApolloClient } from '@/composables/useApolloClient.ts'

// load apollo client
const {} = useApolloClient()
const { restoreLogin, DownloadProfilePicture, MicrosoftLoginResult } =
  useFirebase()
const { postFirstLogin } = useFirstLogin()

const create = () => {
  postFirstLogin()
  MicrosoftLoginResult()

  createApp(App)
    .use(router)
    // .use(plugin, defaultConfig(
    //     theme: 'tailwindcss/genesis',
    // }))
    .use(plugin, defaultConfig(config))
    .mount('#app')

  /// playground
  const pfpUrl = DownloadProfilePicture()
}

restoreLogin().then(create)
