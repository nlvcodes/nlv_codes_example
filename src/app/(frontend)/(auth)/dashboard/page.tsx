import { getUser } from '../actions/getUser'
import { Logout } from '../components/logout'

export default async function Page() {
  const user = await getUser()

  return <>
    <h1>Hello, {user?.firstName === '' ? user?.email : user?.firstName}!</h1>
    <p>You are currently on the {user?.tier || 'free'} tier.</p>
    <Logout />
  </>
}