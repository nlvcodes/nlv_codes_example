import type {Row as RowProps} from '@/payload-types' // import this as RowProps so we can name our exported constant Row
import {Column} from '@/blocks/Column/Component' // need the Column component, not type

export const Row = (props: RowProps ) => {
  const { columns } = props  // we only need columns from our props

  return <div className={`flex flex-row flex-wrap p-4`}> {/* our row is display: flex with a flex-direction of row. We want it to wrap and have 1rem padding on all sides */}
    {columns?.map((column) => <Column key={column.id} {...column} />)} {/* Then we map all our columns, ensuring we have our key, and pass in all column props */}
  </div>
}