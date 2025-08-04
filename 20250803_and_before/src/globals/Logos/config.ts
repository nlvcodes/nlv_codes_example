import {GlobalConfig} from 'payload'

export const Logos: GlobalConfig = {
  slug: 'logos',
  admin: {
    group: 'Media'
  },
  fields: [
    {
      type: 'upload',
      name: 'lightModeIcon',
      relationTo: 'media',
    },
    {
      type: 'upload',
      name: 'lightModeLogo',
      relationTo: 'media',
    },
    {
      type: 'upload',
      name: 'darkModeIcon',
      relationTo: 'media',
    },
    {
      type: 'upload',
      name: 'darkModeLogo',
      relationTo: 'media',
    },
  ]
}