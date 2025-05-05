import {Block} from 'payload' // import the Block type from 'payload'

export const Section: Block = { // export a constant called Section with the Block type assigned to it
  slug: 'section', // we'll name this block 'section'
  fields: [ // and give it two fields
    {
      type: 'blocks', // the first will be a blocks field
      name: 'row', // that has the name row
      label: 'Rows', // and will have a label of 'Rows'
      blocks: [], // we'll define an empty blocks array so we can define the blocks in the config
      blockReferences: ['row'], // and then reference the row block using its slug
    },
    {
      name: 'bg', // the second field will be called bg
      type: 'select', // and will have the select type
      label: 'Background Color', // and will have a label of 'Background Color' to make it clear what it's for
      options: [ // we'll define a few options that our editors can select from
        {value: 'bg-primary', label: 'Primary Color'},
        {value: 'bg-secondary', label: 'Secondary Color'},
        {value: 'bg-black', label: 'Black'},
        {value: 'bg-white', label: 'White'}
      ]
    }
  ],
}