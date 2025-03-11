import { Link } from '@payloadcms/ui'
import { getServerSideURL } from '@/utilities/getURL'

export const LinkToHome = () => {
  return <Link href={getServerSideURL()}>Homepage</Link>
}