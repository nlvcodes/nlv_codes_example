import {Block} from 'payload'

export const Row: Block = {
  slug: 'row',
  fields: [
    {
      name: 'totalWidth',
      type: 'text',
      validate: (value: any) => {
        if (value === '100%') {
          return true
        } else {
          return 'Value must equal 100%'
        }
      },
      admin: {
        readOnly: true,
        components: {
          Field: {
            path: 'src/collections/fields/ColumnWidth.tsx'
          },
          Error: {
            path: 'src/components/Admin/Fields/Error.tsx#Error',
            clientProps: {
              message: 'Value must equal 100%'
            }
          }
        }
      },
    },
    {
      type: 'blocks',
      name: 'columns',
      label: 'Columns',
      blocks: [],
      blockReferences: ['column'],
      maxRows: 4,
    }
  ]
}