import {Block} from 'payload'

export const TableOfContents: Block = {
  slug: 'tableOfContents',
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