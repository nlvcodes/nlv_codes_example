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
      type: 'text',
      name: 'creditText',
      required: true,
    },
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
        formatOptions: {
          format: 'webp',
        }
      },
    ],
    mimeTypes: ['image/png', 'image/webp', 'image/jpg', 'image/jpeg'],
    adminThumbnail: 'small',
  },
}
