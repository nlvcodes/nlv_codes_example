import {headers as getHeaders} from 'next/headers'
import {getPayload} from 'payload'
import config from '@/payload.config'

export default async function Home() {
  const headers = await getHeaders()
  const payload = await getPayload({config})
  const {permissions, user} = await payload.auth({headers})

  return <h1>
    {user ? `You are authenticated as ${user.roles?.map(role => role).join(', ')}` : 'You are not logged in'}
  </h1>

}