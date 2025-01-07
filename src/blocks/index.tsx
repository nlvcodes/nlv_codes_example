import { TableOfContents } from '@/blocks/TableOfContents/Component'
import { ContentWithMedia } from '@/blocks/ContentWithMedia/Component'
import {Post} from '@/payload-types'
import { Fragment } from 'react'

const blockComponents = {
  tableOfContents: TableOfContents,
  contentWithMedia: ContentWithMedia,
}

export const RenderBlocks: React.FC<{
  blocks: Post['blockTest']
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
            return <div key={index}>
              {/*@ts-expect-error*/}
              <Block {...block} />
            </div>
          }
          return null
        }

      })}
    </Fragment>
  }
  return null
}