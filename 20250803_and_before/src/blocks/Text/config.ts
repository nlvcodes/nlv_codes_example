import {Block} from 'payload'
import {lexicalEditor} from '@payloadcms/richtext-lexical'

export const Text: Block = {
  slug: 'text',
  fields: [
    {
      type: 'richText',
      name: 'text',
      required: true,
      editor: lexicalEditor({})
    }
  ]
}