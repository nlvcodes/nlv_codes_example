import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  access: {
    read: () => true,
  },
  hooks: {
    afterRead: [
      ({doc, req}) => {
        if ((doc.requiresSignedURL || doc.isPrivate) && !req.user) return null
        return doc
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'cloudinaryFolders',
      type: 'text',
      admin: {
        components: {
          Field: {
            path: 'src/components/Cloudinary/field.tsx#selectField'
          }
        }
      }
    }
  ],
  upload: {
    disableLocalStorage: true,
  },
}
