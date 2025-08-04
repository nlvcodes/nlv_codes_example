'use client'

import type {DefaultCellComponentProps} from 'payload'
import { getServerSideURL } from '@/utilities/getURL'
import Link from 'next/link'

export const EmailCell = (props: DefaultCellComponentProps) => {
  const {cellData} = props

  return <a href={`mailto:${cellData}`}>{cellData}</a>
}

export const TitleCell = (props: DefaultCellComponentProps) => {
  const { cellData, rowData, collectionSlug } = props
  const {_status, id } = rowData
  const url = getServerSideURL() + '/admin'

  const unpublished = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           className="lucide lucide-book-dashed">
    <path d="M12 17h1.5" />
    <path d="M12 22h1.5" />
    <path d="M12 2h1.5" />
    <path d="M17.5 22H19a1 1 0 0 0 1-1" />
    <path d="M17.5 2H19a1 1 0 0 1 1 1v1.5" />
    <path d="M20 14v3h-2.5" />
    <path d="M20 8.5V10" />
    <path d="M4 10V8.5" />
    <path d="M4 19.5V14" />
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H8" />
    <path d="M8 22H6.5a1 1 0 0 1 0-5H8" />
  </svg>

  const published = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-book-check">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
    <path d="m9 9.5 2 2 4-4" />
  </svg>

  const icon = _status === 'published' ? published : unpublished

  return <div>{icon} <Link href={url + `/collections/${collectionSlug}/${id}`}>{cellData}</Link></div>

}