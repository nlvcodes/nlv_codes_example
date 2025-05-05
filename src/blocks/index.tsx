import { TableOfContents } from '@/blocks/TableOfContents/Component'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/Component'
// we need to add all our new blocks here as Components
import { Section } from '@/blocks/Section/Component' // starting with Section
import { Row } from '@/blocks/Row/Component' // then Row
import { Column } from '@/blocks/Column/Component' // then Column
import { Img } from '@/blocks/Image/Component' // then Img
import { Video } from '@/blocks/Video/Component' // then Video
import { Text } from '@/blocks/Text/Component' // and finally Text

// now we need their types, but we need to import them with different names so we don't have name conflicts
import {
  Post,
  Page,
  Section as SectionProps, // so we'll include Section as SectionProps
  Row as RowProps, // Row as RowProps
  Column as ColumnProps, // Column as ColumnProps
  Text as TextProps, // Text as TextProps
  Image as ImgProps, // Image as ImgProps
  Video as VideoProps, // Video as VideoProps
} from '@/payload-types'
import React, { Fragment } from 'react'

// next we need to add the components to our blockComponents object so they get rendered in our
// RenderBlocks component in the Column component
const blockComponents = {
  tableOfContents: TableOfContents,
  contentWithMedia: ContentWithMedia,
  section: Section, // so that'll mean we add section: Section
  row: Row, // row: Row
  column: Column, // column: Column
  image: Img, // image: Img
  video: Video, // video: Video
  text: Text, // text: Text
}

export const RenderBlocks: React.FC<{
  // Now we need to add the block types to our block prop so we remain type safe
  blocks: Post['blockTest'] | Page['content'] | SectionProps['row'] // that means we add SectionProps['row']
    | RowProps['columns'] // as well as RowProps['columns']
    | ColumnProps['content'] // then ColumnProps['content']
    | TextProps['blockType'] // textProps['blockType']
    | ImgProps['blockType']  // ImgProps['blockType']
    | VideoProps['blockType'], // and finally VideoProps['blockType']
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
            // we'll then remove the div that wraps our block to help with styling. that means the key
            // needs to be added to the block component
            {/*@ts-expect-error*/}
            return <Block key={index} {...block} />
          }
          return null
        }

      })}
    </Fragment>
  }
  return null
}