import i18next from 'i18next'
import enErrors from 'assets/locales/errors/en.json'

export const translator = i18next.init({
  resources: { en: { errors: enErrors } },
  lng: 'en',
  fallbackLng: 'en',
  preload: ['en'],
  ns: ['errors'],
  defaultNS: 'errors',
})

export const t = i18next.t.bind(i18next)
