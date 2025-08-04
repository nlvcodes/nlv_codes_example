'use client'

import type {ContentWithMedia, Media} from '@/payload-types'
import type {
  DefaultNodeTypes,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import type {SerializedEditorState} from '@payloadcms/richtext-lexical/lexical'
import {convertLexicalToHTML, type HTMLConvertersFunction} from '@payloadcms/richtext-lexical/html'
import React from 'react'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<ContentWithMedia>

const htmlConverters: HTMLConvertersFunction<NodeTypes> = ({defaultConverters}) => ({
  ...defaultConverters,
  blocks: {
    contentWithMedia: ({node}) => {
      const richText = node.fields.content && convertLexicalToHTML({data: node.fields.content})
      const image = node.fields.image as Media

      return `<div class="flex flex-wrap p-4 mx-4"><div class="${node.fields.textPosition === 'Right' ? "order-last" : "order-first"} w-1/2">${richText}</div>
<img class="w-1/2 rounded-md" alt="${image.alt}" src="${process.env.NEXT_PUBLIC_S3}/${image.filename}" />
</div>`
    }
  }
})

export const RenderHTML = ({data}: {data: SerializedEditorState}) => {
  const html = convertLexicalToHTML({
    data,
    converters: htmlConverters
  })
  return <div dangerouslySetInnerHTML={{__html: html}} />
}