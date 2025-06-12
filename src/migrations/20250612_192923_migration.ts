import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'
import { Page } from '@/payload-types'
import { TypedLocale } from 'payload'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {

  const translations = {
    slug: {
      home: 'inicio',
      about: 'quienes-somos',
      portfolio: 'portafolio',
    },
    title: {
      'Home': 'Inicio',
      'About Us': 'Quiénes Somos',
      'Portfolio': 'Portafolio',
    },
  }

  const pages = await payload.find({
    collection: 'pages',
    where: {},
    limit: 0,
  }).then(result => result.docs)

  function translateAll(page: Page, translations: Record<string, Record<string, string>>): Record<string, any> {
    return {
      slug: translations.slug[page.slug!] || page.slug,
      title: translations.title[page.title!] || page.title,
    }
  }

  for (const page of pages) {
    const translated = translateAll(page, translations)
    for (const locale of ['es', 'en']) {
      await payload.update({
        collection: 'pages',
        locale: locale as TypedLocale,
        id: page.id,
        data: {
          ...page,
          slug: locale === 'es' ? translated.slug : page.slug,
          title: locale === 'es' ? translated.title : page.title,
        },
      })
    }
  }
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  // Migration code
}
