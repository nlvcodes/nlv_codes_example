import {BeforeSync, DocToSync} from '@payloadcms/plugin-search/types'
import type {SerializedEditorState} from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext, PlaintextConverters } from '@payloadcms/richtext-lexical/plaintext'
import { ContentWithMedia, Page } from '@/payload-types'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'

export const beforeSyncWithSearch: BeforeSync = async ({originalDoc, searchDoc}) => {
  const {doc: {relationTo: collection}} = searchDoc
  const {title, content, slug} = originalDoc

  const pageText: string[] = []
  if (collection === 'pages') {
    const {content: pageBlocks} = originalDoc as Page
    pageBlocks?.forEach(block => {
      if (block.blockType === 'contentWithMedia' && block.content) {
        pageText.push(convertLexicalToPlaintext({data: block.content}))
      }
      if (block.blockType === 'formBlock') {
        const {enableCompanionText, companionText} = block
        if (enableCompanionText && companionText) {
          pageText.push(convertLexicalToPlaintext({data: companionText}))
        }
      }
      if (block.blockType === 'section') {
        block.row?.forEach(row => {
          row.columns?.forEach(column => {
            column.content?.forEach(content => {
              if (content.blockType === 'text' && content.text) {
                pageText.push(convertLexicalToPlaintext({data: content.text }))
              }
            })
          })
        })
      }
    })
  }

  const data: SerializedEditorState = content
  const converters: PlaintextConverters<DefaultNodeTypes | SerializedBlockNode<ContentWithMedia>> = {
    blocks: {
      contentWithMedia: ({node}) => {
        return convertLexicalToPlaintext({data: node.fields.content!})
      }
    }
  }
  const plaintext = convertLexicalToPlaintext({
    //@ts-expect-error
    converters,
    data
  })

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    title,
    slug,
    excerpt: collection === 'posts' ? plaintext : collection === 'pages' ? pageText.join(' ') : ''
  }

  return modifiedDoc
}