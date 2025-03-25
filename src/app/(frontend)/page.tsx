import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Customer, User } from '@/payload-types'
import { Customers } from '@/collections/Customers/config'

export default async function Home() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { permissions, user } = await payload.auth({ headers })

  const customer = await payload.login({
    collection: 'customers',
    data: {
      username: 'nlvogel',
      password: 'test',
    },
  })

  if (customer) {

    const customerInfo = customer.user as Customer
    const tiers = Customers.fields.filter(field => field.name === 'tier')
    console.log(tiers[0].options)

    return <>
      <h1>Hello, {customerInfo.firstName ? customerInfo.firstName : customerInfo.username ? customerInfo.username : customerInfo.email}</h1>
      <p>You&#39;re currently on the {customerInfo.tier?.toLowerCase()} tier</p>
      <input type="email" value={customerInfo.email} />
      <fieldset inert>
        <legend>Select a tier:</legend>
        {tiers[0].options.map((option, i) => (
          <div key={i}>
            <input type="radio" id={option} name="tier" value={option} checked={option === customerInfo.tier} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </fieldset>
    </>
  } else if (user?.collection === 'users') {
    // console.log(user)
    const { roles } = user as User
    return <h1>
      {user ? `You are authenticated as ${roles?.map(role => role).join(', ')}` : 'You are not logged in'}
    </h1>
  }

}