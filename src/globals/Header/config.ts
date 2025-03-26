import {GlobalConfig} from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  graphQL: {
    name: 'headerGraphQL',
    disableQueries: true,
    disableMutations: true,
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Navigation',
    description: 'This is our header navigation.'
  },
  fields: [
    {
      type: 'array',
      name: 'headerLinks',
      fields: [
        {
          name: 'destination',
          type: 'relationship',
          relationTo: 'posts',
        },
        {
          name: 'newTab',
          label: 'Open in a new tab?',
          type: 'checkbox',
        }
      ],
      minRows: 1,
      maxRows: 5
    }
  ],
}