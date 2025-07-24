import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { s3Storage } from '@payloadcms/storage-s3'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import {
  BoldFeature,
  FixedToolbarFeature, HTMLConverterFeature,
  ItalicFeature,
  lexicalEditor, lexicalHTML,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import {
  buildConfig,
  CollectionSlug,
  LocalizationConfig,
  Payload,
  PayloadRequest,
  TaskConfig,
  TaskInput,
} from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users/config'
import { Media } from './collections/Media'
import { Posts } from '@/collections/Posts/config'
import { Header } from '@/globals/Header/config'
import { Documents } from '@/collections/Document'


import { resendAdapter } from '@payloadcms/email-resend'
import { revalidateRedirects } from '@/collections/hooks/revalidateRedirects'
import { Logos } from '@/globals/Logos/config'
import { Customers } from '@/collections/Customers/config'
import { Pages } from '@/collections/Pages/config'
import { formBuilderPlugin, fields } from '@payloadcms/plugin-form-builder'
import { BeforeEmail } from '@payloadcms/plugin-form-builder/types'
import { FormSubmission } from '@/payload-types'
import editor from '@/collections/Users/access/editor'
import { defaultValue, hidden, label, name, placeholder, required, width } from '@/blocks/Form/fieldConfig'
import { Text } from '@/blocks/Text/config'
import { Video } from '@/blocks/Video/config'
import { Img } from '@/blocks/Image/config'
import { Column } from '@/blocks/Column/config'
import { Row } from '@/blocks/Row/config'
import { Section } from '@/blocks/Section/config'
import { searchPlugin } from '@payloadcms/plugin-search'
import { beforeSyncWithSearch } from '@/components/Search/beforeSync'
import localization from '@/i18n/localization'
// import { analyticsPlugin } from 'payload-analytics-plugin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const beforeEmail: BeforeEmail<FormSubmission> = (emails, beforeChangeParams) => {
  return emails.map((email) => ({
    ...email,
    html: `<div><style>h1 {font-size: 3rem} p {font-size: 1rem; font-weight: bold; padding: 1rem; border: 1px solid darkgreen; border-radius: 0.5rem}</style><div>${email.html}</div></div>`,
  }))
}

