import {Block} from 'payload'

export const TableOfContents: Block = {
  slug: 'tableOfContents',
  interfaceName: 'TableOfContents',
  admin: {
    group: 'Content',
    disableBlockName: true,
  },
  fields: [
    {
      name: 'contents',
      type: 'array',
      fields: [
        {
          type: 'text',
          name: 'header',
        },
        {
          type: 'text',
          name: 'link'
        }
      ]
    }
  ]
}