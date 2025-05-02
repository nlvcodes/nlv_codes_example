import {Block} from 'payload'

export const Text: Block = {
  slug: 'text',
  fields: [
    {
      type: 'richText',
      name: 'text',
      required: true,
    },
  ],
}