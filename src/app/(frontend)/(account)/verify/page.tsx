import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface SearchParams {
  [key: string]: string;
}

export const Page = async ({ searchParams }: { searchParams: SearchParams }) => {

  const { token } = await searchParams
  const payload = await getPayload({ config })

  if (!token) {
    redirect(`/login?message=${encodeURIComponent('No verification token found')}`)
  } else {
    try {
      const result = await payload.verifyEmail({
        collection: 'customers',
        token: token,
      })

      if (result) {
        redirect(`/login?message=${encodeURIComponent('Successfully verified')}`)
      }
    } catch (error) {
      return <div
        className={`flex flex-col items-center justify-center min-h-full h-[calc(100vh)] w-full mx-auto sm:max-w-sm`}>
        <h1>There was a problem</h1>
        <p>Please contact an administrator.</p>
      </div>
    }

  }
}

export default Page