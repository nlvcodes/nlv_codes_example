import {Block} from 'payload' // import the Block type from 'payload'

export const Image: Block = { // export a constant called Image with the Block type assigned to it
  slug: 'image', // our image block will have the slug 'image'
  fields: [ // and will have a single field called 'image'
    {
      name: 'image',
      type: 'upload', // that will be of type 'upload'
      relationTo: 'media', // with a relation to our media collection
      required: true, // and it will be required
    },
  ],
}