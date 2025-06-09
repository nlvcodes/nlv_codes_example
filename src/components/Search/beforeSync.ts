import {BeforeSync, DocToSync} from '@payloadcms/plugin-search/types'
import type {SerializedEditorState} from '@payloadcms/richtext-lexical/lexical'
import {convertLexicalToPlaintext} from '@payloadcms/richtext-lexical/plaintext'

export const beforeSyncWithSearch: BeforeSync = async ({originalDoc, searchDoc}) => {
  const {doc: {relationTo: collection}} = searchDoc

  const {title, content} = originalDoc

  const data: SerializedEditorState = content
  const plaintext = convertLexicalToPlaintext({data})


  const modifiedDoc: DocToSync = {
    ...searchDoc,
    title,
    excerpt: collection === 'posts' ? plaintext : ''
  }

  return modifiedDoc
}