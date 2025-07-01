import {getRequestConfig} from 'next-intl/server'
import {routing} from './routing'
import en from './messages/en.json'

type Messages = typeof en

declare global {
  interface IntlMessages extends Messages {}
}

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})