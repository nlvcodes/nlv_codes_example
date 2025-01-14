import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'


export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({node, nodesToJSX}) => {
    if (node.tag === 'h2') {
      const text = nodesToJSX({ nodes: node.children })

      const id = text.join("").toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      return <h2 id={id}>{text}</h2>
    }
    else {
      const text = nodesToJSX({ nodes: node.children }).join("")
      const Tag = node.tag
      return <Tag>{text}</Tag>
    }
  }
}