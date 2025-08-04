import type {Row as RowProps} from '@/payload-types'
import {Column} from '@/blocks/Column/Component'

export const Row = (props: RowProps) => {
  const {columns} = props

  return <div className={`flex flex-row flex-wrap p-4`}>
    {columns?.map((column) => <Column key={column.id} {...column} />)}
  </div>
}