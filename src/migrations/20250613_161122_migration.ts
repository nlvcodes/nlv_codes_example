import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  const pages = await payload.db.collections.pages.collection.updateMany(
    {},
    {$unset: {'slugTest': '', 'slugNew': '', 'titleNew': ''}}
  )
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  // Migration code
}
