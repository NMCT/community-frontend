import { nl } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'

const config: DefaultConfigOptions = {
  locales: { nl },
  locale: 'nl-BE',
  icons: {
    ...genesisIcons,
  },
}

export default config
