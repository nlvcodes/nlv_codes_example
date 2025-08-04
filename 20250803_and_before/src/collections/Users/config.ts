import type { CollectionConfig } from 'payload'
import { BoldFeature, FixedToolbarFeature, ItalicFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/config'
import { protectRoles } from '@/collections/Users/hooks/protectRoles'
import editor from '@/collections/Users/access/editor'
import user from '@/collections/Users/access/user'
import admin from '@/collections/Users/access/admin'
import { checkRole } from '@/collections/Users/access/checkRole'
import { User } from '@/payload-types'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: editor,
    read: user,
    update: user,
    delete: admin,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  defaultPopulate: {
    slug: true,
    name: true,
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        {label: 'Admin', value: 'admin'},
        {label: 'Editor', value: 'editor'},
        {label: 'User', value: 'user'},
      ],
      hooks: {
        beforeChange: [protectRoles]
      },
      access: {
        update: ({req: {user}}) => checkRole(['admin'], user as User)
      }
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text'
    },
    {
      type: 'richText',
      name: 'test',
      editor: lexicalEditor({
        features: ({defaultFeatures}) => [
          ...defaultFeatures.filter((feature) => !['superscript', 'subscript', 'inlineCode'].includes(feature.key)),
          FixedToolbarFeature()
        ]
      })
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        ContentWithMedia
      ]
    },
    // Email added by default
    // Add more fields as needed
  ],
}
