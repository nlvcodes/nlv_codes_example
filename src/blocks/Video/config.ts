import {Block} from 'payload'

export const Video: Block = {
  slug: 'video',
  fields: [
    {
      name: 'videoLink',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description: 'Description for search engines.'
      }
    },
    {
      type: 'row',
      fields: [
        {type: 'number', name: 'hours', required: true, defaultValue: 0, admin: {width: '30%'} },
        {type: 'number', name: 'minutes', required: true, admin: {width: '30%'} },
        {type: 'number', name: 'seconds', required: true, admin: {width: '30%'} },
      ]
    }
  ]
}