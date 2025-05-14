import { TableOfContents } from '@/blocks/TableOfContents/Component'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/Component'
import {FormBlock} from '@/blocks/Form'
import {
  Post, Page,
  Section as SectionProps,
  Row as RowProps,
  Column as ColumnProps,
  Text as TextProps,
  Image as ImgProps,
  Video as VideoProps,
} from '@/payload-types'
import { Fragment } from 'react'
import {Section} from '@/blocks/Section/Component'
import {Row} from '@/blocks/Row/Component'
import {Column} from '@/blocks/Column/Component'
import {Text} from '@/blocks/Text/Component'
import {Img} from '@/blocks/Image/Component'
import {Video} from '@/blocks/Video/Component'

const blockComponents = {
  tableOfContents: TableOfContents,
  contentWithMedia: ContentWithMedia,
  formBlock: FormBlock,
  section: Section,
  row: Row,
  column: Column,
  text: Text,
  image: Img,
  video: Video,
}

export const RenderBlocks: React.FC<{
  blocks: Post['blockTest'] | Page['content'] | SectionProps['row'] | RowProps['columns'] | TextProps['blockType'] | ImgProps['blockType'] | VideoProps['blockType'] | ColumnProps['content']
}> = (props) => {
  const {blocks} = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return <Fragment>
      {blocks.map((block, index) => {
        const {blockType} = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType]

          if (Block) {
            // @ts-expect-error
            return <Block key={index} {...block} />
          }
          return null
        }

      })}
    </Fragment>
  }
  return null
}