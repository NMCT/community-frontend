import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'
import { useFirebase } from '@/hooks/useFirebase.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { router } from '@/bootstrap/router.ts'

library.add(faSpinner)
const { restoreLogin } = useFirebase()
await restoreLogin()


createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  // .use(plugin, defaultConfig({
  //     theme: 'tailwindcss/genesis',
  // }))
  .use(plugin, defaultConfig(config))
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
