import { getUser } from '../actions/getUser'
import UpdateForm from '@/app/(frontend)/(auth)/dashboard/components/updateForm'
import { Customers } from '@/collections/Customers/config'
import type { Customer, TierProps } from '@/payload-types'
import { ResetPasswordButton } from '@/app/(frontend)/(auth)/components/ResetPasswordButton'

export default async function Page() {
  const user = await getUser() as Customer
  const tiers = Customers.fields.filter(field => field.type === 'radio').filter(field => field.name === 'tier')[0].options
  return <main className={`w-full mx-auto sm:max-w-sm my-8`}>
    <div className={`my-8`}>
      <h1>Hello, {user?.firstName === '' ? user?.email : user?.firstName}!</h1>
      <p>You are currently on the {user.tier?.toLowerCase() || 'free'} tier.</p>
    </div>
    <UpdateForm user={user} tiers={tiers as TierProps[]} />
    <div className={`flex justify-start items-center gap-4`}>
      <ResetPasswordButton email={user.email} />
    </div>
  </main>

}