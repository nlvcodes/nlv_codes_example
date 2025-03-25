import  Link  from 'next/link'
import { getServerSideURL } from '@/utilities/getURL'

export const LinkToHome = () => {
  return <Link href={getServerSideURL()}>Homepage</Link>
}