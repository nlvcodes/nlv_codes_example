import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'


export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({node, nodesToJSX}) => {
      const text = nodesToJSX({ nodes: node.children }).join("")
    if (node.tag === 'h2') {
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      return <h2 id={id}>{text}</h2>
    } else {
      const Tag = node.tag
      return <Tag>{text}</Tag>
    }
  }
}