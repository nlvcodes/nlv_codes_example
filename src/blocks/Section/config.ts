import {Block} from 'payload'

export const Section: Block = {
  slug: 'section',
  fields: [
    {
      type: 'blocks',
      name: 'row',
      label: 'Rows',
      blocks: [],
      blockReferences: ['row'],
    },
    {
      name: 'bg',
      type: 'select',
      label: 'Background Color',
      options: [
        { value: 'bg-primary', label: 'Primary Color' },
        { value: 'bg-secondary', label: 'Secondary Color' },
        { value: 'bg-black', label: 'Black' },
        { value: 'bg-white', label: 'White' },
      ]
    }
  ]
}