import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'creditText',
      type: 'text',
      required: true,
    }
  ],
  upload: {
    formatOptions: {
      format: 'webp',
    },
    imageSizes: [
      {
        name: 'small',
        width: 1200,
        height: 600,
      },
    ],
    mimeTypes: ['image/png', 'image/webp', 'image/jpg'],
    adminThumbnail: 'small',
  },
}
