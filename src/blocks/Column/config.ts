import { Block } from 'payload' // import the Block type from 'payload'

export const Column: Block = { // export a constant called Column with the Block type assigned to it
  slug: 'column', // we'll call our column block 'column'
  fields: [ // which will have two fields
    {
      type: 'blocks', // the first is a blocks type
      name: 'content', // called content
      label: 'Content Blocks', // and we'll label it as Content Blocks, just so it's clearer
      blocks: [], // we'll pass in an empty array for our blocks
      // and instead define our blockReferences as our slugs from text, image, and video
      // using blockReferences reduces how much data is sent to the client. we simply need to define
      // the block in our Payload config, which we'll do later, and then reference it here by slug.
      // this does limit what you can do with access control and you're not able to extend on your
      // blocks, so there's a tradeoff here.
      blockReferences: ['text', 'image', 'video'],
      maxRows: 2, // we'll include maxRows of 2 to prevent columns from getting too long
    },
    {
      type: 'select', // our second field will be a select field
      name: 'columnWidth', // called columnWidth
      required: true, // this will be required
      options: [ // and will have several options, which we'll use to define the flex-basis of the column
        { label: 'Auto', value: 'auto' },
        { label: '80%', value: '4/5' },
        { label: '75%', value: '3/4' },
        { label: '66%', value: '2/3' },
        { label: '50%', value: '1/2' },
        { label: '33%', value: '1/3' },
        { label: '25%', value: '1/4' },
        { label: '20%', value: '1/5' },
      ],
      // we'll let the defaultValue by 'auto' so elements will take up 100% of the column if nothing is defined
      defaultValue: 'auto',
    },
  ],
}