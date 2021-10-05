import i18next from 'i18next'
import faCore from 'assets/locales/core/fa.json'
import faErrors from 'assets/locales/errors/fa.json'

export const translator = i18next.init({
  resources: {fa: {core: faCore, errors: faErrors}},
  lng: 'fa',
  fallbackLng: 'fa',
  preload: ['fa'],
  ns: ['core', 'errors'],
  defaultNS: 'core',
})

export const t = i18next.t.bind(i18next)
