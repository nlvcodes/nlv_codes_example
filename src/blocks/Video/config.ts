import { Block } from 'payload' // import our type Block from 'payload'

export const Video: Block = { // export the const Video with the Block type assigned to it
  slug: 'video', // we'll name it 'video'
  fields: [ // with the fields
    {
      name: 'videoLink', // videoLink
      type: 'text', // of type text
      required: true, // and make it required
    },
    {
      name: 'name', // then we'll need a name field
      type: 'text', // that's also type of text
      required: true, // and is also required
    },
    {
      name: 'description', // optionally, we'll include a description field
      type: 'text', // that's type of text
      admin: { // with an admin property with a description in it
        description: 'Description for search engines',  // this will just be returned in future scheme.org markup we may use
      }
    },
    { // then we need a 'row' field to store the video length
      type: 'row',
      fields: [ // this will have 3 fields that have the type 'number'
        {
          type: 'number',
          name: 'hours', // the first field will be called hours
          required: true, // and is required
          defaultValue: 0, // with a default value of 0
          admin: { // we'll use the admin property
            width: '30%', // to set a width of 30%
          }
        },
        {
          type: 'number',
          name: 'minutes', // the second field will be called minutes
          required: true, // and is required, too
          admin: { // we'll use the admin property again
            width: '30%', // to set a width of 30%
          }
        },
        {
          type: 'number',
          name: 'seconds', // the last field will be called seconds
          required: true, // and is required
          admin: { // we'll use the admin property one last time
            width: '30%', // to set a width of 30%, these widths mean the fields will each take up 30% of the row
          }
        },
      ],
    },
  ],
}