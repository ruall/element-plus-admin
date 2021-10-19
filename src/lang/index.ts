import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-plus/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn' // element-ui lang
import elementItLocale from 'element-plus/lib/locale/lang/it' // element-ui lang
import local from 'element-plus/lib/locale'
import enLocale from './en'
import zhLocale from './zh'
import itLocale from './it'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  it: {
    ...itLocale,
    ...elementItLocale
  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  // const chooseLanguage = localStorage.get('language')
  if (chooseLanguage) return chooseLanguage
  // if has not choose language
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}

const i18n = createI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
})

// local.i18n((key, val) => i18n.t(key, val))

export default i18n
