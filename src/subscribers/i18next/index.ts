import i18next from 'i18next'
import faCore from 'assets/locales/core/fa.json'
import faErrors from 'assets/locales/errors/fa.json'
import codes from 'assets/locales/errors/codes.json'

export const translator = i18next.init({
  resources: { fa: { core: faCore, errors: faErrors, codes: codes } },
  lng: 'fa',
  fallbackLng: 'fa',
  preload: ['fa', 'codes'],
  ns: ['core', 'errors'],
  defaultNS: 'core',
})

export const t = i18next.t.bind(i18next)
