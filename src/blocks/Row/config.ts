import { Block } from 'payload'
import { Column } from '@/payload-types'

export const Row: Block = {
  slug: 'row',
  fields: [
    {
      type: 'text',
      name: 'totalWidth',
      defaultValue: 'Auto',
      virtual: true,
      admin: {
        readOnly: true,
        components: {
          Error: {
            path: 'src/components/Admin/Fields/Error.tsx#Error',
            clientProps: {
              message: 'Value must equal 100% or Auto',
            },
          },
        },
      },
      validate: (value: any) => {
        if (value === '100%' || value === 'Auto') {
          return true
        } else {
          return 'Value must equal 100% or Auto'
        }
      },
      hooks: {
        beforeValidate: [
          ({ blockData }) => {
            const columns = blockData?.columns.map((column: Column) => column.columnWidth)
            if (columns.includes('none')) {
              return 'Auto'
            } else {
              const columnsAsNumbers = columns.map((column: string) => {
                const splitFraction = column.split('/')
                return Number(splitFraction[0]) / Number(splitFraction[1]) * 100
              })

              return `${Math.ceil(columnsAsNumbers.reduce((acc: number, column: number) => acc + column, 0))}%`
            }
          },
        ],
      },
    },
    {
      type: 'blocks',
      name: 'columns',
      label: 'Columns',
      blocks: [],
      blockReferences: ['column'],
      maxRows: 4,
    },
  ],
}