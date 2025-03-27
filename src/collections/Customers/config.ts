import type { CollectionConfig } from 'payload'
import { anyone } from '@/collections/Users/access/anyone'
import user from '@/collections/Users/access/user'
import { checkRole } from '../Users/access/checkRole'
import admin from '@/collections/Users/access/admin'

export const Customers: CollectionConfig = {
  slug: 'customers',
  // auth: true,
  auth: {
    tokenExpiration: 12 * 60 * 60,
    verify: false,
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: true,
      requireUsername: false,
    },
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    {
      name: 'tier',
      type: 'radio',
      options: [
        'Free',
        'Basic',
        'Pro',
        'Enterprise',
      ],
      defaultValue: 'Free',
    },
  ],
}