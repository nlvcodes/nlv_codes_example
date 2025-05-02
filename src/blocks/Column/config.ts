import {Block} from 'payload'
import { ColumnWidth } from '@/collections/fields/ColumnWidth'

export const Column: Block = {
  slug: 'column',
  fields: [
    {
      type: 'blocks',
      name: 'content',
      label: 'Content Blocks',
      blocks: [],
      blockReferences: ['text', 'image', 'video'],
      maxRows: 2,
    },
    ColumnWidth,
  ],
}