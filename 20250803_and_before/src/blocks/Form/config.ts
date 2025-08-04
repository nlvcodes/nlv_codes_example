import {Block} from 'payload'
import {lexicalEditor} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form Block', plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'form',
      relationTo: 'forms',
      type: 'relationship',
      required: true
    },
    {
      name: 'enableCompanionText',
      label: 'Enable Companion Text',
      type: 'checkbox',
    },
    {
      name: 'companionText',
      label: 'Companion Text',
      type: 'richText',
      editor: lexicalEditor({}),
      admin: {
        condition: (_, {enableCompanionText}) => Boolean(enableCompanionText),
      }
    }
  ]
}