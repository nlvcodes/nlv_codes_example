import { Block } from 'payload' // import the Block type from 'payload'

export const Row: Block = { // export a constant called Row with the Block type assigned to it
  slug: 'row', // our row block will have the slug 'row'
  fields: [ // and will have two fields
    {
      type: 'text', // the first will be a text field
      name: 'totalWidth', // called totalWidth
      validate: (value: any) => { // and will validate that the value is equal to 100%
        if (value === '100%') {
          return true // this will make sure the form submits correctly if value is 100%
        } else {
          return 'Value must equal 100%' // otherwise, this error will be returned in the API response
        }
      },
      admin: { // we'll use the admin property to make the field read-only and to override the default Field component
        readOnly: true, // set readOnly to true
        components: { // we'll come back to this
          Field: { // then to wrap everything up, we can import our ColumnWidth component here
            path: 'src/collections/fields/ColumnWidth.tsx',
          },
          Error: { // we can pull in our custom error component we edited earlier
            path: 'src/components/Admin/Fields/Error.tsx#Error',
            clientProps: { // and using the clientProps prop
              message: 'Value must equal 100%',  // we can pass in this error message
            },
          },
        }
      }
    },
    {
      type: 'blocks', // we'll then need a blocks field
      name: 'columns', // called columns
      label: 'Columns', // with the label Columns
      blocks: [], // and we'll pass in an empty array for our blocks
      blockReferences: ['column'], // and reference the column block using its slug
      maxRows: 4, // we'll set this to have a max of 4 rows so we only have 4 possible columns
    },
  ],
}