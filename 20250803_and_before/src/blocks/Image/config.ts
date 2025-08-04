import {Block} from 'payload'

export const Img: Block = {
  slug: 'image',
  fields: [
    {
      type: 'upload',
      name: 'image',
      required: true,
      relationTo: 'media',
    }
  ]
}