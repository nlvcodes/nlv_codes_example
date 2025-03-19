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

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from '@/collections/Posts/config'
import { Header } from '@/globals/Header/config'
import { Documents } from '@/collections/Document'


import { resendAdapter } from '@payloadcms/email-resend'
// import { revalidateRedirects } from '@/collections/hooks/revalidateRedirects'
// import { Logos } from '@/globals/Logos/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'MM/dd/yyyy',
    // components: {
      // logout: {
      //   Button: {
      //     path: '/components/Admin/UI/logout.tsx',
      //     exportName: 'Logout',
      //   },
      // },
      // beforeNavLinks: [
      //   {
      //     path: '/components/Admin/UI/logout.tsx',
      //     exportName: 'Logout',
      //   },
      // ],
      // afterNavLinks: [
      //   {
      //     path: '/components/Admin/UI/logout.tsx',
      //     exportName: 'Logout',
      //   },
      // ],
      // beforeDashboard: [
      //   {
      //     path: '/components/Admin/UI/beforeDashboard.tsx',
      //     exportName: 'Welcome',
      //   },
      // ],
      // afterDashboard: [
      //   {
      //     path: '/components/Admin/UI/afterDashboard.tsx',
      //     exportName: 'Outro',
      //   },
      // ],
      // beforeLogin: [{
      //   path: '/components/Admin/UI/beforeLogin.tsx',
      //   exportName: 'LinkToHome',
      // }],
      // afterLogin: [{
      //   path: '/components/Admin/UI/afterLogin.tsx',
      //   exportName: 'LoginInstruction',
      // }],
      // actions: [{
      //     path: '/components/Admin/UI/logout.tsx',
      //     exportName: 'Logout',
      //   },],
      // header: [{
      //   path: '/components/Admin/UI/header.tsx',
      //   exportName: 'banner',
      // }],
      // graphics: {
      //   Logo: {
      //     path: '/components/Admin/UI/logo.tsx',
      //     exportName: 'Logo',
      //   },
      //   Icon: {
      //     path: '/components/Admin/UI/icon.tsx',
      //     exportName: 'Icon',
      //   }
      // }
    // },
  },
  cors: ['http://localhost:3000', process.env.DOMAIN_NAME || ''],
  csrf: ['http://localhost:3000', process.env.DOMAIN_NAME || ''],
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  globals: [Header],
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
      overrides: {
        fields: ({ defaultFields }) => {
          return [{
            type: 'checkbox',
            name: 'active',
            defaultValue: true,
          }, ...defaultFields]
        },
        // hooks: {
        //   afterChange: [revalidateRedirects],
        // },
      },
      redirectTypes: ['301', '302'],
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
