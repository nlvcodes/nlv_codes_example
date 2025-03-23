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
import { buildConfig } from 'payload'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  graphQL: {
    disable: true
  },
  routes: {
    admin: '/admin',
    api: '/api',
  },
  admin: {
    suppressHydrationWarning: true,
    routes: {
      logout: '/log-me-out',
      account: '/my-account'
    },
    avatar: {
      Component:
        {
          path: '/components/Admin/UI/avatar.tsx',
        },
    },
    meta: {
      titleSuffix: 'NLV Codes',
      title: 'Blank Payload Example',
      description: 'This is an example to be used for educational purposed only.',
      icons: [
        {
          url: `${process.env.S3}/Square-1 2.png`,
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16 32x32 64x64',
          fetchPriority: 'high',
        },
        {
          url: `${process.env.S3}/Square-1.png`,
          rel: 'icon',
          type: 'image/png',
          media: '(prefers-color-scheme: dark)',
          sizes: '16x16 32x32 64x64',
          fetchPriority: 'high',
        },
      ],
      openGraph: {
        title: 'Blank Payload Example',
        description: 'This is an example to be used for educational purposed only.',
        siteName: 'Blank Payload Example',
        images: [
          {
            url: '',
          },
        ]
      },
    },
    autoLogin: process.env.NEXT_PUBLIC_ENABLE_AUTOLOGIN === 'false' ? {
      email: 'nick+editor@midlowebdesign.com',
      password: 'editor',
    } : false,
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'MM/dd/yyyy',
    timezones: {
      defaultTimezone: 'America/New_York',
      supportedTimezones: [
        { label: '(GMT-6) Monterrey, Nuevo Leon', value: 'America/Monterrey' },
        { label: '(GMT-5) East Coast', value: 'America/New_York' },
        { label: 'West Coast', value: 'America/Los_Angeles' },
      ],
    },
    components: {
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
  globals: [Header, Logos],
  collections: [Users, Media, Posts, Documents],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
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
    // vercelBlobStorage({
    //   enabled: true,
    //   collections: {
    //     media: true,
    //   },
    //   token: process.env.BLOB_READ_WRITE_TOKEN
    // })
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
    uploadthingStorage({
      collections: {
        documents: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN || '',
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
})
