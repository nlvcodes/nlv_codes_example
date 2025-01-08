import type {
  TableOfContents as TableOfContentsProps,
  ContentWithMedia as ContentWithMediaProps,
} from '@/payload-types'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/Component'
import { TableOfContents } from '@/blocks/TableOfContents/Component'
import { internalDocToHref } from '@/components/RichText/converters/internalLink'
import { headingConverter } from '@/components/RichText/converters/headingConverter'
import { textConverter } from '@/components/RichText/converters/textConverter'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<TableOfContentsProps | ContentWithMediaProps>


export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({defaultConverters}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({internalDocToHref}),
  ...headingConverter,
  ...textConverter,
  blocks: {
    contentWithMedia: ({node}) => <ContentWithMedia {...node.fields} />,
    tableOfContents: ({node}) => <TableOfContents {...node.fields} />,
  }
})