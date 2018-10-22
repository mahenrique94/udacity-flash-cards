import i18n from 'i18next'

import { reactI18nextModule } from 'react-i18next'

import { messages } from './languages/'

i18n
    .use(reactI18nextModule)
    .init({
        debug: false,
        defaultNS: [ 'translations' ],
        fallbackLng: 'en',
        ns: [ 'translations' ],
        react: {
            wait: true
        },
        resources: messages
    })

export default i18n
