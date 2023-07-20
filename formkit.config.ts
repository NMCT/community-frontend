import { nl } from '@formkit/i18n'
import { DefaultConfigOptions } from '@formkit/vue'
import {genesisIcons} from "@formkit/icons";
import {generateClasses} from "@formkit/themes";
import Default from "./default.js"
const config: DefaultConfigOptions = {
    locales: { nl},
    locale: 'nl-BE',
    icons: {
        ...genesisIcons,
    },
    config: {
        classes: generateClasses(Default),
    },
}

export default config
