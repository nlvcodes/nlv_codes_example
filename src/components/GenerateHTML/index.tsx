// 'use client'
//
// import type {SerializedEditorState} from '@payloadcms/richtext-lexical/lexical'
// import {getRestPopulateFn} from '@payloadcms/richtext-lexical/client'
// import {convertLexicalToHTMLAsync} from '@payloadcms/richtext-lexical/html-async'
// import React, {useEffect, useState} from 'react'
// import type {ContentWithMedia, Media} from '@/payload-types'
// import type {SerializedBlockNode} from '@payloadcms/richtext-lexical'
// import {getServerSideURL} from '@/utilities/getURL'
// import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
//
// export const GenerateHTML = ({data}: {data: SerializedEditorState}) => {
//   const [html, setHtml] = useState<null | string>(null)
//   useEffect(() => {
//     async function convertToHTML() {
//       const html = await convertLexicalToHTMLAsync({
//         data,
//         populate: getRestPopulateFn({
//           apiURL: `${getServerSideURL()}/api`
//         }),
//         converters: ({defaultConverters}) => ({
//           ...defaultConverters,
//           blocks: {
//             contentWithMedia: async ({node}: {node: SerializedBlockNode<ContentWithMedia>}) => {
//               const richText = node.fields.content && await convertLexicalToHTMLAsync({data: node.fields.content})
//               const image = node.fields.image as Media
//               return `<div class="flex flex-wrap p-4 mx-4"><div class="${node.fields.textPosition === 'Right' ? "order-last" : "order-first"} w-1/2">${richText}</div>
// <img class="w-1/2 rounded-md" alt="${image.alt}" src="${process.env.NEXT_PUBLIC_S3}/${image.filename}" />
// </div>`
//             }
//           }
//         })
//       })
//       setHtml(html)
//     }
//     void convertToHTML()
//   }, [data])
//
//   return html && <div dangerouslySetInnerHTML={{__html: html}} />
// }

import type {SerializedEditorState} from '@payloadcms/richtext-lexical/lexical'
import type {ContentWithMedia, Media} from '@/payload-types'
import {getPayloadPopulateFn, type SerializedBlockNode} from '@payloadcms/richtext-lexical'
import {convertLexicalToHTMLAsync} from '@payloadcms/richtext-lexical/html-async'
import {getPayload} from 'payload'
import React from 'react'
import config from '@payload-config'

export const GenerateHTML = async ({data}: {data: SerializedEditorState}) => {
  const payload = await getPayload({config})

  const html = await convertLexicalToHTMLAsync({
    data,
    populate: await getPayloadPopulateFn({
      currentDepth: 0,
      depth: 1,
      payload
    }),
    converters: ({defaultConverters}) => ({
      ...defaultConverters,
      blocks: {
        contentWithMedia: async ({node}: {node: SerializedBlockNode<ContentWithMedia>}) => {
          const richText = node.fields.content && await convertLexicalToHTMLAsync({data: node.fields.content})
          const image = node.fields.image as Media
          return `<div class="flex flex-wrap p-4 mx-4"><div class="${node.fields.textPosition === 'Right' ? "order-last" : "order-first"} w-1/2">${richText}</div>
<img class="w-1/2 rounded-md" alt="${image.alt}" src="${process.env.NEXT_PUBLIC_S3}/${image.filename}" />
</div>`
        }
      }
    })
  })
  return html && <div dangerouslySetInnerHTML={{__html: html}} />
}
