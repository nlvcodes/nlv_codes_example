import {Block} from 'payload' // import the Block type from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// we'll also get our lexicalEditor from the @payloadcms/richtext-lexical package

export const Text: Block = { // export a constant called Text with the Block type assigned to it
  slug: 'text', // our text block will have the slug 'text'
  fields: [ // and will have a single field called 'text'
    {
      type: 'richText', // which will be a richText field
      name: 'text',
      required: true, // and it will be required
      editor: lexicalEditor({}), // we can initialize our editor with any options we want, I'll leave it empty for now
    },
  ],
}