export default buildConfig({
  blocks: [Text, Video, Img, Column, Row, Section],
  graphQL: {
    disable: true,
  },
  routes: {
    admin: '/admin',
    api: '/api',
  },
  admin: {
    routes: {
      logout: '/log-me-out',
      account: '/my-account',
    },
    timezones: {
      defaultTimezone: 'America/Los_Angeles',
      supportedTimezones: [
        { label: 'West Coast', value: 'America/Los_Angeles' },
        { label: 'East Coast', value: 'America/New_York' },
      ],
    },
    avatar: {
      Component: {
        path: '/components/Admin/ui/avatar.tsx',
      },
    },
    // autoLogin: process.env.NEXT_PUBLIC_ENABLE_AUTOLOGIN === 'true' ? {
    //   email: 'nick+editor@midlowebdesign.com',
    //   password: process.env.AUTOLOGIN_PASSWORD,
    // } : false,
    livePreview: {
      collections: ['pages'],
      breakpoints: [
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 1080,
        },
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
      ],
      url: ({
              collectionConfig,
              data,
              locale,
            }) => `/${locale}/${collectionConfig?.slug === 'pages' ? data.slug !== 'home' ? data.slug : '' : ''}`,
    },
    meta: {
      titleSuffix: '- NLV Codes',
      title: 'Blank Payload Example',
      description: 'This is an example to be used for educational purposes only.',
      alternates: {
        canonical: '',
      },
      authors: [],
      robots: '',
      openGraph: {
        title: 'Blank Payload Example',
        description: 'This is an example to be used for educational purposes.',
        siteName: 'Blank Payload Example',
        images: [
          {
            url: '',
          },
        ],
      },
      icons: [
        {
          url: `${process.env.NEXT_PUBLIC_S3}/Square-1 2.png`,
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16 32x32 64x64',
          fetchPriority: 'high',
        },
        {
          url: `${process.env.NEXT_PUBLIC_S3}/Square-1.png`,
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16 32x32 64x64',
          fetchPriority: 'high',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'MM/dd/yyyy',
    components: {
      views: {
        testView: {
          Component: '/components/Admin/views/test.tsx#Test',
          path: '/test',
        },
      },
      logout: {
        Button: {
          path: '/components/Admin/UI/logout.tsx#Logout',
        },
      },
      beforeNavLinks: [
        {
          path: '/components/Admin/UI/logout.tsx#Logout',
        },
      ],
      afterNavLinks: [
        {
          path: '/components/Admin/UI/logout.tsx#Logout',
        },
      ],
      beforeDashboard: [
        {
          path: '/components/Admin/UI/beforeDashboard.tsx#Welcome',
        },
      ],
      afterDashboard: [
        {
          path: '/components/Admin/UI/afterDashboard.tsx#Outro',
        },
      ],
      beforeLogin: [
        {
          path: '/components/Admin/UI/beforeLogin.tsx#LinkToHome',
        },
      ],
      afterLogin: [
        {
          path: '/components/Admin/UI/afterLogin.tsx#LoginInstruction',
        },
      ],
      actions: [
        {
          path: '/components/Admin/UI/logout.tsx#Logout',
        },
      ],
      header: [
        {
          path: '/components/Admin/UI/header.tsx#banner',
        },
      ],
      graphics: {
        Icon: {
          path: '/components/Admin/UI/icon.tsx#Icon',
        },
        Logo: {
          path: '/components/Admin/UI/logo.tsx#Logo',
        },
      },
    },
  },
  cors: ['http://localhost:3000', process.env.DOMAIN_NAME || ''],
  csrf: ['http://localhost:3000', process.env.DOMAIN_NAME || ''],
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  localization: localization as LocalizationConfig,
  globals: [Header, Logos],
  collections: [Users, Media, Posts, Documents, Customers, Pages],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    connectOptions: {
      ssl: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
      // Increase timeout for build process
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    },
  }),
  sharp,
  plugins: [

    searchPlugin({
      collections: ['posts', 'pages'],
      localize: true,
      defaultPriorities: {
        posts: 20,
        pages: ({ doc }) => (doc.slug === 'home' ? 1 : 10),
      },
      searchOverrides: {
        slug: 'search-results',
        labels: { singular: 'Search Result', plural: 'Search Results' },
        admin: {
          group: 'Search',
        },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'excerpt',
            type: 'textarea',
          },
          {
            name: 'slug',
            type: 'text',
            localized: true,
          },
        ],
      },
      beforeSync: beforeSyncWithSearch,
      syncDrafts: false,
      deleteDrafts: true,
      reindexBatchSize: 50,
    }),
    formBuilderPlugin({
      fields: {
        radio: true,
        phone: {
          fields: [
            { type: 'row', fields: [name, label] },
            { type: 'row', fields: [placeholder, defaultValue] },
            { type: 'row', fields: [width] },
            { type: 'row', fields: [required, hidden] },
          ],
          // @ts-ignore
          slug: 'phone',
          labels: {
            singular: 'Phone Number',
            plural: 'Phone Numbers',
          },
        },
        text: {
          labels: {
            singular: 'Single-line Text', plural: 'Single-line Text',
          },
          fields: [
            { type: 'row', fields: [name, label] },
            { type: 'row', fields: [placeholder, defaultValue] },
            { type: 'row', fields: [width] },
            { type: 'row', fields: [required, hidden] },
          ],
        },
        textarea: {
          fields: [
            { type: 'row', fields: [name, label] },
            { type: 'row', fields: [placeholder] },
            { type: 'row', fields: [required, hidden] },
          ],
        },
        email: {
          fields: [
            { type: 'row', fields: [name, label] },
            { type: 'row', fields: [placeholder, width] },
            { type: 'row', fields: [required, hidden] },
          ],
        },
        number: true,
        checkbox: {
          fields: [
            { type: 'row', fields: [name, label] },
            { type: 'row', fields: [width] },
            { type: 'row', fields: [required, hidden] },
          ],
        },
        message: true,
        state: false,
        select: false,
        country: false,
        payment: false,
      },
      redirectRelationships: ['pages'],
      beforeEmail,
      defaultToEmail: 'nick@midlowebdesign.com',
      formOverrides: {
        slug: 'forms',
        admin: {
          group: 'Forms',
        },
        access: {
          update: editor,
        },
        fields: ({ defaultFields }) => [
          ...defaultFields.map((field) => {
            if (field.type === 'radio' && field.name === 'confirmationType') {
              return {
                ...field,
                hidden: true,
              }
            }
            return field
          }),
          {
            name: 'hubspotID',
            type: 'text',
            label: 'HubSpot ID',
            admin: {
              position: 'sidebar',
            },
          },
          {
            type: 'checkbox',
            name: 'requireRecaptcha',
            label: 'Require reCAPTCHA?',
            admin: {
              position: 'sidebar',
            },
          },
        ],
      },
      formSubmissionOverrides: {
        slug: 'form-submissions',
        admin: {
          group: 'Forms',
        },
        hooks: {
          afterChange: [
            async ({ doc, req }) => {
              req.payload.logger.info('Form Submission Received')
              const body = req.json ? await req.json() : {}
              const sendSubmissionToHubSpot = async (): Promise<void> => {
                const { form, submissionData } = doc
                const portalID = process.env.HS_PORTAL_ID
                const data = {
                  context: {
                    ...('hubspotCookie' in body && {
                      hutk: body?.hubspotCookie,
                    }),
                    pageName: 'pageName' in body ? body?.pageName : '',
                    pageUri: 'pageUri' in body ? body?.pageUri : '',
                  },
                  fields: submissionData.map((key: any) => ({
                    name: key.field,
                    value: key.value,
                  })),
                }
                try {
                  await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalID}/${form.hubspotID}`, {
                    body: JSON.stringify(data),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    method: 'POST',
                  })
                } catch (e: unknown) {
                  req.payload.logger.error({ e, msg: 'Form submission not sent to HubSpot.' })
                }
              }
              await sendSubmissionToHubSpot()
            },
          ],
        },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'recaptcha',
            type: 'text',
            validate: async (value: any, { req, siblingData }: any) => {
              const form = await req.payload.findByID({
                id: siblingData?.form,
                collection: 'forms',
              })

              if (!form.requireRecaptcha) {
                return true
              }

              if (!value) {
                return 'Please complete the reCAPTCHA'
              }

              const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PRIVATE_RECAPTCHA_SECRET_KEY}&response=${value}`, {
                method: 'POST',
              })
              const data = await res.json()
              if (!data.success) {
                return 'Invalid captcha'
              } else {
                return true
              }
            },
          },
        ],
      },

    }),
    seoPlugin({
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc }) => doc.plaintext,
      generateURL: ({ doc, collectionSlug }) => `https://example.com/${collectionSlug}/${doc?.slug}`,
    }),
    redirectsPlugin({
      collections: ['posts'],
      redirectTypes: ['301', '302'],
      overrides: {
        fields: ({ defaultFields }) => {
          return [{
            type: 'checkbox', name: 'active', defaultValue: true,
          }, ...defaultFields]
        },
        hooks: {
          afterChange: [
            revalidateRedirects,
          ],
        },
        admin: {
          group: 'Navigation',
        },
      },
      redirectTypeFieldOverride: {
        admin: { description: 'Choose the type of redirect to use.' },
      },
    }),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET || '',
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
  defaultDepth: 2,
  maxDepth: 3,
  serverURL: process.env.SERVER_URL || '',
  email: resendAdapter({
    defaultFromAddress: 'nick@midlowebdesign.com',
    defaultFromName: 'Nick',
    apiKey: process.env.RESEND_API || '',
  }),
  jobs: {
    access: {
      run: ({req}: {req: PayloadRequest}) => {
        if (req.user) return true
        return `Bearer ${process.env.CRON_SECRET}` === req.headers.get('Authorization')
      }
    },
    tasks: [
      {
        slug: 'healthCheck',
        handler: async ({ req }) => {
          const results = {
            timestamp: new Date().toISOString(),
            errors: [] as string[],
            checks: {
              database: false,
              api: false,
            },
          }
          try {
            try {
              await req.payload.find({
                collection: 'users',
                limit: 1,
              })
              results.checks.database = true
            } catch (e) {
              await req.payload.sendEmail({
                to: 'nick@nlvogel.com',
                html: `Health check failed: ${e instanceof Error ? e.message : 'Unknown error'}`,
              })
              results.errors.push(`Database check failed: ${e instanceof Error ? e.message : 'Unknown error'}`)
            }

            try {
              const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
              const response = await fetch(`${serverUrl}/api/health`)
              if (response.ok) {
                results.checks.api = true
              } else {
                results.errors.push(`API health check returned ${response.status}: ${response.statusText}`)
              }
            } catch (e) {
              results.errors.push(`API check failed: ${e instanceof Error ? e.message : 'Unknown error'}`)
            }
            const allHealthy = Object.values(results.checks).every(check => check)
            if (!allHealthy) {
              req.payload.logger.error({ msg: `Health check failed at ${new Date()}:`, results })

              await req.payload.sendEmail({
                to: 'nick@midlowebdesign.com',
                html: `<h2>Health Check Failed</h2>
				            <p>Time: ${new Date()}</p>
				            <h3>Check Results:</h3>            <ul>              <li>Database: ${results.checks.database ? 'succeed' : 'fail'}</li>
				              <li>API: ${results.checks.api ? 'succeed' : 'fail'}</li>
				            </ul>            <h3>Errors:</h3>            <ul>              ${results.errors.map(err => `<li>${err}</li>`).join('')}
				            </ul>`,
              })
            } else {
              req.payload.logger.info({ msg: `All systems healthy at ${new Date()}` })
            }
            return { output: results }
          } catch (e) {
            req.payload.logger.error({ msg: 'Health check error:', e })
            throw e
          }
        },
        retries: 1,
      } as TaskConfig<'healthCheck'>,
      {
        slug: 'schedulePublish',
        handler: async ({ job, req }) => {
          req.payload.logger.info('schedulePublish handler started', {
            jobId: job.id,
            input: job.input,
            waitUntil: job.waitUntil,
            currentTime: new Date().toISOString(),
          })
          const { type, doc } = job.input as TaskInput<'schedulePublish'>

          if (!doc || doc.relationTo !== 'posts') {
            req.payload.logger.warn('schedulePublish job called for non-post document. Skipping')
            return { output: { success: true, skipped: true } }
          }

          try {
            if (type === 'publish') {
              const post = await req.payload.findByID({
                collection: doc.relationTo as CollectionSlug,
                id: doc.value as string,
                draft: true,
              })
              if (!post) {
                await req.payload.sendEmail({
                  to: 'nick@nlvogel.com',
                  html: `<h2>Scheduled Publishing Failed</h2><p>Error: ${doc.relationTo} with ID ${doc.value} not found</p><p>Time: ${new Date()}</p>`,
                })
                return { output: { success: false, error: `${doc.relationTo} not found` } }
              }

              const publishPost = await req.payload.update({
                collection: doc.relationTo as CollectionSlug,
                id: doc.value as string,
                data: {
                  _status: 'published',
                },
                draft: false,
              })

              await req.payload.sendEmail({
                to: 'nick@nlvogel.com',
                html: `<h2>Scheduled Publishing Succeeded</h2><p> ${doc.relationTo} with ID ${doc.value} was published successfully</p><p>Time: ${new Date()}</p>`,
              })

              req.payload.logger.info({ msg: `Published scheduled ${doc.relationTo}: ${publishPost.id} at ${new Date()}` })
              return { output: { success: true, publishedAt: new Date().toISOString(), id: publishPost.id } }
            }

          } catch (e) {
            req.payload.logger.error({ msg: `Error in schedulePublish for ${doc.relationTo} ${doc.value}:`, e })
            await req.payload.sendEmail({
              to: 'nick@midlowebdesign.com',
              html: `<h2>Scheduled Publishing Failed</h2><p>Error for ${doc.relationTo} ${doc.value}: ${e instanceof Error ? e.message : 'Unknown error'}</p><p>Time: ${new Date()}</p><pre>${JSON.stringify(e, null, 2)}</pre>`,
            })
            req.payload.logger.error('Full error details:', JSON.stringify(e, null, 2))
            throw e
          }
        },
        retries: 3,
      } as TaskConfig<'schedulePublish'>,
    ],
  },
})
